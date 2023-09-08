import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

export const formSchema = z.object({
  name: z.string().trim().nonempty({ message: "error" }),
  desc: z.string().optional(),
  category: z.string().trim().nonempty({ message: "error" }),
});

export function CreateExerciseDialog() {
  const utils = api.useContext();
  const { user } = useUser();

  const { mutate: createExercise, isLoading: isCreatingExercise } =
    api.exercises.create.useMutation({
      async onSuccess(data, variables, context) {
        await utils.exercises.getAll.invalidate();
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Assuming you're making a POST request to an API endpoint
      createExercise({
        name: "",
        category: "",
        authorName: user!.fullName!,
        authorId: user!.id,
        desc: values.desc,
      });
      // Optionally, return data if needed (e.g., the created exercise data)
      // return responseData;
    } catch (error) {
      // Handle errors if necessary
      console.error("Error creating exercise:", error);

      // Optionally, rethrow the error to display it in a form message
      // throw error;
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">תרגיל חדש</Button>
      </DialogTrigger>
      <DialogContent className="flex h-5/6 w-5/6 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>יצירת תרגיל</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-2 mt-0 space-y-0">
                  <FormLabel className="">שם תרגיל</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="mb-2 mt-0 h-1/3 space-y-0">
                  <FormControl>
                    <textarea
                      autoComplete="off"
                      className="flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="פירוט (אופציונלי)"
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
                <FormItem className="mb-10 mt-0 space-y-0">
                  <FormLabel>קבוצת שריר</FormLabel>
                  <FormControl {...field}>
                    {/* <muscleGroupSelect selectOptions={Object.values(BodyParts)} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
