import React from "react"; // we need this to make JSX compile
import { WorkoutExerciseListItem } from "./workoutExerciseListItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { WorkoutExerciseCreateModal } from "./workoutExerciseCreateModal";
import { useExercises } from "~/pages/workouts/[workoutId]";

type ExerciseProps = {
  workoutId: string;
};

export function WorkoutExerciseList({ workoutId }: ExerciseProps) {
  const workoutExercises = useExercises();

  return (
    <div className="flex w-full flex-col justify-center">
      <ScrollArea dir="rtl" className="h-96 w-full rounded-md border px-2">
        {workoutExercises.map((exercise, index) => (
          <div key={index} className="w-full">
            <WorkoutExerciseListItem
              workoutId={workoutId}
              exercise={exercise}
            />
            {index !== workoutExercises.length - 1 ? <Separator /> : ""}
          </div>
        ))}
      </ScrollArea>
      <div className="flex w-full justify-center p-2">
        <WorkoutExerciseCreateModal workoutId={workoutId} />
      </div>
    </div>
  );
}
