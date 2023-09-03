import { createTRPCRouter } from "~/server/api/trpc";
import { exercisesRouter } from "./routers/exercises";
import { workoutsRouter } from "./routers/workouts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exercises: exercisesRouter,
  workouts: workoutsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
