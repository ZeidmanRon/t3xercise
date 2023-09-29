import React from "react"; // we need this to make JSX compile
import { WorkoutExerciseListItem } from "./workoutExerciseListItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { useExercises } from "~/pages/workouts/[workoutId]";
import { Exercise, type Workout } from "@prisma/client";

type ExerciseProps = {
  workout: {
    ExercisesOnWorkouts: {
      exerciseId: string;
      workoutId: string;
      set: number;
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
  return (
    <div className="flex w-full flex-col justify-center">
      <ScrollArea
        dir="rtl"
        className="max-h-40 min-h-[1rem] w-full overflow-y-auto rounded-md border px-2"
      >
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
      </ScrollArea>
    </div>
  );
}
