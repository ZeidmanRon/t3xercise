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
  getAll: privateProcedure.query(async ({ ctx }) => {
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
  getAllOfCategory: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const { success, reset } = await rateLimit.limit(ctx.currentUser.id);
      if (!success) {
        calculateTimeLeftForLimit(reset);
      }

      const exercises = await ctx.prisma.exercise.findMany({
        where: { authorId: ctx.currentUser.id, category: input },
        orderBy: {
          name: "asc",
        },
      });
      return exercises;
    }),
  getExercises: privateProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const exercises: Exercise[] = await ctx.prisma.exercise.findMany({
        where: {
          id: {
            in: input,
          },
        },
        orderBy: {
          category: "asc",
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

      const existExercise = await ctx.prisma.exercise.findFirst({
        where: { name: input.name, authorId: ctx.currentUser.id },
      });

      if (existExercise) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `כבר קיים תרגיל עם השם: ${input.name}`,
        });
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

  upsert: privateProcedure
    .input(
      z.object({
        exerciseId: z.string().optional(),
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

      const existExercise = await ctx.prisma.exercise.findFirst({
        where: { name: input.name.trim(), authorId: ctx.currentUser.id },
      });

      if (existExercise) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `כבר קיים תרגיל עם השם: ${input.name}`,
        });
      }

      const exercise = await ctx.prisma.exercise.upsert({
        where: { id: input.exerciseId ?? "" },
        update: {
          name: input.name,
          desc: input.desc ?? "",
          category: input.category,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
        create: {
          name: input.name,
          desc: input.desc ?? "",
          category: input.category,
          authorId: ctx.currentUser.id,
          authorName: `${ctx.currentUser.firstName} ${ctx.currentUser.lastName}`,
        },
      });
      return exercise;
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
      try {
        await ctx.prisma.exercise.delete({
          where: { id: input.exerciseId },
        });
      } catch (err) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `לא ניתן למחוק את התרגיל, הוא מופיע בחלק מהאימונים`,
        });
      }
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
