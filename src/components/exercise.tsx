import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile

type ExerciseProps = {
  exercise: Exercise;
};

export const ExerciseSkeleton = ({ exercise }: ExerciseProps) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
    <h2 className="mb-2 text-xl font-semibold">{exercise.title}</h2>
    <div className="mb-2 flex items-center text-sm text-gray-500">
      <p className="mr-2">טוסיק</p>
      <p>{exercise.authorId}</p>
    </div>
    <div className="max-h-20 overflow-y-auto">
      <p className="text-xs text-gray-400">{exercise.desc}</p>
    </div>
  </div>
);
