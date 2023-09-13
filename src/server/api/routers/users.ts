import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  calculateTimeLeftForLimit,
  createTRPCRouter,
  privateProcedure,
  rateLimit,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getUserById: privateProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
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
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
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

  getBusiness: privateProcedure.query(async ({ ctx }) => {
    const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
    if (!success) {
      calculateTimeLeftForLimit(reset);
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.currentUser.id,
      },
    });
    if (!user!.businessId) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Business not found",
      });
    }
    return user!.businessId;
  }),

  test: privateProcedure
    .input(
      z.object({
        businessId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      await clerkClient.users.updateUserMetadata(ctx.currentUser.id, {
        publicMetadata: { businessId: input.businessId },
      });
      // await clerkClient.users.updateUserMetadata(ctx.currentUser.id, {
      //   publicMetadata: {
      //     businessId: input.businessId,
      //   },
      // });
    }),
});
