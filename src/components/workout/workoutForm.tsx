import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { cn } from "~/lib/utils";

import { useEffect, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";

interface WorkoutFormProps {
  setDisplayLoadingDialog: Dispatch<SetStateAction<boolean>>;
  setCreateWorkoutDialog: Dispatch<SetStateAction<boolean>>;
}

export default function WorkoutForm({
  setDisplayLoadingDialog,
  setCreateWorkoutDialog: setOpenWorkoutDialog,
}: WorkoutFormProps) {
  const utils = api.useContext();

  const { mutate: createWorkout, error: workoutError } =
    api.workouts.create.useMutation({
      async onSuccess() {
        await utils.workouts.getMostUpdated.invalidate();
        await utils.workouts.getAll.invalidate();
        setDisplayLoadingDialog(false);
        setOpenWorkoutDialog(false);
      },
    });

  const FormSchema = z.object({
    workoutName: z.string({ required_error: "חסר" }).min(3, {
      message: "לפחות 3 אותיות",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workoutName: "", // Set initial values here
    },
  });

  //useEffect for showing Errors
  useEffect(() => {
    if (workoutError) {
      setOpenWorkoutDialog(false);
      setDisplayLoadingDialog(false);
      void Swal.fire({
        title: "שגיאה!",
        text: workoutError?.message,
        icon: "error",
        confirmButtonText: "אוקיי",
      });
    }
  }, [workoutError]);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    setDisplayLoadingDialog(true);
    createWorkout({
      title: data.workoutName,
    }); //reset dialog variables
    form.resetField("workoutName");
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-2/3 space-y-3"
      >
        <FormField
          control={form.control}
          name="workoutName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>שם האימון</FormLabel>
              <FormControl>
                <Input
                  placeholder="שם"
                  autoComplete="off"
                  className={cn(
                    !field.value && "font-light text-muted-foreground"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center">
          <Button type="submit" className="font-normal">
            יצירת אימון
          </Button>
        </div>
      </form>
    </Form>
  );
}
