import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile

type ExerciseProps = {
  exercise: Exercise;
};
const english = /^[A-Za-z0-9 ]*$/;
export const ExerciseSkeleton = ({ exercise }: ExerciseProps) => (
  <div className="w-full rounded-lg px-2 pb-2">
    <div className="top mb-1 flex w-full items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-md font-semibold">{exercise.name}</h2>
      </div>

      <p className="mx-2 w-auto min-w-max text-xs font-semibold text-gray-400">
        {english.test(exercise.authorName)
          ? `${exercise.authorName}@`
          : `@${exercise.authorName}`}
      </p>
    </div>
    <p className="-mt-1.5 text-sm font-normal text-gray-500">
      {exercise.category}
    </p>
    <div className="max-h-12 min-h-[2rem] overflow-y-auto">
      <p className="text-xs text-gray-400">{exercise.desc}</p>
    </div>
  </div>
);
