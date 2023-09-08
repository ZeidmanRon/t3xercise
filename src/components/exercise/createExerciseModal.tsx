import { Button } from "~/components/ui/button";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { NewExerciseForm } from "./newExerciseForm";

export const formSchema = z.object({
  name: z.string().trim().nonempty({ message: "error" }),
  desc: z.string().optional(),
  category: z.string().trim().nonempty({ message: "error" }),
});

export function CreateExerciseModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">תרגיל חדש</Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto w-3/4 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>יצירת תרגיל</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <NewExerciseForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
