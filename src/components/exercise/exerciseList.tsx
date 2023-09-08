import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { ExerciseSkeleton } from "./exerciseSkeleton";
import { ScrollArea } from "~/components/ui/scroll-area";

type ExerciseProps = {
  exercises: Exercise[];
};

export const ExerciseList = ({ exercises }: ExerciseProps) => (
  <div className="flex w-full justify-center">
    <ScrollArea dir="rtl" className="max-h-96 w-full rounded-md border px-2">
      {exercises.map((exercise) => (
        <div className="w-full border-b border-dashed" key={exercise.id}>
          <ExerciseSkeleton exercise={exercise} />
        </div>
      ))}
    </ScrollArea>
  </div>
);
