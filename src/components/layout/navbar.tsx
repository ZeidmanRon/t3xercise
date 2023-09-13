import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import {
  MenuIcon,
  HomeIcon,
  ClipboardListIcon,
  BriefcaseIcon,
  LogOutIcon,
  ClipboardCheckIcon,
} from "lucide-react";

const Navbar: React.FC = () => {
  const parent = useRef(null);
  const router = useRouter();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Sheet>
      <div className="absolute right-3 top-3 p-2">
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
      </div>
      <SheetContent className="flex w-3/4 flex-col">
        <SheetHeader>
          <SheetTitle>T3XERCISE</SheetTitle>
        </SheetHeader>
        <Button asChild variant={"default"} className="bg-indigo-400">
          <Link href="/">
            לדף הראשי
            <HomeIcon className="m-1" />
          </Link>
        </Button>
        <Button asChild variant={"default"} className="bg-indigo-400">
          <Link href="/exercises">
            התרגילים שלי
            <ClipboardListIcon className="m-1" />
          </Link>
        </Button>
        <Button asChild variant={"default"} className="bg-indigo-400">
          <Link href="/workouts">
            האימונים שלי
            <ClipboardCheckIcon className="m-1" />
          </Link>
        </Button>
        <Button
          asChild
          variant={"default"}
          className="bg-indigo-400 ring-transparent"
        >
          <Link href="/business">
            לדף העסק
            <BriefcaseIcon className="m-1" />
          </Link>
        </Button>
        <Button variant="link">
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <p className="flex gap-3">
              התנתקות
              <LogOutIcon />
            </p>
          </SignOutButton>
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
