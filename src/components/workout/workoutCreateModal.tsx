import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useEffect, useState } from "react";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import WorkoutLayout from "./workoutLayout";
import Link from "next/link";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../layout/loading";

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
  const {
    mutate: getRandomExercises,
    data,
    isLoading,
    isError,
  } = api.exercises.getRandomExercises.useMutation({});

  //* exercisesPerX represents the number of the exercises the user demands.
  const values = [
    { numberOfExercises: exercisesPerBooty, category: "ישבן" },
    { numberOfExercises: exercisesPerLegs, category: "רגליים" },
    { numberOfExercises: exercisesPerBack, category: "גב" },
    { numberOfExercises: exercisesPerAbs, category: "בטן" },
    { numberOfExercises: exercisesPerChest, category: "חזה" },
    { numberOfExercises: exercisesPerShoulders, category: "כתפיים" },
    { numberOfExercises: exercisesPerHands, category: "ידיים" },
    { numberOfExercises: exercisesPerAerobic, category: "אירובי" },
  ];

  useEffect(() => {
    if (data) console.log(data);
  });

  function handleSubmit() {
    console.log("\n\nמספר התרגילים פר קבוצת שריר");
    getRandomExercises(values);

    //todo *: show a loading while fetching

    //todo 1: generate random exercises

    //todo 2: create new workout with the generated exercises

    //todo 3: invalidate workouts (refresh get workouts datad from the DB)

    //4: reset exercises per muscleGroup values
    setters.map(({ setter }) => {
      setter(0);
    });
    // 5 close dialog
    setOpenWorkoutDialog(false);
  }
  const setters = [
    { setter: setExercisesPerBooty, category: "ישבן" },
    { setter: setExercisesPerLegs, category: "רגליים" },
    { setter: setExercisesPerBack, category: "גב" },
    { setter: setExercisesPerAbs, category: "בטן" },
    { setter: setExercisesPerChest, category: "חזה" },
    { setter: setExercisesPerShoulders, category: "כתפיים" },
    { setter: setExercisesPerHands, category: "ידיים" },
    { setter: setExercisesPerAerobic, category: "אירובי" },
  ];

  // isUpdatingWorkout
  return isLoading ? (
    <div className="flex min-h-[400px] items-center justify-center">
      <LoadingSpinner size={40} />
    </div>
  ) : (
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
            }}
          >
            <Button>צור אימון</Button>
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
