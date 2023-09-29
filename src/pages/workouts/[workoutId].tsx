import { useRouter } from "next/router";
import LoadingPage from "~/components/layout/loading";
import { api } from "~/utils/api";
import PageNotFound from "../404";
import Layout from "~/components/layout/layout";
import { WorkoutExerciseList } from "~/components/workoutExercises/workoutExerciseList";
import { Label } from "~/components/ui/label";
import React, { createContext, useContext, useEffect, useState } from "react";
import { type Exercise } from "@prisma/client";
import { WorkoutExerciseCreateModal } from "~/components/workoutExercises/workoutExerciseCreateModal";

const ExercisesContext = createContext([{}]);

export function useExercises() {
  const exercises = useContext(ExercisesContext);

  if (exercises === undefined) {
    throw new Error("useExercises must be used within a ExercisesProvider");
  }

  return exercises as Exercise[]; // Assuming exercises is an array of Exercise
}

export default function WorkoutPage() {
  const router = useRouter();
  const [workoutId, setWorkoutId] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([{}]);

  const {
    data: workout,
    error,
    refetch,
  } = api.workouts.getWorkoutById.useQuery({
    workoutId: workoutId,
  });
  const { mutate: getExercises, data: exercisesOfWorkout } =
    api.exercises.getExercises.useMutation();

  useEffect(() => {
    if (router.isReady) {
      setWorkoutId(router.query.workoutId as string);
      refetch;
    }
  }, [router.isReady]);

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
  if (!workout || !exercisesOfWorkout || !workoutId) return <LoadingPage />;

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col p-4">
          <div className="flex w-full justify-center">
            <h1 className="w-auto border-b-2 p-1 text-center text-2xl font-normal">
              {workout.title}
            </h1>
          </div>
          <ExercisesContext.Provider value={workoutExercises}>
            {[...Array(workout.sets).keys()].map((set) => (
              <div key={set + 1} className="p-3">
                <Label className="p-1 font-semibold"> סט-{set + 1}:</Label>
                <WorkoutExerciseList workout={workout} set={set + 1} />
              </div>
            ))}
          </ExercisesContext.Provider>
        </div>
        <div className="flex w-full justify-center p-2">
          <ExercisesContext.Provider value={workoutExercises}>
            <WorkoutExerciseCreateModal workout={workout} />
          </ExercisesContext.Provider>
        </div>
      </div>
    </Layout>
  );
}
