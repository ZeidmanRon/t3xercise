import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  calculateTimeLeftForLimit,
  createTRPCRouter,
  privateProcedure,
  rateLimit,
} from "~/server/api/trpc";

export const businessesRouter = createTRPCRouter({
  getBusiness: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      const business = await ctx.prisma.business.findUnique({
        where: { id: input.id },
      });
      console.log("business: ", business);
      if (!business) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Business not found",
        });
      }
      return business;
    }),

  getBusinessesByName: privateProcedure
    .input(z.object({ businessName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      if (input.businessName === "") {
      }
      const businesses = await ctx.prisma.business.findMany({
        where: { name: { contains: input.businessName } },
        take: 20,
      });
      return businesses;
    }),
});
