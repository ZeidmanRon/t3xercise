import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ExerciseForm } from "./exerciseForm";
import { useState } from "react";

export function ExerciseCreateModal() {
  const [openExerciseForm, setOpenExerciseForm] = useState(false);

  return (
    <Dialog open={openExerciseForm} onOpenChange={setOpenExerciseForm}>
      <DialogTrigger asChild>
        <Button variant="outline">תרגיל חדש</Button>
      </DialogTrigger>
      <DialogContent className="top-60 flex h-auto min-h-[230px] w-11/12 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>יצירת תרגיל</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 flex-col">
          <ExerciseForm setOpenExerciseForm={setOpenExerciseForm} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
