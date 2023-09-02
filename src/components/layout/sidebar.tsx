import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { T3href } from "./t3href";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-40 bg-slate-50 transition-opacity ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`right-0 top-0 h-full w-3/5 transform overflow-y-auto bg-white transition-transform ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col justify-end pt-3">
          <div className="pr-2">
            <button className="p-0.5" onClick={onClose}>
              <XMarkIcon className="h-7 w-7 text-gray-700" />
            </button>
          </div>
          <div className="mt-3 flex h-full flex-col justify-center">
            <T3href text="דף הבית" href="/home" />
            <T3href text="התרגילים שלי" href="/exercises" />
            <T3href text="דף העסק" href="/home" />
          </div>
        </div>

        {/* Add your sidebar content here */}
      </div>
    </div>
  );
};

export default Sidebar;
