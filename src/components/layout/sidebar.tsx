import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { T3href } from "./t3href";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  return (
    <div
      className={`fixed inset-0 z-40 bg-slate-50 transition-opacity ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`right-0 top-0 h-screen w-3/5 transform overflow-y-auto bg-white transition-transform ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="test-border flex h-screen w-full flex-col justify-normal pt-3">
          <div className="pr-2">
            <button className="p-0.5" onClick={onClose}>
              <XMarkIcon className="h-7 w-7 text-gray-700" />
            </button>
          </div>
          <div className="mt-3 flex flex-col justify-center">
            <T3href text="דף הבית" href="/home" />
            <T3href text="התרגילים שלי" href="/exercises" />
            <T3href text="דף העסק" href="/home" />
          </div>
          <div className="test-border flex justify-center">
            <SignOutButton signOutCallback={() => router.push("/")}>
              <button className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* Add your sidebar content here */}
      </div>
    </div>
  );
};

export default Sidebar;
