import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";

type muscleGroup = {
  category: string;
  setExercisesPerMuscle: React.Dispatch<React.SetStateAction<number>>;
};
export default function ExercisePerMuscle({
  category,
  setExercisesPerMuscle,
}: muscleGroup) {
  function handleSelectChange(value: string) {
    setExercisesPerMuscle(parseInt(value));
  }

  return (
    <div className="flex flex-col" key={category}>
      <div className="flex h-12 w-full items-center justify-between px-2 text-sm">
        תרגילי {category}
        <Select dir="rtl" onValueChange={handleSelectChange}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-2" />
    </div>
  );
}
