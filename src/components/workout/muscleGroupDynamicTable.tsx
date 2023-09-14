import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { MuscleGroupInputSkeleton } from "./muscleGroupInputSkeleton";
export type MuscleGroupInput = {
  category: string;
  numberOfExercises: number;
  // removeInput:useState
};
type MuscleGroupInputListProps = { muscleInputs: MuscleGroupInput[] };

export default function MuscleGroupDynamicTable({
  muscleInputs,
}: MuscleGroupInputListProps) {
  return (
    <div className="flex w-full justify-center">
      <ScrollArea dir="rtl" className="max-h-96 w-full rounded-md border px-2">
        <div className="flex h-full w-full items-center justify-center">
          <Label className="ml-3">{"קבוצת שריר"}</Label>
          <Label>{"מספר תרגילים"}</Label>
        </div>
        {muscleInputs.map((muscleGroupInput, index) => (
          <div
            className={`w-full ${index !== 0 ? "border-t border-dashed" : ""} `}
            key={index}
          >
            <MuscleGroupInputSkeleton muscleGroupInput={muscleGroupInput} />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
