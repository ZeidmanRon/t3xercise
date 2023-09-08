import React, { type ReactNode } from "react";
import Navbar from "./navbar";
import { Button } from "~/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
  userFullName: string;
  userImageUrl: string;
}

export default function Layout({
  children,
  userFullName,
  userImageUrl,
}: LayoutProps) {
  return (
    <div>
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
            {userFullName}
          </Label>
          <Avatar>
            <AvatarImage src={userImageUrl} />
            <AvatarFallback>{userFullName?.at(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex-grow">{children}</div>
      {/* Add footer or other elements here */}
    </div>
  );
}
