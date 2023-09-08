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

type editExerciseModalProps = {
  exerciseId: string;
};
export function ExerciseDeleteModal({ exerciseId }: editExerciseModalProps) {
  const [open, setOpen] = useState(false);
  const utils = api.useContext();

  const { mutate: deleteExercise, isLoading } =
    api.exercises.delete.useMutation({
      async onSuccess() {
        await utils.exercises.getAllById.invalidate();
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
          <DialogTitle>למחוק את התרגיל?</DialogTitle>
        </DialogHeader>
        <Button
          variant={"destructive"}
          onClick={() => {
            deleteExercise({ exerciseId });
            setOpen(false);
          }}
        >
          מחיקה
        </Button>
      </DialogContent>
    </Dialog>
  );
}
