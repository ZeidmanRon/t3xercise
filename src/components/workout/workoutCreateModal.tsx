import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import WorkoutLayout from "./workoutLayout";
import Link from "next/link";

export function WorkoutCreateModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>הוספת אימון</Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto min-h-[400px] w-3/4 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>יצירת אימון</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 flex-col items-center justify-center space-y-2">
          <WorkoutLayout />
          <Label>לכלול תרגילים מיתר המאמנים בעסק?</Label>
          <Button>צור אימון</Button>
          <Label className="pt-5">
            או{" "}
            <Link href={"#"} className="text-blue-500">
              הוספת אימון קיים
            </Link>
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
