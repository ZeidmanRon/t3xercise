import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile

type ExerciseProps = {
  exercise: Exercise;
};

export const ExerciseSkeleton = ({ exercise }: ExerciseProps) => (
  <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md">
    <div className="mb-1 flex w-full items-center justify-between top">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{exercise.title}</h2>
        <p className="text-sm font-semibold text-gray-500">#קבוצת_שריר</p>
      </div>
      <p className="text-xs font-semibold text-gray-400 w-auto">
        @{exercise.authorId}
      </p>
    </div>
    <div className="max-h-10 overflow-y-auto">
      <p className="text-xs text-gray-400">
        {exercise.desc} dddddddddddd dddd dddd dddddddd dddd ddddddd dddddd
        dddddddd dddddddddddddddddddddddddddd dddddddddd dddddddddddd dddd dddd
        dddddddd dddd ddddddd dddddd dddddddd dddddddddddddddddddddddddddd
        dddddddddd
      </p>
    </div>
  </div>
);
