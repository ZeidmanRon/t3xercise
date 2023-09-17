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
import Swal from "sweetalert2";
import { type Exercise } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export function WorkoutCreateModal() {
  const utils = api.useContext();
  const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);
  const [displayLoadingDialog, setDisplayLoadingDialog] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
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
    data: generatedExercises,
    isLoading: isLoadingExercises,
    error: ExericseError,
  } = api.exercises.getRandomExercises.useMutation({});
  const {
    mutate: createWorkout,
    data: workoutData,
    isLoading: isLoadingWorkout,
    error: workoutError,
  } = api.workouts.create.useMutation({
    async onSuccess() {
      await utils.workouts.getMostUpdated.invalidate();
      await utils.workouts.getAll.invalidate();
    },
  });

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
  // useEffect for loading screen
  useEffect(() => {
    if (isLoadingExercises || isLoadingWorkout) {
      setDisplayLoadingDialog(true);
      return;
    }
    setDisplayLoadingDialog(false);
  }, [isLoadingExercises, isLoadingWorkout]);

  //useEffect for showing Errors
  useEffect(() => {
    if (ExericseError ?? workoutError) {
      setOpenWorkoutDialog(false);
      void Swal.fire({
        title: "שגיאה!",
        text: ExericseError?.message ?? workoutError?.message,
        icon: "error",
        confirmButtonText: "אוקיי",
      });
    }
  }, [ExericseError, workoutError]);

  useEffect(() => {
    if (!generatedExercises || generatedExercises.length === 0) return;
    const generatedExercisesIds = generatedExercises.map(
      (exercise: Exercise) => exercise.id
    );
    createWorkout({
      selectedExercisesIds: generatedExercisesIds,
      title: workoutName,
    });
    generatedExercises.splice(0, generatedExercises.length);
  }, [createWorkout, generatedExercises, workoutName]);

  //useEffect for done creating workout
  useEffect(() => {
    if (workoutData) {
      setOpenWorkoutDialog(false);
    }
  }, [ExericseError, workoutData]);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    setWorkoutName(data.workoutName);
    const totalNumberOfExercises = values.reduce((total, value) => {
      return total + value.numberOfExercises;
    }, 0);
    if (totalNumberOfExercises < 5) {
      setOpenWorkoutDialog(false);
      void Swal.fire({
        title: "שגיאה!",
        text: "אימון חייב לכלול לפחות 5 תרגילים",
        icon: "error",
        confirmButtonText: "אוקיי",
        allowOutsideClick: true,
        position: "center",
      });
    } else {
      // generate random exercises
      getRandomExercises(values);
    }
    //reset dialog variables
    form.resetField("workoutName");
    setters.map(({ setter }) => {
      setter(0);
    });
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
  const FormSchema = z.object({
    workoutName: z.string({ required_error: "חסר" }).min(3, {
      message: "לפחות 3 אותיות",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  // isUpdatingWorkout
  return (
    <Dialog open={openWorkoutDialog} onOpenChange={setOpenWorkoutDialog}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>הוספת אימון</Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto w-11/12 flex-col">
        {displayLoadingDialog ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingSpinner size={40} />
          </div>
        ) : (
          <>
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
              <Form {...form}>
                <form
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="w-2/3 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="workoutName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם האימון</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">צור אימון</Button>
                </form>
              </Form>
              <Label className="pt-5">
                או{" "}
                <Link href={"#"} className="text-blue-500">
                  הוספת אימון קיים
                </Link>
              </Label>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
