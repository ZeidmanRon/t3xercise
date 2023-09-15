import { type Workout } from "@prisma/client";
import React, { useEffect, useState } from "react"; // we need this to make JSX compile

type WorkoutProps = {
  workout: Workout;
};
export const WorkoutSkeleton: React.FC<WorkoutProps> = ({ workout }) => {
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

  return (
    <div className="w-full rounded-lg p-4">
      <div className="top mb-1 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{workout.title}</h2>
        </div>
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
