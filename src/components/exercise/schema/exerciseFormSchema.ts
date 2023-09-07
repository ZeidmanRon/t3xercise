import { z } from "zod";

export const ExerciseFormSchema = z.object({
  name: z.string().trim().nonempty({ message: "שדה זה הוא חובה" }),
  desc: z.string().optional(),
  category: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .nonempty({ message: `קבוצת שריר חסרה` }),
});

export type ExerciseFormType = z.infer<typeof ExerciseFormSchema>;
