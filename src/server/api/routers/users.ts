import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getUsersOfBusiness: privateProcedure
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
  getUserById: privateProcedure
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
  upsert: privateProcedure
    .input(
      z.object({
        businessId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.upsert({
        where: { id: ctx.currentUser.id },
        update: {
          fullName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
          email: ctx.currentUser.emailAddresses[0]?.emailAddress,
          businessId: input.businessId,
        },
        create: {
          id: ctx.currentUser.id,
          fullName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
          email: ctx.currentUser.emailAddresses[0]?.emailAddress,
          businessId: input.businessId,
        },
      });
      return user;
    }),
});
