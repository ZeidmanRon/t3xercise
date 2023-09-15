import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { ExerciseSkeleton } from "./exerciseListItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

type ExerciseProps = {
  exercises: Exercise[];
};

export const ExerciseList = ({ exercises }: ExerciseProps) => (
  <div className="flex w-full justify-center">
    <ScrollArea dir="rtl" className="max-h-96 w-full rounded-md border px-2">
      {exercises.map((exercise, index) => (
        <div className={`w-full `} key={exercise.id}>
          <ExerciseSkeleton exercise={exercise} />
          {index !== exercises.length - 1 ? <Separator /> : ""}
        </div>
      ))}
    </ScrollArea>
  </div>
);
