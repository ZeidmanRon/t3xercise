import { Label } from "../ui/label";
import MuscleGroupDynamicTable from "./muscleGroupDynamicTable";

export default function WorkoutLayout() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col text-right">
        <Label className="text-sm">מבנה האימון:</Label>
      </div>
      <MuscleGroupDynamicTable
        muscleInputs={[{ category: "testCategory", numberOfExercises: 3 }]}
      />
      <div className="flex flex-col p-3 text-center"></div>
    </div>
  );
}
