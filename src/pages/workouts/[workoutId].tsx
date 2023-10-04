import { useRouter } from "next/router";
import LoadingPage from "~/components/layout/loading";
import { api } from "~/utils/api";
import PageNotFound from "../404";
import Layout from "~/components/layout/layout";
import { WorkoutExerciseList } from "~/components/workoutExercises/workoutExerciseList";
import React, { createContext, useContext, useEffect, useState } from "react";
import { WorkoutExerciseCreateModal } from "~/components/workoutExercises/workoutExerciseCreateModal";
import { ScrollArea } from "~/components/ui/scroll-area";

const ExercisesContext = createContext([{}]);

export function useExercises() {
  const exercises = useContext(ExercisesContext);

  if (exercises === undefined) {
    throw new Error("useExercises must be used within a ExercisesProvider");
  }

  return exercises as {
    id: string;
    name: string;
    desc: string;
    category: string;
    authorId: string;
    authorName: string;
    updatedAt: Date;
    businessId: string | null;
    set: number;
    index: number;
  }[]; // Assuming exercises is an array of Exercise
}

export default function WorkoutPage() {
  const router = useRouter();
  const [workoutExercises, setWorkoutExercises] = useState([{}]);
  const [maxIndexesPerSet, setMaxIndexes] = useState<number[]>([0, 0, 0, 0, 0]);

  const { data: workout, error } = api.workouts.getWorkoutById.useQuery(
    {
      workoutId: router.query.workoutId as string,
    },
    {
      enabled: router.isReady,
    }
  );
  const { mutate: getExercises, data: exercisesOfWorkout } =
    api.exercises.getExercises.useMutation();

  useEffect(() => {
    if (!workout) return;
    const exercisesIds = workout.ExercisesOnWorkouts.map(
      (item) => item.exerciseId
    );

    // Update the state with the new maximum 'index' per set
    const updatedMaxIndexes = [...maxIndexesPerSet];

    workout.ExercisesOnWorkouts.forEach((exercise) => {
      const { set, index } = exercise;

      // Update the maximum 'index' if the current index is greater
      if (index > updatedMaxIndexes[set - 1]!) {
        updatedMaxIndexes[set - 1] = index;
      }
    });

    // Update the state with the new maximum 'indexes' per set
    setMaxIndexes(updatedMaxIndexes);

    getExercises(exercisesIds);
  }, [getExercises, workout]);

  useEffect(() => {
    if (!exercisesOfWorkout) return;
    const combinedData = exercisesOfWorkout.map((exercise) => {
      const relatedExerciseOnWorkout = workout!.ExercisesOnWorkouts.find(
        (eow) => eow.exerciseId === exercise.id
      );
      if (relatedExerciseOnWorkout) {
        return {
          ...exercise,
          set: relatedExerciseOnWorkout.set,
          index: relatedExerciseOnWorkout.index,
        };
      }
      // If no related exercise is found, return the exercise as is
      return {
        ...exercise,
        set: 1,
        index: 1,
      };
    });

    setWorkoutExercises(combinedData);
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
      <div className="flex h-fit flex-col items-center">
        <div className="flex w-full flex-col p-4">
          <div className="flex w-full justify-center">
            <h1 className=" m-4 w-auto border-b-2 text-center text-2xl font-normal">
              {workout.title}
            </h1>
          </div>
          <ExercisesContext.Provider value={workoutExercises}>
            <ScrollArea
              dir="rtl"
              className="max-h-[450px] w-full flex-grow overflow-y-auto rounded-md border px-2"
            >
              {[...Array(workout.sets).keys()].map((set) => (
                <WorkoutExerciseList
                  key={set + 1}
                  workoutId={workout.id}
                  set={set + 1}
                  setMaxIndexes={setMaxIndexes}
                  maxIndexesPerSet={maxIndexesPerSet}
                />
              ))}
            </ScrollArea>
          </ExercisesContext.Provider>
        </div>
        <div className="flex w-full justify-center p-2">
          <ExercisesContext.Provider value={workoutExercises}>
            <WorkoutExerciseCreateModal
              workout={workout}
              maxIndexesPerSet={maxIndexesPerSet}
            />
          </ExercisesContext.Provider>
        </div>
      </div>
    </Layout>
  );
}
