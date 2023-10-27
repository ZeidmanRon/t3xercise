import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { ExerciseEditModal } from "./exerciseEditModal";
import { ExerciseDeleteModal } from "./exerciseDeleteModal";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";

type ExerciseProps = {
  exercise: Exercise;
};
export const ExerciseSkeleton = ({ exercise }: ExerciseProps) => (
  <div className="flex h-auto w-full flex-col rounded-lg px-2 pb-2">
    <div className="top mb-1 flex w-full items-center justify-between">
      <div className="flex w-full items-center">
        <h2 className="text-md w-3/4 font-semibold">{exercise.name}</h2>
      </div>
      <div className="flex min-w-max items-center justify-center text-left">
        <Badge
          className="px-3 text-center text-[0.6rem] font-semibold text-gray-600"
          variant="outline"
        >
          {exercise.category}
        </Badge>
        <ExerciseEditModal exercise={exercise} />
        <ExerciseDeleteModal exerciseId={exercise.id} />
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
