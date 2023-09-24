import { useRouter } from "next/router";
import LoadingPage from "~/components/layout/loading";
import { api } from "~/utils/api";
import PageNotFound from "../404";
import Layout from "~/components/layout/layout";
import { WorkoutExerciseList } from "~/components/workoutExercises/workoutExerciseList";
import { Label } from "~/components/ui/label";
import React, { createContext, useContext, useEffect, useState } from "react";
import { type Exercise } from "@prisma/client";

const ExercisesContext = createContext({});

export function useExercises() {
  const exercises = useContext(ExercisesContext);

  if (exercises === undefined) {
    throw new Error("useExercises must be used within a ExercisesProvider");
  }

  return exercises as Exercise[]; // Assuming exercises is an array of Exercise
}

export default function WorkoutPage() {
  const [workoutExercises, setWorkoutExercises] = useState([{}]); // Initial value is an empty array
  const router = useRouter();
  const {
    data: workout,
    error,
    refetch,
  } = api.workouts.getWorkoutById.useQuery({
    workoutId: router.query.workoutId as string, // Ensure it's cast to string
  });
  const { mutate: getExercises, data: exercisesOfWorkout } =
    api.exercises.getExercises.useMutation();

  useEffect(() => {
    if (router.isReady) {
      refetch;
    }
  }, [refetch, router.isReady]);

  useEffect(() => {
    if (!workout) return;
    const exercisesIds = workout.ExercisesOnWorkouts.map(
      (item) => item.exerciseId
    );
    getExercises(exercisesIds);
  }, [getExercises, workout]);

  useEffect(() => {
    if (!exercisesOfWorkout) return;
    setWorkoutExercises(exercisesOfWorkout);
  }, [exercisesOfWorkout]);

  if (error) {
    const secondMessage = "the workout does not exist or it has been deleted";
    return (
      <PageNotFound message={error?.data?.code} secondMessage={secondMessage} />
    );
  }
  if (!workout || !exercisesOfWorkout) return <LoadingPage />;

  return (
    <Layout>
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <div className="flex w-full justify-center">
            <h1 className="w-auto border-b-2 p-1 text-center text-2xl font-normal">
              {workout.title}
            </h1>
          </div>
          <Label className="p-1 font-semibold"> תרגילים:</Label>
          <ExercisesContext.Provider value={workoutExercises}>
            <WorkoutExerciseList workoutId={router.query.workoutId as string} />
          </ExercisesContext.Provider>
        </div>
      </div>
    </Layout>
  );
}
