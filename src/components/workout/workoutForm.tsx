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
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";

interface WorkoutFormProps {
  setDisplayLoadingDialog: Dispatch<SetStateAction<boolean>>;
  setOpenWorkoutDialog: Dispatch<SetStateAction<boolean>>;
}

export default function WorkoutForm({
  setDisplayLoadingDialog,
  setOpenWorkoutDialog,
}: WorkoutFormProps) {
  const utils = api.useContext();
  const [openSupersets, setOpenSupersets] = useState(false);

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
    sets: z.string({ required_error: "חסר" }),
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
      sets: parseInt(data.sets),
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
        <FormField
          control={form.control}
          name="sets"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={openSupersets} onOpenChange={setOpenSupersets}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "font-light text-muted-foreground"
                      )}
                    >
                      {field.value ?? "מספר סטים"}
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
          <Button type="submit" className="font-normal">
            יצירת אימון
          </Button>
        </div>
      </form>
    </Form>
  );
}
