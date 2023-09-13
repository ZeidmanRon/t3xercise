import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  calculateTimeLeftForLimit,
  createTRPCRouter,
  privateProcedure,
  rateLimit,
} from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";

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
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      const { workoutId } = input;
      const workout = await ctx.prisma.workout.findUnique({
        where: {
          id: workoutId,
        },
      });
      if (!workout) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid Workout ID provided",
        });
      }
      return workout;
    }),
});
