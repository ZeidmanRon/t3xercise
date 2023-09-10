import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
  rateLimit,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const exercisesRouter = createTRPCRouter({
  getAllById: publicProcedure
    .input(
      z.object({
        currUserId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.exercise.findMany({
        where: { authorId: input.currUserId },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        desc: z.string().optional(),
        category: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const user = await ctx.prisma.exercise.create({
        data: {
          name: input.name,
          desc: input.desc ?? "",
          category: input.category,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
      });
      return user;
    }),
  update: privateProcedure
    .input(
      z.object({
        exerciseId: z.string(),
        name: z.string(),
        desc: z.string().optional(),
        category: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const updatedUser = await ctx.prisma.exercise.update({
        where: { id: input.exerciseId },
        data: {
          name: input.name,
          desc: input.desc ?? "",
          category: input.category,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
      });
      return updatedUser;
    }),
  delete: privateProcedure
    .input(
      z.object({
        exerciseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        const currentTimestampMs = Date.now();
        const timeLeftInSeconds = Math.ceil(
          (reset - currentTimestampMs) / 1000
        );

        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `Rate limit exceeded.|${timeLeftInSeconds}`,
        });
      }
      const updatedUser = await ctx.prisma.exercise.delete({
        where: { id: input.exerciseId },
      });
      return updatedUser;
    }),
});
