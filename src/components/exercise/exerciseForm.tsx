import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
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
  category: z.string({
    required_error: "נא לבחור קבוצת שריר",
  }),
});

const muscleGroups = [
  { label: "ישבן", value: "ישבן" },
  { label: "רגליים", value: "רגליים" },
  { label: "גב", value: "גב" },
  { label: "חזה", value: "חזה" },
  { label: "כתפיים", value: "כתפיים" },
  { label: "ידיים", value: "ידיים" },
] as const;

type exerciseFormProps = {
  userFullName: string;
  userId: string;
  updateForm: boolean;
  exerciseId?: string;
};

export function ExerciseForm({
  userFullName,
  userId,
  updateForm,
  exerciseId,
}: exerciseFormProps) {
  const utils = api.useContext();
  const { mutate: createExercise, isLoading: isCreatingExercise } =
    api.exercises.create.useMutation({
      async onSuccess() {
        await utils.exercises.getAllById.invalidate();
      },
    });
  const { mutate: updateExercise, isLoading: isUpdatingExercise } =
    api.exercises.update.useMutation({
      async onSuccess() {
        await utils.exercises.getAllById.invalidate();
      },
    });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmitCreate(data: z.infer<typeof FormSchema>) {
    createExercise({
      name: data.name,
      category: data.category,
      authorName: userFullName,
      authorId: userId,
      desc: data.desc,
    });
    form.reset();
  }
  function onSubmitUpdate(data: z.infer<typeof FormSchema>) {
    updateExercise({
      exerciseId: exerciseId!,
      name: data.name,
      category: data.category,
      authorName: userFullName,
      authorId: userId,
      desc: data.desc,
    });
    form.reset();
  }

  return isCreatingExercise || isUpdatingExercise ? (
    <div> loading </div>
  ) : (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={
          updateForm
            ? form.handleSubmit(onSubmitUpdate)
            : form.handleSubmit(onSubmitCreate)
        }
        className=" w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>שם התרגיל</FormLabel>
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
              <FormLabel>אופן הביצוע</FormLabel>
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>קבוצת שריר</FormLabel>
              <Popover>
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
                      {field.value
                        ? muscleGroups.find(
                            (muscleGroup) => muscleGroup.value === field.value
                          )?.label
                        : "בחר/י קבוצת שריר"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>לא קיימת קבוצת שריר זו</CommandEmpty>
                    <CommandGroup>
                      {muscleGroups.map((muscleGroup) => (
                        <CommandItem
                          value={muscleGroup.label}
                          key={muscleGroup.value}
                          onSelect={() => {
                            form.setValue("category", muscleGroup.value);
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
        <div className="flex w-full justify-center">
          <Button className="w-auto font-light" type="submit">
            יצירת תרגיל
          </Button>
        </div>
      </form>
    </Form>
  );
}
