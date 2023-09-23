import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { WorkoutExerciseSkeleton } from "./workoutExerciseListItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { WorkoutExerciseCreateModal } from "./workoutExerciseCreateModal";

type ExerciseProps = {
  exercises: Exercise[];
  workoutId: string;
};

export function WorkoutExerciseList({ exercises, workoutId }: ExerciseProps) {
  const exercisesId = exercises.map((exercise) => exercise.id);

  return (
    <div className="flex w-full flex-col justify-center">
      <ScrollArea dir="rtl" className="h-96 w-full rounded-md border px-2">
        {exercises.map((exercise, index) => (
          <div className="w-full" key={exercise.id}>
            <WorkoutExerciseSkeleton
              workoutId={workoutId}
              exercise={exercise}
            />
            {index !== exercises.length - 1 ? <Separator /> : ""}
          </div>
        ))}
      </ScrollArea>
      <div className="flex w-full justify-center p-2">
        <WorkoutExerciseCreateModal
          workoutId={workoutId}
          exercisesId={exercisesId}
        />
      </div>
    </div>
  );
}
