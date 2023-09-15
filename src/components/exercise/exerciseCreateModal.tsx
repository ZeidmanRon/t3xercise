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
      <DialogContent className="flex h-auto min-h-[400px] w-3/4 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>יצירת תרגיל</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <ExerciseForm
            setOpenExerciseForm={setOpenExerciseForm}
            updateForm={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
