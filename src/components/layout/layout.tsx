import React, { useState, type ReactNode } from "react";
import Sidebar from "./sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="mx-auto">
      <div className="flex w-full items-center justify-between p-2">
        <button className="p-0.5" onClick={openSidebar}>
          <Bars3Icon className="h-8 w-8 text-gray-700" />
        </button>
        <h1 className="handwrite text-[2rem] tracking-tight">T3XERCISE</h1>
      </div>
      <div className="flex-grow">{children}</div>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {/* Add footer or other elements here */}
    </div>
  );
};

export default Layout;