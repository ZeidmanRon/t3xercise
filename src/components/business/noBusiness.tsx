import Link from "next/link";
import { Label } from "../ui/label";

export default function NoBusiness() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-7 py-4 text-center">
      <div className="flex flex-col p-3 text-center">
        <Label className="text-xl">ברוכים הבאים!</Label>
        <Label className="text-sm">
          נכון לרגע זה אינך מעורב/ת בפעילות עסקית
        </Label>
      </div>
      <div className="flex flex-col p-3 text-center">
        <Label className="text-sm">
          <Link className="px-2 text-lg text-sky-500 underline" href="">
            שלח/י בקשה
          </Link>
        </Label>
        <Label className="text-sm">והפכו לחלק מהארגון או העסק שלכם</Label>
      </div>
      <div className="flex flex-col p-3 text-center">
        <Label className="text-sm">
          <Link className="px-2 text-sky-500 underline" href="">
            ליצירת עסק חדש
          </Link>
        </Label>
      </div>
    </div>
  );
}
