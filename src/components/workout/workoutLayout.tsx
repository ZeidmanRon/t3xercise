import * as React from "react";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import ExercisePerMuscle from "./exercisePerMuscle";

interface ChildComponentProps {
  setters: {
    setter: React.Dispatch<React.SetStateAction<number>>;
    label: string;
  }[];
}
export default function WorkoutLayout({ setters }: ChildComponentProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border">
      <div className="flex h-auto w-full px-2 pt-2 text-right underline">
        <Label className="text-sm">מבנה האימון:</Label>
      </div>

      <div className="flex h-full w-full justify-center p-4">
        <ScrollArea dir="rtl" className=" h-auto max-h-[15rem] w-full px-4">
          {setters.map(({ setter, label }) => (
            <ExercisePerMuscle
              setExercisesPerMuscle={setter}
              key={label}
              label={label}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
