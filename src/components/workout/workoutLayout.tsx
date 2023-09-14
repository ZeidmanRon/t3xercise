// YourParentComponent.tsx
import React, { useState } from "react";
import MuscleGroupDynamicTable, {
  type GroupMuscleInput,
} from "./muscleGroupDynamicTable";

const YourParentComponent: React.FC = () => {
  const [groupMuscleInputs, setGroupMuscleInputs] = useState<
    GroupMuscleInput[]
  >([
    // Initialize with some default data if needed
    { groupMuscle: "", numberOfExercises: 1 },
  ]);

  const handleGroupMuscleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedInputs = [...groupMuscleInputs];
    updatedInputs[index][field] = value;
    setGroupMuscleInputs(updatedInputs);
  };

  const handleRemoveRow = (index: number) => {
    const updatedInputs = [...groupMuscleInputs];
    updatedInputs.splice(index, 1);
    setGroupMuscleInputs(updatedInputs);
  };

  const handleAddRow = () => {
    setGroupMuscleInputs([
      ...groupMuscleInputs,
      { groupMuscle: "", numberOfExercises: 1 },
    ]);
  };

  return (
    <div>
      <MuscleGroupDynamicTable
        groupMuscleInputs={groupMuscleInputs}
        onGroupMuscleInputChange={handleGroupMuscleInputChange}
        onRemoveRow={handleRemoveRow}
        onAddRow={handleAddRow}
      />
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default YourParentComponent;
