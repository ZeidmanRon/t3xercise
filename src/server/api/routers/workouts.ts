import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const workoutsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workout.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
  getTop10: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workout.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });
  }),
});
