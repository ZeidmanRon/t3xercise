import { type ExerciseFormType } from "./exerciseFormSchema";
import { type FieldErrors } from "react-hook-form";

type ExerciseFieldName = "name" | "desc" | "category";

export interface InputErrorProps {
  name: ExerciseFieldName;
  errors: FieldErrors<ExerciseFormType>;
}

export interface InputProps extends InputErrorProps {
  label: string;
  type?: "text";
  placeholder?: string;
}

export interface SelectProps extends InputProps {
  options: {
    value: string;
    label: string;
  }[];
}

export interface ReactSelectProps extends SelectProps {
  isMulti: boolean;
}
