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

type userProps = {
  userFullName: string;
  userId: string;
};
export function ExerciseEditModal({ userFullName, userId }: userProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">תרגיל חדש</Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto min-h-[400px] w-3/4 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>יצירת תרגיל</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <ExerciseForm
            setOpen={setOpen}
            updateForm={false}
            userFullName={userFullName}
            userId={userId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
