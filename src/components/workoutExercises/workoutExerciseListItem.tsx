import { type Exercise } from "@prisma/client";
import React from "react";
import { WorkoutExerciseDeleteModal } from "./workoutExerciseDeleteModal";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { WorkoutExerciseGenerateModal } from "./workoutExerciseGenerateModal";

type ExerciseProps = {
  exercise: Exercise;
  workoutId: string;
  set: number;
};
const english = /^[A-Za-z0-9 ]*$/;
export function WorkoutExerciseListItem({
  exercise,
  workoutId,
  set,
}: ExerciseProps) {
  return (
    <div className="flex h-auto w-full flex-col rounded-lg p-1">
      <div className="top flex w-full items-center justify-between">
        <div className="flex w-full min-w-max items-center justify-between">
          <h2 className="text-md font-semibold">{exercise.name}</h2>
          <Badge
            className="px-3 text-center text-[0.6rem] font-semibold text-gray-600"
            variant="outline"
          >
            {exercise.category}
          </Badge>
        </div>
        <div className="min-w-max">
          {/* <ExerciseEditModal exercise={exercise} /> */}
          <WorkoutExerciseDeleteModal
            workoutId={workoutId}
            exerciseId={exercise.id}
          />
          <WorkoutExerciseGenerateModal
            workoutId={workoutId}
            exercise={exercise}
            set={set}
          />
        </div>
      </div>
      {exercise.desc ? (
        <ScrollArea
          dir="rtl"
          className="-mt-2 max-h-12 min-h-[1rem] overflow-y-auto"
        >
          <p className="text-xs text-gray-400">{exercise.desc}</p>
        </ScrollArea>
      ) : (
        ""
      )}
    </div>
  );
}
