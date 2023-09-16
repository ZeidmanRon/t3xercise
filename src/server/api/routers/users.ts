import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import {
  calculateTimeLeftForLimit,
  createTRPCRouter,
  privateProcedure,
  rateLimit,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  UpdateUserBusiness: privateProcedure
    .input(
      z.object({
        businessId: z.string().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      await clerkClient.users.updateUserMetadata(ctx.currentUser.id, {
        publicMetadata: { businessId: input.businessId },
      });

      //* update user's exercises' businessId.
      //* for the 'include business Exercises' logic when creating new workout.
      await ctx.prisma.exercise.updateMany({
        where: { authorId: ctx.currentUser.id },
        data: {
          businessId: input.businessId,
        },
      });
      // await clerkClient.users.updateUserMetadata(ctx.currentUser.id, {
      //   publicMetadata: {
      //     businessId: input.businessId,
      //   },
      // });
    }),
});
