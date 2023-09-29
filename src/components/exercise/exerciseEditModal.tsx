import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ExerciseForm } from "./exerciseForm";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { type Exercise } from "@prisma/client";

type editExerciseModalProps = {
  exercise: Exercise;
};

export function ExerciseEditModal({ exercise }: editExerciseModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full text-[0.6rem]"
          size={"sm"}
          variant={"ghost"}
        >
          <EditIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="top-60 flex h-auto min-h-[230px] w-11/12 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>עריכה</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <ExerciseForm
            setOpenExerciseForm={setOpen}
            updateForm={true}
            exercise={exercise}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
