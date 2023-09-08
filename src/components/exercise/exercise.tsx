import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile

type ExerciseProps = {
  exercise: Exercise;
};

export const ExerciseSkeleton = ({ exercise }: ExerciseProps) => (
  <div className="w-full rounded-lg px-2 pb-2">
    <div className="top mb-1 flex w-full items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{exercise.name}</h2>
        <p className="text-sm font-semibold text-gray-500">
          {exercise.category}
        </p>
      </div>
      <p className="w-auto text-xs font-semibold text-gray-400">
        @{exercise.authorName}
      </p>
    </div>
    <div className="max-h-12 overflow-y-auto">
      <p className="text-xs text-gray-400">{exercise.desc}</p>
    </div>
  </div>
);
