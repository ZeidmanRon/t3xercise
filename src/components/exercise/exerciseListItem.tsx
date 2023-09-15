import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { ExerciseEditModal } from "./exerciseEditModal";
import { ExerciseDeleteModal } from "./exerciseDeleteModal";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";

type ExerciseProps = {
  exercise: Exercise;
};
const english = /^[A-Za-z0-9 ]*$/;
export const ExerciseSkeleton = ({ exercise }: ExerciseProps) => (
  <div className="flex h-auto w-full flex-col rounded-lg px-2 pb-2">
    <div className="top mb-1 flex w-full items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-md font-semibold">{exercise.name}</h2>
      </div>
      <div className="min-w-max">
        <ExerciseEditModal exerciseId={exercise.id} />
        <ExerciseDeleteModal exerciseId={exercise.id} />
      </div>
    </div>
    <div className="-mt-2.5 mb-1 flex w-full items-start justify-between ">
      <div className="w-2/3">
        <Badge
          className="px-3 text-center text-[0.6rem] font-semibold text-gray-600"
          variant="outline"
        >
          {exercise.category}
        </Badge>
      </div>
      <p className="mx-2 w-auto min-w-max text-[0.6rem] font-semibold text-gray-400">
        {english.test(exercise.authorName)
          ? `${exercise.authorName}@`
          : `@${exercise.authorName}`}
      </p>
    </div>
    <ScrollArea dir="rtl" className="max-h-12 min-h-[1rem] overflow-y-auto">
      <p className="text-xs text-gray-400">{exercise.desc}</p>
    </ScrollArea>
  </div>
);
