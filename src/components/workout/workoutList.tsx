import React from "react"; // we need this to make JSX compile
import { WorkoutSkeleton } from "./workoutListItem";
import { type Workout } from "@prisma/client";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
type WorkoutProps = {
  workouts: Workout[];
};

export const WorkoutList = ({ workouts }: WorkoutProps) => (
  <div className="flex h-full w-full justify-center">
    <ScrollArea
      dir="rtl"
      className="h-fit max-h-[450px] w-full overflow-y-auto rounded-md border px-2"
    >
      {workouts.length === 0 ? (
        <div className="flex justify-center p-3">לא קיימים אימונים</div>
      ) : (
        workouts.map((workout, index) => (
          <div className={`w-full `} key={workout.id}>
            <WorkoutSkeleton workout={workout} />
            {index !== workouts.length - 1 ? <Separator /> : ""}
          </div>
        ))
      )}
    </ScrollArea>
  </div>
);
