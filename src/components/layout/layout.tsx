import React, { type ReactNode } from "react";
import Navbar from "./navbar";
import { Button } from "~/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useUser();
  return (
    <div className="flex-1">
      <div className="flex w-full justify-center border-b border-slate-300 p-2 text-xl shadow-md">
        <Navbar />
        <Button
          asChild
          className="p-1 text-2xl font-light"
          size={"lg"}
          variant={"ghost"}
        >
          <Link href="/home">T3XERCISE</Link>
        </Button>
        <div className="absolute left-3 top-3 flex items-center justify-end">
          <Label className="ml-3 hidden md:block" htmlFor="username">
            {user?.fullName}
          </Label>
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.fullName?.at(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="h-full w-full">{children}</div>
      {/* Add footer or other elements here */}
    </div>
  );
}
