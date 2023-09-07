export enum BodyParts {
  booty = "ישבן",
  legs = "רגליים",
  back = "גב",
  chest = "חזה",
  shoulders = "כתפיים",
  arms = "ידיים",
}

type Exercise = {
  name: string;
  category: string;
  desc: string | undefined;
};

const createExercise = async (
  exerciseName: string,
  category: string,
  desc: string
) => {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async operation completed");
    }, 2000); // Simulate a 2-second delay
  });

  console.log(exerciseName, category, desc);
  return;
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "נא להזין את שם התרגיל" })
    .max(50, {
      message: "השם ארוך מדי",
    }),
  desc: z.string().max(190, {
    message: "הפירוט ארוך מדי",
  }),
  category: z.string().trim().nonempty({ message: "error" }),
});

export function NewExerciseForm() {
  const [exerciseName, setExerciseName] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createExercise(data.name, data.category, data.desc ?? "");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>שם התרגיל</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="enter exercise name"
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
                  className="resize-none"
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
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="enter exercise name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
