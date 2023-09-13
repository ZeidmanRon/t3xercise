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
  UpdateUserBusiness: privateProcedure
    .input(
      z.object({
        businessId: z.string(),
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
      // await clerkClient.users.updateUserMetadata(ctx.currentUser.id, {
      //   publicMetadata: {
      //     businessId: input.businessId,
      //   },
      // });
    }),
});
