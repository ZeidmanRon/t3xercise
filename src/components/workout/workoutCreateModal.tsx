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
      <DialogContent className="flex h-auto w-11/12 flex-col">
        <DialogHeader className="">
          <DialogTitle>יצירת אימון</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-2">
          <WorkoutLayout />
          <div className="flex items-center">
            <Switch dir="ltr" id="include-business-exercises" />
            <Label
              htmlFor="include-business-exercises"
              className="pr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              לכלול תרגילים מיתר המאמנים בעסק?
            </Label>
          </div>
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
