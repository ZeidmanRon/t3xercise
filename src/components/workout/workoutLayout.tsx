import * as React from "react";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const muscleGroups = [
  { label: "ישבן", value: 0 },
  { label: "רגליים", value: 0 },
  { label: "גב", value: 0 },
  { label: "בטן", value: 0 },
  { label: "חזה", value: 0 },
  { label: "כתפיים", value: 0 },
  { label: "ידיים", value: 0 },
  { label: "אירובי", value: 0 },
];

export default function WorkoutLayout() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border">
      <div className="flex h-auto w-full px-2 pt-2 text-right underline">
        <Label className="text-sm">מבנה האימון:</Label>
      </div>

      <div className="flex h-full w-full justify-center p-4">
        <ScrollArea dir="rtl" className=" h-auto max-h-[15rem] w-full px-4">
          {muscleGroups.map((muscleGroup) => (
            <div className="flex flex-col" key={muscleGroup.label}>
              <div className="flex h-12 w-full items-center justify-between px-2 text-sm">
                תרגילי {muscleGroup.label}
                <Select dir="rtl">
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
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
