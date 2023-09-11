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
    const businesses = await ctx.prisma.workout.findMany({
      where: {
        authorId: ctx.currentUser.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return businesses;
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
        return null;
      }
      return workout;
    }),
});
