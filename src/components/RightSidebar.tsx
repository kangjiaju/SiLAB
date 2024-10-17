import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      <div className={`fixed right-0 top-4 bottom-4 w-64 bg-gray-800 bg-opacity-80 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} rounded-l-lg overflow-hidden`}>
        <div className="flex items-center p-4">
          <h2 className="text-xl font-bold">工具面板</h2>
        </div>
        <div className="p-4">
          {/* Add your tool components here */}
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`fixed top-1/2 ${isOpen ? 'right-64' : 'right-0'} transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l-md hover:bg-gray-700 transition-all duration-300 z-20`}
      >
        {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
    </>
  );
};

export default RightSidebar;