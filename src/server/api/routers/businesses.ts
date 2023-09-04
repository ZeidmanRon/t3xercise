import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const businessesRouter = createTRPCRouter({
  getBusinessById: publicProcedure
    .input(z.object({ businessId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.businessId === null) return null;
      const business = await ctx.prisma.business.findMany({
        where: { id: input.businessId },
      });

      if (!business) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Business not found",
        });
      }

      return business;
    }),
});
