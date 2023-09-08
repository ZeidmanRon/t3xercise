import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getUsersOfBusiness: publicProcedure
    .input(z.object({ businessId: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: { businessId: input.businessId },
      });

      if (!users) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No users in this business",
        });
      }

      return users;
    }),
  getUserById: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      if (!userId || userId === undefined) {
        return null;
      }
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return null;
      }
      return user;
    }),
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        fullName: z.string(),
        email: z.string().optional(),
        businessId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.upsert({
        where: { id: input.userId },
        update: {
          fullName: input.fullName,
          email: input.email,
          businessId: input.businessId,
        },
        create: {
          id: input.userId,
          fullName: input.fullName,
          email: input.email,
          businessId: input.businessId,
        },
      });
      return user;
    }),
});
