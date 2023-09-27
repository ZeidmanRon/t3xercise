import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../layout/loading";
import Swal from "sweetalert2";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

import { Command, CommandGroup, CommandItem } from "~/components/ui/command";

export function WorkoutCreateModal() {
  const utils = api.useContext();
  const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);
  const [displayLoadingDialog, setDisplayLoadingDialog] = useState(false);
  const [openSupersets, setOpenSupersets] = useState(false);

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

  // useEffect for loading screen
  useEffect(() => {
    if (isLoadingWorkout) {
      setDisplayLoadingDialog(true);
      return;
    }
    setDisplayLoadingDialog(false);
  }, [isLoadingWorkout]);

  //useEffect for showing Errors
  useEffect(() => {
    if (workoutError) {
      setOpenWorkoutDialog(false);
      void Swal.fire({
        title: "שגיאה!",
        text: workoutError?.message,
        icon: "error",
        confirmButtonText: "אוקיי",
      });
    }
  }, [workoutError]);

  //useEffect for done creating workout
  useEffect(() => {
    if (workoutData) {
      setOpenWorkoutDialog(false);
    }
  }, [workoutData]);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    createWorkout({
      title: data.workoutName,
      sets: parseInt(data.sets),
    }); //reset dialog variables
    form.resetField("workoutName");
  }

  const FormSchema = z.object({
    workoutName: z.string({ required_error: "חסר" }).min(3, {
      message: "לפחות 3 אותיות",
    }),
    sets: z.string({ required_error: "חסר" }),
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
      <DialogContent className="top-52 flex h-auto w-11/12 flex-col">
        {displayLoadingDialog ? (
          <div className="flex min-h-[180px] items-center justify-center py-10">
            <LoadingSpinner size={40} />
          </div>
        ) : (
          <div className="flex min-h-[180px] w-full flex-1 flex-col items-center justify-center">
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
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sets"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>סופרסטים</FormLabel>
                      <Popover
                        open={openSupersets}
                        onOpenChange={setOpenSupersets}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value &&
                                  "font-light text-muted-foreground"
                              )}
                            >
                              {field.value ?? "בחר/י מספר סופרסטים"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandGroup>
                              {[1, 2, 3, 4, 5].map((number) => (
                                <CommandItem
                                  value={`${number}`}
                                  key={number}
                                  onSelect={(currentValue) => {
                                    form.setValue("sets", currentValue);
                                    setOpenSupersets(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      `${number}` === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {number}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-center">
                  <Button type="submit">צור אימון</Button>
                </div>
              </form>
            </Form>
            <Label className="pt-5">
              או{" "}
              <Link href={"#"} className="text-blue-500">
                הוספת אימון קיים
              </Link>
            </Label>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
