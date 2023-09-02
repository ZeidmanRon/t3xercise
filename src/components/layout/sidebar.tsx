import React, { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-blue-800 z-40 transition-opacity ${
        isOpen ? 'opacity-90' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`transform h-full w-3/4 bg-white fixed top-0 right-0 overflow-y-auto ease-in-out transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>Close</button>
        {/* Add your sidebar content here */}
      </div>
    </div>
  );
};

export default Sidebar;
