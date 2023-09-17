import { type Workout } from "@prisma/client";
import React, { useEffect, useState } from "react"; // we need this to make JSX compile
import { Badge } from "../ui/badge";
import { api } from "~/utils/api";
import { Skeleton } from "~/components/ui/skeleton";
import { WorkoutDeleteModal } from "./wokroutDeleteModal";
type WorkoutProps = {
  workout: Workout;
};
export const WorkoutSkeleton: React.FC<WorkoutProps> = ({ workout }) => {
  const { data, isLoading } = api.workouts.getWorkoutById.useQuery({
    workoutId: workout.id,
  });
  const [timePassed, setTimePassed] = useState<string>("");
  useEffect(() => {
    // Calculate the time difference between the current date and workout's updatedAt property
    const now = new Date();
    const lastUpdated = workout.updatedAt;
    const timeDifference = now.getTime() - lastUpdated.getTime();

    // Convert the time difference into a readable format (e.g., "2 hours ago")
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timePassedString = "";
    if (days > 0) {
      timePassedString = `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (hours > 0) {
      timePassedString = `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (minutes > 0) {
      timePassedString = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else {
      timePassedString = `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    }

    setTimePassed(timePassedString);
  }, [workout.updatedAt]);
  const english = /^[A-Za-z0-9 ]*$/;

  return isLoading ? (
    <div className="flex flex-col space-y-2 p-2">
      <div className="flex h-5 items-center justify-between">
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex h-5 items-center justify-between">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-2 w-3/4" />
        <Skeleton className="h-2 w-1/2" />
      </div>
    </div>
  ) : (
    <div className="flex h-auto w-full flex-col rounded-lg px-2 pb-2">
      <div className="top mb-1 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{workout.title}</h2>
        </div>
        <div className="min-w-max">
          {/* <WorkoutEditModal workout={workout} />*/}
          <WorkoutDeleteModal workoutId={workout.id} />
        </div>
      </div>
      <div className="mb-1 flex w-full items-start justify-between ">
        <Badge
          className="text-center text-[0.6rem] font-semibold text-gray-600"
          variant="outline"
        >
          {data!.workoutExercises.length}
          {" תרגילים"}
        </Badge>
        <p className="w-auto text-xs font-semibold text-gray-400">
          {english.test(workout.authorName)
            ? `${workout.authorName}@`
            : `@${workout.authorName}`}
        </p>
      </div>
      <div className="max-h-12 overflow-y-auto">
        <p className="text-xs text-gray-400">updated {timePassed}</p>
      </div>
    </div>
  );
};
