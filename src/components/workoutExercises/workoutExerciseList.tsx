import React from "react"; // we need this to make JSX compile
import { WorkoutExerciseListItem } from "./workoutExerciseListItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { useExercises } from "~/pages/workouts/[workoutId]";
import { type Exercise } from "@prisma/client";
import { Label } from "~/components/ui/label";

type ExerciseProps = {
  workout: {
    ExercisesOnWorkouts: {
      exerciseId: string;
      workoutId: string;
      set: number;
      index: number;
    }[];
  } & {
    id: string;
    title: string;
    authorId: string;
    authorName: string;
    updatedAt: Date;
    sets: number;
  };
  set: number;
};

export function WorkoutExerciseList({ workout, set }: ExerciseProps) {
  const exercisesOfSet: Exercise[] = [];
  const workoutExercises = useExercises();
  workout.ExercisesOnWorkouts.map((exerciseOnWorkout) => {
    if (exerciseOnWorkout.set === set) {
      const foundExercise = workoutExercises.find(
        (workout) => workout.id === exerciseOnWorkout.exerciseId
      );
      if (foundExercise) {
        exercisesOfSet.push(foundExercise);
      }
    }
  });
  return exercisesOfSet.length ? (
    <div className="flex w-full flex-col justify-center p-3">
      <Label className="p-1 font-semibold"> סט-{set}:</Label>

      <div className="rounded-lg border px-2 py-1 shadow-sm">
        {exercisesOfSet.map((exercise, index) => (
          <div key={index} className="w-full">
            <WorkoutExerciseListItem
              workoutId={workout.id}
              exercise={exercise}
              set={set}
            />
            {index !== exercisesOfSet.length - 1 ? <Separator /> : ""}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
