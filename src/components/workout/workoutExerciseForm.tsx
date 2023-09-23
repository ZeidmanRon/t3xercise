import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { LoadingSpinner } from "../layout/loading";
import { useState, type Dispatch, type SetStateAction, useEffect } from "react";

export const FormSchema = z.object({
  exerciseName: z.string({ required_error: "נא לבחור תרגיל" }),
  exerciseId: z.string(),
  category: z.string({
    required_error: "נא לבחור קבוצת שריר",
  }),
});

export const muscleGroups = [
  { label: "ישבן", value: "ישבן" },
  { label: "רגליים", value: "רגליים" },
  { label: "גב", value: "גב" },
  { label: "בטן", value: "בטן" },
  { label: "חזה", value: "חזה" },
  { label: "כתפיים", value: "כתפיים" },
  { label: "ידיים", value: "ידיים" },
  { label: "אירובי", value: "אירובי" },
];

type workoutExerciseFormProps = {
  workoutId: string;
  exercisesId: string[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export function WorkoutExerciseForm({
  workoutId,
  exercisesId,
  setOpenModal,
}: workoutExerciseFormProps) {
  const utils = api.useContext();
  const { mutate: addExercise, isLoading: isAddingExercise } =
    api.workouts.addExerciseToWorkout.useMutation({
      async onSuccess() {
        await utils.workouts.getWorkoutById.invalidate();
        setOpenModal(false);
      },
    });
  const { mutate: getExercises, data: exercisesOfCategory } =
    api.exercises.getAllOfCategory.useMutation({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [openMuscleGroup, setOpenMuscleGroup] = useState(false);
  const [openExerciseList, setOpenExerciseList] = useState(false);
  useEffect(() => {
    if (!exercisesOfCategory) return;
    exercisesId.forEach((exercisesId) => {
      const indexToRemove = exercisesOfCategory.findIndex(
        (exercise) => exercise.id === exercisesId
      );

      if (indexToRemove !== -1) {
        exercisesOfCategory.splice(indexToRemove, 1);
      }
    });
  }, [exercisesId, exercisesOfCategory]);

  function onSubmitCreate(data: z.infer<typeof FormSchema>) {
    addExercise({
      workoutId: workoutId,
      exerciseId: data.exerciseId,
    });
    form.reset();
  }

  return isAddingExercise ? (
    <div className="flex min-h-[200px] items-center justify-center">
      <LoadingSpinner size={40} />
    </div>
  ) : (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmitCreate)}
        className=" w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>קבוצת שריר</FormLabel>
              <Popover open={openMuscleGroup} onOpenChange={setOpenMuscleGroup}>
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
                      {field.value ?? "בחר/י קבוצת שריר"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="חפש/י קבוצת שריר" />
                    <CommandEmpty>לא קיימת קבוצת שריר זו</CommandEmpty>
                    <CommandGroup>
                      {muscleGroups.map((muscleGroup) => (
                        <CommandItem
                          value={muscleGroup.value}
                          key={muscleGroup.label}
                          onSelect={(currentValue) => {
                            form.setValue("category", currentValue);
                            setOpenMuscleGroup(false);
                            getExercises(currentValue);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              muscleGroup.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {muscleGroup.label}
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
        <FormField
          control={form.control}
          name="exerciseName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>תרגיל</FormLabel>
              <Popover
                open={openExerciseList}
                onOpenChange={setOpenExerciseList}
              >
                <PopoverTrigger disabled={!exercisesOfCategory} asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "font-light text-muted-foreground"
                      )}
                    >
                      {field.value ?? "בחר/י תרגיל"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder={
                        exercisesOfCategory?.length
                          ? "חפש/י קבוצת שריר"
                          : `לא נותרו תרגילי ${form.getValues("category")}`
                      }
                    />
                    <CommandEmpty>לא קיים תרגיל עם שם זה</CommandEmpty>
                    <CommandGroup>
                      {!!exercisesOfCategory
                        ? exercisesOfCategory.map((exercise) => (
                            <CommandItem
                              value={exercise.name}
                              key={exercise.id}
                              onSelect={(currentValue) => {
                                form.setValue("exerciseName", currentValue);
                                form.setValue("exerciseId", exercise.id);
                                setOpenExerciseList(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  exercise.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {exercise.name}
                            </CommandItem>
                          ))
                        : null}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <Button className="w-auto font-light" type="submit">
            יצירת תרגיל
          </Button>
        </div>
      </form>
    </Form>
  );
}
