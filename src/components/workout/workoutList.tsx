import React from "react"; // we need this to make JSX compile
import { WorkoutSkeleton } from "./workout";
import { type Workout } from "@prisma/client";

type WorkoutProps = {
  workouts: Workout[];
};

export const WorkoutList = ({ workouts }: WorkoutProps) => (
  <div
    className={`max-h-96 w-full overflow-y-auto rounded-lg border border-gray-300 shadow-md`}
  >
    {workouts.length === 0 ? (
      <div className="flex justify-center p-3">לא קיימים אימונים</div>
    ) : (
      workouts.map((workout) => (
        <div className="w-full border-b border-dashed px-3" key={workout.id}>
          <WorkoutSkeleton workout={workout} />
        </div>
      ))
    )}
  </div>
);
