import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { api } from "~/utils/api";

export function WorkoutExerciseCreateModal() {
  const [openModal, setOpenModal] = useState(false);
  const utils = api.useContext();
  const { mutate: addExercise, isLoading: isAddingExercise } =
    api.workouts.addExerciseToWorkout.useMutation({
      async onSuccess() {
        await utils.exercises.getAllById.invalidate();
        setOpenModal(false);
      },
    });

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="w-auto" variant="outline">
          הוספת תרגיל
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto min-h-[400px] w-11/12 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>הוספת תרגיל לאימון</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
