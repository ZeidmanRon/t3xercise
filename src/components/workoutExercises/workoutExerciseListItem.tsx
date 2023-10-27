import React from "react";
import { WorkoutExerciseDeleteModal } from "./workoutExerciseDeleteModal";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { WorkoutExerciseGenerateModal } from "./workoutExerciseGenerateModal";

type ExerciseProps = {
  exercise: {
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
  };
  workoutId: string;
  set: number;
  setMaxIndexes: React.Dispatch<React.SetStateAction<number[]>>;
  maxIndexesPerSet: number[];
};

export function WorkoutExerciseListItem({
  exercise,
  workoutId,
  set,
  setMaxIndexes,
  maxIndexesPerSet,
}: ExerciseProps) {
  return (
    <div className="flex h-auto w-full flex-col rounded-lg p-1">
      <div className="top flex w-full items-center justify-between">
        <div className="flex w-full items-center">
          <h2 className="text-md w-3/4 font-semibold">{exercise.name}</h2>
        </div>
        <div className="flex min-w-max items-center justify-center text-left">
          {/* <ExerciseEditModal exercise={exercise} /> */}
          <Badge
            className="px-3 text-center text-[0.6rem] font-semibold text-gray-600"
            variant="outline"
          >
            {exercise.category}
          </Badge>
          <WorkoutExerciseDeleteModal
            workoutId={workoutId}
            exerciseToRemove={exercise}
            setMaxIndexes={setMaxIndexes}
            maxIndexesPerSet={maxIndexesPerSet}
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
          className="-mt-2 max-h-12 min-h-[1rem] w-5/6 overflow-y-auto"
        >
          <p className="text-xs text-gray-400">{exercise.desc}</p>
        </ScrollArea>
      ) : (
        ""
      )}
    </div>
  );
}
