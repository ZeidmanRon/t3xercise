import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../layout/loading";
import { useExercises } from "~/pages/workouts/[workoutId]";

type editExerciseModalProps = {
  exerciseToRemove: {
    id: string;
    name: string;
    desc: string;
    category: string;
    authorId: string;
    authorName: string;
    updatedAt: Date;
    businessId: string | null;
    set: number;
    index: number;
  };
  workoutId: string;
  setMaxIndexes: React.Dispatch<React.SetStateAction<number[]>>;
  maxIndexesPerSet: number[];
};
export function WorkoutExerciseDeleteModal({
  exerciseToRemove,
  workoutId,
  setMaxIndexes,
  maxIndexesPerSet,
}: editExerciseModalProps) {
  const [open, setOpen] = useState(false);
  const utils = api.useContext();
  const workoutExercises = useExercises();

  const { mutate: updateExerciseIndexInWorkout, isLoading: isUpdatingIndex } =
    api.workouts.updateExerciseIndexInWorkout.useMutation({
      async onSuccess() {
        await utils.workouts.getWorkoutById.invalidate();
        setOpen(false);
      },
    });

  const { mutate: deleteExercise, isLoading: isDeleting } =
    api.workouts.removeExerciseFromWorkout.useMutation({
      onSuccess() {
        // filter to the releveant set exercises
        const filteredExercises = workoutExercises.filter(
          (exercise) => exercise.set === exerciseToRemove.set
        );
        // sort exercises by index
        filteredExercises.sort((a, b) => a.index - b.index);
        filteredExercises.forEach((exercise) => {
          if (exercise.index > exerciseToRemove.index) {
            updateExerciseIndexInWorkout({
              exerciseId: exercise.id,
              workoutId: workoutId,
              index: exercise.index - 1,
            });
          }
        });
        const newIndexes: number[] = [...maxIndexesPerSet];
        newIndexes[exerciseToRemove.set - 1] -= 1;
        setMaxIndexes(newIndexes);
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full text-[0.6rem]"
          size={"sm"}
          variant={"ghost"}
        >
          <TrashIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto w-3/4 flex-col items-center justify-center">
        <DialogHeader className="h-fit">
          <DialogTitle>{"למחוק את התרגיל?"}</DialogTitle>
        </DialogHeader>
        {isDeleting || isUpdatingIndex ? (
          <LoadingSpinner size={40} />
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => {
              // find the removed exercise
              deleteExercise({
                workoutId: workoutId,
                exerciseId: exerciseToRemove.id,
              });
            }}
          >
            מחיקה
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
