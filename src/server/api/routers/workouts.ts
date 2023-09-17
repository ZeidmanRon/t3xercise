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
  create: privateProcedure
    .input(
      z.object({
        // Exercise ID Array
        selectedExercisesIds: z.array(z.string()),
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      const { selectedExercisesIds: selectedExerises, title } = input;
      const createdWorkout = await ctx.prisma.workout.create({
        data: {
          title: title,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
      });
      const exerciseWorkoutRelationships = selectedExerises.map(
        (exerciseId) => {
          return {
            exerciseId: exerciseId,
            workoutId: createdWorkout.id, // Use the ID of the newly created workout
          };
        }
      );

      await ctx.prisma.exercisesOnWorkouts.createMany({
        data: exerciseWorkoutRelationships,
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
});
