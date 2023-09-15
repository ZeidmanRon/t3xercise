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

type editExerciseModalProps = {
  exerciseId: string;
};
export function ExerciseEditModal({ exerciseId }: editExerciseModalProps) {
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
      <DialogContent className="flex h-auto min-h-[400px] w-11/12 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>עריכה</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <ExerciseForm
            setOpenExerciseForm={setOpen}
            updateForm={true}
            exerciseId={exerciseId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
