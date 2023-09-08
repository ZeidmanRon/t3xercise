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

type editExerciseModalProps = {
  userFullName: string;
  userId: string;
  exerciseId: string;
};
export function ExerciseEditModal({
  userFullName,
  userId,
  exerciseId,
}: editExerciseModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full text-[0.6rem]"
          size={"sm"}
          variant={"ghost"}
        >
          <EditIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto min-h-[400px] w-3/4 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>עריכה</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <ExerciseForm
            updateForm={true}
            userFullName={userFullName}
            userId={userId}
            exerciseId={exerciseId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}