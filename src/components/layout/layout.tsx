import React, { useState,  type ReactNode } from 'react';
import Sidebar from './sidebar';
import { Bars3Icon } from '@heroicons/react/24/solid'

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
    <div className='mx-auto'>
       <button onClick={openSidebar}>
        <Bars3Icon className='h-6 w-6 text-gray-700'/>
       </button>
      <div className="flex-grow">
        {children}
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {/* Add footer or other elements here */}
    </div>
  );
};

export default Layout;
