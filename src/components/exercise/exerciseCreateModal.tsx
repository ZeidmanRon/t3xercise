import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ExerciseForm } from "./exerciseForm";

type userProps = {
  userFullName: string;
  userId: string;
};
export function ExerciseEditModal({ userFullName, userId }: userProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">תרגיל חדש</Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto min-h-[400px] w-3/4 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>יצירת תרגיל</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <ExerciseForm
            updateForm={false}
            userFullName={userFullName}
            userId={userId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
