import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        desc: z.string().optional(),
        category: z.string(),
        authorId: z.string(),
        authorName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.exercise.create({
        data: {
          name: input.name,
          desc: input.desc ?? "",
          category: input.category,
          authorId: input.authorId,
          authorName: input.authorName,
        },
      });
      return user;
    }),
});
