import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { ExerciseSkeleton } from "./exercise";

type ExerciseProps = {
  exercises: Exercise[];
};

export const ExerciseList = ({ exercises }: ExerciseProps) => (
  <div className="max-h-96 w-full overflow-y-auto rounded-lg p-2 shadow-md border-gray-300 border">
    {exercises.map((exercise) => (
      <div className="w-full border-b border-dashed p-1" key={exercise.id}>
        <ExerciseSkeleton exercise={exercise} />
      </div>
    ))}
  </div>
);
