import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { muscleGroups } from "~/components/globals";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useState, type Dispatch, type SetStateAction } from "react";
import { type Exercise } from "@prisma/client";
import { ScrollArea } from "~/components/ui/scroll-area";
import Swal from "sweetalert2";

export const FormSchema = z.object({
  name: z
    .string({ required_error: "נא להזין את שם התרגיל" })
    .trim()
    .min(2, { message: "נא להזין שם ארוך יותר" })
    .max(50, {
      message: "השם ארוך מדי",
    }),
  desc: z
    .string()
    .trim()
    .max(190, {
      message: "הפירוט ארוך מדי",
    })
    .optional(),
  category: z
    .string({
      required_error: "נא לבחור קבוצת שריר",
    })
    .min(2, { message: "נא להזין קבוצת שריר" }),
});

type exerciseFormProps = {
  exercise?: Exercise;
  setOpenExerciseForm: Dispatch<SetStateAction<boolean>>;
};

export function ExerciseForm({
  exercise,
  setOpenExerciseForm,
}: exerciseFormProps) {
  const utils = api.useContext();
  const { mutate: upsertExercise, isLoading: isUpsertingExercise } =
    api.exercises.upsert.useMutation({
      async onSuccess() {
        await utils.exercises.getAll.invalidate();
        setOpenExerciseForm(false);
      },
      onError(error) {
        setOpenExerciseForm(false);
        void Swal.fire({
          title: "שגיאה!",
          text: error?.message,
          icon: "error",
          confirmButtonText: "אוקיי",
        });
      },
    });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: !!exercise ? exercise.category : "",
      name: !!exercise ? exercise.name : "",
      desc: !!exercise ? exercise.desc : "",
    },
  });
  const [openMuscleGroup, setOpenMuscleGroup] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    upsertExercise({
      exerciseId: exercise?.id,
      name: data.name.trim(),
      category: data.category,
      desc: data.desc?.trim(),
    });
    form.reset();
  }

  return isUpsertingExercise ? (
    <div className="flex min-h-[245px] items-center justify-center">
      <LoadingSpinner size={40} />
    </div>
  ) : (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  space-y-4"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
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
                      {!field.value ? "בחר/י קבוצת שריר" : field.value}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" w-full p-0">
                  <Command>
                    <ScrollArea className="h-44" dir="rtl">
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={cn(
                    "resize-none",
                    !field.value && "font-light text-muted-foreground"
                  )}
                  autoComplete="off"
                  placeholder="שם התרגיל"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="ניתן לפרט על התרגיל או על אופן הביצוע"
                  className={cn(
                    "resize-none",
                    !field.value && "font-light text-muted-foreground"
                  )}
                  {...field}
                />
              </FormControl>
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
