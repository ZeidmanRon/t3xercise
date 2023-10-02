import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { ExerciseSkeleton } from "./exerciseListItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

type ExerciseProps = {
  exercises: Exercise[];
};

export const ExerciseList = ({ exercises }: ExerciseProps) => (
  <div className="flex h-full w-full justify-center">
    <ScrollArea
      dir="rtl"
      className="h-fit max-h-[450px] w-full overflow-y-auto rounded-md border px-2"
    >
      {exercises.length === 0 ? (
        <div className="flex justify-center p-3">אין תרגילים</div>
      ) : (
        exercises.map((exercise, index) => (
          <div className="w-full" key={exercise.id}>
            <ExerciseSkeleton exercise={exercise} />
            {index !== exercises.length - 1 ? <Separator /> : ""}
          </div>
        ))
      )}
    </ScrollArea>
  </div>
);
