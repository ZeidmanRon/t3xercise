import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  calculateTimeLeftForLimit,
  createTRPCRouter,
  privateProcedure,
  rateLimit,
} from "~/server/api/trpc";

export const workoutsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
    if (!success) {
      calculateTimeLeftForLimit(reset);
    }
    const workouts = await ctx.prisma.workout.findMany({
      where: {
        authorId: ctx.currentUser.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (!workouts) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Workouts associated with this user",
      });
    }
    return workouts;
  }),
  getMostUpdated: privateProcedure.query(async ({ ctx }) => {
    const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
    if (!success) {
      calculateTimeLeftForLimit(reset);
    }
    const lastUpdatedWorkouts = await ctx.prisma.workout.findMany({
      where: {
        authorId: ctx.currentUser.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });

    if (!lastUpdatedWorkouts) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Workouts associated with this user",
      });
    }
    return lastUpdatedWorkouts;
  }),
  getWorkoutById: privateProcedure
    .input(z.object({ workoutId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { workoutId } = input;
      const workout = await ctx.prisma.workout.findUnique({
        where: {
          id: workoutId,
        },
        include: {
          ExercisesOnWorkouts: true, // Include the related exercises
        },
      });
      if (!workout) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid Workout ID",
        });
      }
      return workout;
    }),

  upsert: privateProcedure
    .input(
      z.object({
        workoutId: z.string().optional(),
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      const { title } = input;
      const createdWorkout = await ctx.prisma.workout.upsert({
        where: { id: input.workoutId ?? "" },
        update: {
          title: title,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
        create: {
          title: title,
          sets: 10,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
      });

      return createdWorkout;
    }),

  delete: privateProcedure
    .input(
      z.object({
        workoutId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      try {
        const { workoutId } = input;
        await ctx.prisma.exercisesOnWorkouts.deleteMany({
          where: { workoutId: workoutId },
        });

        await ctx.prisma.workout.delete({
          where: { id: workoutId },
        });
      } catch (err) {
        console.log("at @{delete_workout} error:", err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  removeExerciseFromWorkout: privateProcedure
    .input(
      z.object({
        workoutId: z.string(),
        exerciseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      try {
        const { workoutId, exerciseId } = input;
        await ctx.prisma.exercisesOnWorkouts.delete({
          where: {
            exerciseId_workoutId: {
              workoutId: workoutId,
              exerciseId: exerciseId,
            },
          },
        });
      } catch (err) {
        console.log("at @remove_exercise_from_workout error:", err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  addExerciseToWorkout: privateProcedure
    .input(
      z.object({
        workoutId: z.string(),
        set: z.number(),
        exerciseId: z.string(),
        index: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      try {
        const { workoutId, exerciseId, set, index } = input;
        const exerciseToAdd = await ctx.prisma.exercise.findUnique({
          where: { id: exerciseId },
        });
        if (!exerciseToAdd) throw new TRPCError({ code: "NOT_FOUND" });
        await ctx.prisma.exercisesOnWorkouts.create({
          data: {
            exerciseId: exerciseId,
            workoutId: workoutId,
            set: set,
            index: index,
          },
        });
        return exerciseToAdd;
      } catch (err) {
        console.log("at @remove_exercise_from_workout error:", err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  updateExerciseIndexInWorkout: privateProcedure
    .input(
      z.object({
        workoutId: z.string(),
        exerciseId: z.string(),
        index: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      try {
        const { workoutId, exerciseId, index } = input;
        await ctx.prisma.exercisesOnWorkouts.update({
          where: {
            exerciseId_workoutId: {
              exerciseId: exerciseId,
              workoutId: workoutId,
            },
          },
          data: { index: index },
        });
        return;
      } catch (err) {
        console.log("at @remove_exercise_from_workout error:", err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
