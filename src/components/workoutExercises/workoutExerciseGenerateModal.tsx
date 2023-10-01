import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { RepeatIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../layout/loading";
import { useExercises } from "~/pages/workouts/[workoutId]";
import Swal from "sweetalert2";

type editExerciseModalProps = {
  exercise: {
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
  set: number;
};

export function WorkoutExerciseGenerateModal({
  exercise,
  workoutId,
  set,
}: editExerciseModalProps) {
  const workoutExercises = useExercises();
  const [openDialog, setOpenDialog] = useState(false);
  const utils = api.useContext();

  //get all exercsies Of Category
  const {
    mutate: getExercises,
    data: exercisesOfCategory,
    isLoading: isLoadingExercises,
  } = api.exercises.getAllOfCategory.useMutation();

  //remove Exercise from workout
  const { mutate: deleteExercise, isLoading: isDeleting } =
    api.workouts.removeExerciseFromWorkout.useMutation();

  //add Exercise to workout
  const { mutate: addExercise, isLoading: isAddingExercise } =
    api.workouts.addExerciseToWorkout.useMutation({
      async onSuccess() {
        await utils.workouts.getWorkoutById.invalidate();
        setOpenDialog(false);
      },
    });

  useEffect(() => {
    if (!exercisesOfCategory) return;
    workoutExercises.forEach((Exercise) => {
      const indexToRemove = exercisesOfCategory.findIndex(
        (exercise) => exercise.id === Exercise.id
      );

      if (indexToRemove !== -1) {
        exercisesOfCategory.splice(indexToRemove, 1);
      }
    });
  }, [exercisesOfCategory, workoutExercises]);

  function generateExercise() {
    if (exercisesOfCategory?.length === 0 || !exercisesOfCategory) {
      setOpenDialog(false);
      void Swal.fire({
        title: "שגיאה!",
        text: `לא נותרו תרגילי ${exercise.category}`,
        icon: "error",
        confirmButtonText: "אוקיי",
      });
      return;
    }
    const randomIndex = Math.floor(Math.random() * exercisesOfCategory.length);
    const randomExercise = exercisesOfCategory[randomIndex];

    deleteExercise({ workoutId: workoutId, exerciseId: exercise.id });
    addExercise({
      exerciseId: randomExercise!.id,
      workoutId: workoutId,
      set: set,
      index: exercise.index,
    });
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full text-[0.6rem]"
          size={"sm"}
          variant={"ghost"}
          onClick={() => getExercises(exercise.category)}
        >
          <RepeatIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto w-3/4 flex-col items-center justify-center">
        <DialogHeader className="h-fit">
          <DialogTitle>{"להגריל תרגיל חדש?"}</DialogTitle>
        </DialogHeader>
        {isLoadingExercises || isDeleting || isAddingExercise ? (
          <LoadingSpinner size={40} />
        ) : (
          <Button variant={"default"} onClick={() => generateExercise()}>
            כן
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
