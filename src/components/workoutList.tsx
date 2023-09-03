import React from "react"; // we need this to make JSX compile
import { WorkoutSkeleton } from "./workout";
import { type Workout } from "@prisma/client";

type WorkoutProps = {
  workouts: Workout[];
};

export const WorkoutList = ({ workouts }: WorkoutProps) => (
  <div className="max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 p-2 shadow-md">
    {workouts.map((workout) => (
      <div className="w-full border-b border-dashed p-1" key={workout.id}>
        <WorkoutSkeleton workout={workout} />
      </div>
    ))}
  </div>
);
