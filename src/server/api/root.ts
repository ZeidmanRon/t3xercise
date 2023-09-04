import { createTRPCRouter } from "~/server/api/trpc";
import { exercisesRouter } from "./routers/exercises";
import { workoutsRouter } from "./routers/workouts";
import { usersRouter } from "./routers/users";
import { businessesRouter } from "./routers/businesses";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exercises: exercisesRouter,
  workouts: workoutsRouter,
  users: usersRouter,
  Business: businessesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
