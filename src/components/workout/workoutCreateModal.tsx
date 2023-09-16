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
  const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);
  const [exercisesPerBooty, setExercisesPerBooty] = useState(0);
  const [exercisesPerLegs, setExercisesPerLegs] = useState(0);
  const [exercisesPerBack, setExercisesPerBack] = useState(0);
  const [exercisesPerAbs, setExercisesPerAbs] = useState(0);
  const [exercisesPerChest, setExercisesPerChest] = useState(0);
  const [exercisesPerShoulders, setExercisesPerShoulders] = useState(0);
  const [exercisesPerHands, setExercisesPerHands] = useState(0);
  const [exercisesPerAerobic, setExercisesPerAerobic] = useState(0);

  const values = [
    { value: exercisesPerBooty, label: "ישבן" },
    { value: exercisesPerLegs, label: "רגליים" },
    { value: exercisesPerBack, label: "גב" },
    { value: exercisesPerAbs, label: "בטן" },
    { value: exercisesPerChest, label: "חזה" },
    { value: exercisesPerShoulders, label: "כתפיים" },
    { value: exercisesPerHands, label: "ידיים" },
    { value: exercisesPerAerobic, label: "אירובי" },
  ];
  function handleSubmit() {
    console.log("\n\nמספר התרגילים פר קבוצת שריר");
    values.map((value) => {
      console.log(value);
    });
    //todo 1: generate random exercises

    //todo 2: create new workout with the generated exercises

    //todo 3: invalidate workouts (refresh get workouts datad from the DB)

    //4: reset exercises per muscleGroup values
    setters.map(({ setter }) => {
      setter(0);
    });
  }
  const setters = [
    { setter: setExercisesPerBooty, label: "ישבן" },
    { setter: setExercisesPerLegs, label: "רגליים" },
    { setter: setExercisesPerBack, label: "גב" },
    { setter: setExercisesPerAbs, label: "בטן" },
    { setter: setExercisesPerChest, label: "חזה" },
    { setter: setExercisesPerShoulders, label: "כתפיים" },
    { setter: setExercisesPerHands, label: "ידיים" },
    { setter: setExercisesPerAerobic, label: "אירובי" },
  ];

  return (
    <Dialog open={openWorkoutDialog} onOpenChange={setOpenWorkoutDialog}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>הוספת אימון</Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto w-11/12 flex-col">
        <DialogHeader className="">
          <DialogTitle>יצירת אימון</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-2">
          <WorkoutLayout setters={setters} />
          <div className="flex items-center">
            <Switch dir="ltr" id="include-business-exercises" />
            <Label
              htmlFor="include-business-exercises"
              className="pr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              לכלול תרגילים מיתר המאמנים בעסק?
            </Label>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
              setOpenWorkoutDialog(false);
            }}
          >
            <Button type="submit">צור אימון</Button>
          </form>
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
