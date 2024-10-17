import React from 'react';

interface TimelineEventProps {
  title: string;
  description: string;
  timestamp: string;
  children?: React.ReactNode;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({ title, description, timestamp, children }) => {
  return (
    <div className="mb-8 flex justify-between items-center w-full">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white"></h1>
      </div>
      <div className="order-1 bg-gray-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="font-bold text-gray-800 text-xl">{title}</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-100">{description}</p>
        <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
        {children}
      </div>
    </div>
  );
};

export const Timeline: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto w-full h-full">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
        {children}
      </div>
    </div>
  );
};