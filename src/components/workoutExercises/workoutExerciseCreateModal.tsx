import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { WorkoutExerciseForm } from "../workout/workoutExerciseForm";

interface WorkoutExerciseCreateModal {
  workoutId: string;
  exercisesId: string[];
}
export function WorkoutExerciseCreateModal({
  workoutId,
  exercisesId,
}: WorkoutExerciseCreateModal) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="w-auto" variant="outline">
          הוספת תרגיל
        </Button>
      </DialogTrigger>
      <DialogContent className="top-60 flex h-auto w-11/12 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>הוספת תרגיל לאימון</DialogTitle>
        </DialogHeader>
        <WorkoutExerciseForm
          workoutId={workoutId}
          setOpenModal={setOpenModal}
          exercisesId={exercisesId}
        />
      </DialogContent>
    </Dialog>
  );
}
