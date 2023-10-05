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
import { useExercises } from "~/pages/workouts/[workoutId]";
import { ScrollArea } from "~/components/ui/scroll-area";

export const FormSchema = z.object({
  exerciseName: z.string({ required_error: "נא לבחור תרגיל" }),
  exerciseId: z.string(),
  exerciseSet: z.number(),
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
  sets: number;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  maxIndexPerSet: number[];
};
  
export function WorkoutExerciseForm({
  workoutId,
  sets,
  setOpenModal,
  maxIndexPerSet,
}: workoutExerciseFormProps) {
  const workoutExercises = useExercises();
  const utils = api.useContext();
  const [openMuscleGroup, setOpenMuscleGroup] = useState(false);
  const [openExerciseList, setOpenExerciseList] = useState(false);
  const [openSetList, setOpenSetList] = useState(false);

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

  useEffect(() => {
    if (!exercisesOfCategory || workoutExercises.length === 0) return;
    workoutExercises.forEach((Exercise) => {
      const indexToRemove = exercisesOfCategory.findIndex(
        (exercise) => exercise.id === Exercise.id
      );

      if (indexToRemove !== -1) {
        exercisesOfCategory.splice(indexToRemove, 1);
      }
    });
  }, [exercisesOfCategory, workoutExercises]);

  function onSubmitCreate(data: z.infer<typeof FormSchema>) {
    addExercise({
      workoutId: workoutId,
      set: data.exerciseSet,
      exerciseId: data.exerciseId,
      index: maxIndexPerSet[data.exerciseSet - 1]! + 1,
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
                    <ScrollArea className="h-44" dir="rtl">
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
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <FormField
            control={form.control}
            name="exerciseName"
            render={({ field }) => (
              <FormItem className="flex flex-col pl-4">
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
                  <PopoverContent className="w-full">
                    <Command>
                      <CommandInput
                        placeholder={
                          exercisesOfCategory?.length
                            ? "חפש/י תרגיל"
                            : `לא נותרו תרגילי ${form.getValues("category")}`
                        }
                      />
                      <ScrollArea className="h-32" dir="rtl">
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
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exerciseSet"
            render={({ field }) => (
              <FormItem className="flex min-w-[100px] flex-col pr-4">
                <FormLabel>סט</FormLabel>
                <Popover open={openSetList} onOpenChange={setOpenSetList}>
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
                        {field.value ?? ""}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <Command>
                      <CommandGroup>
                        {[...Array(sets).keys()]
                          .map((i) => i + 1)
                          .map((number) => (
                            <CommandItem
                              value={`${number}`}
                              key={number}
                              onSelect={(currentValue) => {
                                form.setValue(
                                  "exerciseSet",
                                  parseInt(currentValue)
                                );
                                setOpenSetList(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  number === field.value
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
        </div>
        <div className="flex w-full justify-center">
          <Button className="w-auto font-light" type="submit">
            יצירת תרגיל
          </Button>
        </div>
      </form>
    </Form>
  );
}
