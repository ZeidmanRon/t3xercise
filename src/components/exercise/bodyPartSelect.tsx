import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type BodyParts } from "./createExerciseModal";

// todo: think about creating bodyParts table in DB with CRUD functions
//  and fetch bodyParts to the selected options.
type BodyPartSelectProps = {
  selectOptions: BodyParts[];
};

export function BodyPartSelect({ selectOptions }: BodyPartSelectProps) {
  return (
    <Select dir="rtl">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="בחר" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="max-h-36 scroll-auto">
          {selectOptions.map((option) => {
            return (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
