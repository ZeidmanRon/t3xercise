import React, { useState, type ReactNode } from "react";
import Navbar from "./navbar";

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
      <Navbar />
      <div className="flex-grow">{children}</div>
      {/* Add footer or other elements here */}
    </div>
  );
};

export default Layout;
