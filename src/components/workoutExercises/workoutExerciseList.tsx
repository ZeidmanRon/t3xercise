import React from "react"; // we need this to make JSX compile
import { WorkoutExerciseListItem } from "./workoutExerciseListItem";
import { Separator } from "~/components/ui/separator";
import { useExercises } from "~/pages/workouts/[workoutId]";
import { Label } from "~/components/ui/label";

type ExerciseProps = {
  workoutId: string;
  set: number;
};

export function WorkoutExerciseList({ set, workoutId }: ExerciseProps) {
  const workoutExercises = useExercises();
  // filter exercises -
  const filteredExercises = workoutExercises.filter(
    (exercise) => exercise.set === set
  );
  // sort exercises by index
  filteredExercises.sort((a, b) => a.index - b.index);

  return filteredExercises.length ? (
    <div className="flex w-full flex-col justify-center p-3">
      <Label className="p-1 font-semibold"> סט-{set}:</Label>

      <div className="rounded-lg border px-2 py-1 shadow-sm">
        {filteredExercises.map((exercise, index) => (
          <div key={index} className="w-full">
            <WorkoutExerciseListItem
              workoutId={workoutId}
              exercise={exercise}
              set={set}
            />
            {index !== filteredExercises.length - 1 ? <Separator /> : ""}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
