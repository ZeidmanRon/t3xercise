// DynamicTable.tsx
import React, { useState } from "react";

export interface GroupMuscleInput {
  groupMuscle: string;
  numberOfExercises: number;
}

export interface DynamicTableProps {
  groupMuscleInputs: GroupMuscleInput[];
  onGroupMuscleInputChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  onRemoveRow: (index: number) => void;
  onAddRow: () => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  groupMuscleInputs,
  onGroupMuscleInputChange,
  onRemoveRow,
  onAddRow,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Group Muscle</th>
          <th>Number of Exercises</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {groupMuscleInputs.map((input, index) => (
          <tr key={index}>
            <td>
              <select
                value={input.groupMuscle}
                onChange={(e) =>
                  onGroupMuscleInputChange(index, "groupMuscle", e.target.value)
                }
              >
                {/* Populate options for group muscle selection */}
                {/* You can map through your options here */}
                <option value="Option1">Option1</option>
                <option value="Option2">Option2</option>
                {/* Add more options as needed */}
              </select>
            </td>
            <td>
              <select
                value={input.numberOfExercises}
                onChange={(e) =>
                  onGroupMuscleInputChange(
                    index,
                    "numberOfExercises",
                    parseInt(e.target.value)
                  )
                }
              >
                {/* Populate options for number of exercises */}
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={() => onRemoveRow(index)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
