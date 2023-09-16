import { z } from "zod";
import {
  calculateTimeLeftForLimit,
  createTRPCRouter,
  privateProcedure,
  rateLimit,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type Exercise } from "@prisma/client";

export const exercisesRouter = createTRPCRouter({
  getAllById: privateProcedure.query(async ({ ctx }) => {
    const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
    if (!success) {
      calculateTimeLeftForLimit(reset);
    }
    const exercises = await ctx.prisma.exercise.findMany({
      where: { authorId: ctx.currentUser.id },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return exercises;
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
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }
      const exercise = await ctx.prisma.exercise.create({
        data: {
          name: input.name,
          desc: input.desc ?? "",
          category: input.category,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
      });
      return exercise;
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
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }

      const updatedExercise = await ctx.prisma.exercise.update({
        where: { id: input.exerciseId },
        data: {
          name: input.name,
          desc: input.desc ?? "",
          category: input.category,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
      });
      return updatedExercise;
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
        calculateTimeLeftForLimit(reset);
      }
      const deletedExercise = await ctx.prisma.exercise.delete({
        where: { id: input.exerciseId },
      });
      return deletedExercise;
    }),

  getRandomExercises: privateProcedure
    .input(
      z.array(
        z.object({
          numberOfExercises: z.number(),
          category: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }

      const exercisePromises = input.map(
        async ({ category, numberOfExercises }) => {
          if (numberOfExercises > 0) {
            const RandomExercises: Exercise[] = await ctx.prisma.$queryRaw`
             SELECT * FROM Exercise
             WHERE authorId = ${ctx.currentUser.id}
             AND category = ${category}
             ORDER BY RAND()
             LIMIT ${numberOfExercises}`;

            if (numberOfExercises > RandomExercises.length) {
              throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: `אין מספיק תרגילי ${category}`,
              });
            }

            return RandomExercises;
          }
          // Return an empty array for conditions not met
          return [];
        }
      );

      const ExerciseList: Exercise[] = (await Promise.all(exercisePromises))
        .filter((exercises) => exercises.length > 0) // Filter out empty arrays
        .flat();

      console.log("outside", ExerciseList);
      return ExerciseList;
    }),

  getRandomExercisesWithBusiness: privateProcedure
    .input(
      z.array(
        z.object({
          numberOfExercises: z.number(),
          category: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }

      const exercisePromises = input.map(
        async ({ category, numberOfExercises }) => {
          if (numberOfExercises > 0) {
            const RandomExercises: Exercise[] = await ctx.prisma.$queryRaw`
              SELECT * FROM Exercise
              WHERE businessId = ${ctx.currentUser.publicMetadata.businessId}
              AND category = ${category}
              ORDER BY RAND()
              LIMIT ${numberOfExercises}`;

            if (numberOfExercises > RandomExercises.length) {
              throw new TRPCError({
                code: "UNPROCESSABLE_CONTENT",
                message: `אין מספיק תרגילים מסוג: ${category}`,
              });
            }

            return RandomExercises;
          }
          // Return an empty array for conditions not met
          return [];
        }
      );

      const ExerciseList: Exercise[] = (await Promise.all(exercisePromises))
        .filter((exercises) => exercises.length > 0) // Filter out empty arrays
        .flat();

      console.log("outside", ExerciseList);
      return ExerciseList;
    }),
});
