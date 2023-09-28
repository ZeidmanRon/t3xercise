import React from "react"; // we need this to make JSX compile
import { WorkoutExerciseListItem } from "./workoutExerciseListItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { useExercises } from "~/pages/workouts/[workoutId]";
import { type Workout } from "@prisma/client";

type ExerciseProps = {
  workout: Workout;
};

export function WorkoutExerciseList({ workout }: ExerciseProps) {
  const workoutExercises = useExercises();

  return (
    <div className="flex w-full flex-col justify-center">
      <ScrollArea
        dir="rtl"
        className="h-auto max-h-96 w-full rounded-md border px-2"
      >
        {workoutExercises.map((exercise, index) => (
          <div key={index} className="w-full">
            <WorkoutExerciseListItem
              workoutId={workout.id}
              exercise={exercise}
            />
            {index !== workoutExercises.length - 1 ? <Separator /> : ""}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
