import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { WorkoutExerciseForm } from "./workoutExerciseForm";
import { type Workout } from "@prisma/client";

interface WorkoutExerciseCreateModal {
  workout: Workout;
}
export function WorkoutExerciseCreateModal({
  workout,
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
          workoutId={workout.id}
          sets={workout.sets}
          setOpenModal={setOpenModal}
        />
      </DialogContent>
    </Dialog>
  );
}
