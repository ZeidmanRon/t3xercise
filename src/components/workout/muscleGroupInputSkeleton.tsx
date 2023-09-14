import { type Exercise } from "@prisma/client";
import React from "react"; // we need this to make JSX compile
import { Badge } from "~/components/ui/badge";
import { type MuscleGroupInput } from "./muscleGroupDynamicTable";
import { Label } from "~/components/ui/label";

type MuscleGroupInputProps = {
  muscleGroupInput: MuscleGroupInput;
};
export const MuscleGroupInputSkeleton = ({
  muscleGroupInput,
}: MuscleGroupInputProps) => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="pl-4">
      <Label>{muscleGroupInput.category}</Label>
    </div>
    <div>
      <Label>{muscleGroupInput.numberOfExercises} תרגילים</Label>
    </div>
  </div>
);
