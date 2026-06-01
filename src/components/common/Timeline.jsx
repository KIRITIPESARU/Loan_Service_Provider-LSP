// src\components\common\Timeline.jsx
import React from 'react';

const Timeline = ({ items }) => {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <div key={index} className="mb-8 flex">
          <div className="flex flex-col items-center mr-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              item.completed 
                ? 'bg-green-500 text-white' 
                : item.current 
                ? 'bg-blue-500 text-white ring-4 ring-blue-200'
                : 'bg-gray-300 text-gray-500'
            }`}>
              {item.completed ? '✓' : index + 1}
            </div>
            {index < items.length - 1 && (
              <div className={`w-0.5 h-full mt-2 ${
                item.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
          <div className="flex-1 pb-8">
            <div className={`mb-1 ${
              item.current ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }`}>
              {item.title}
            </div>
            <div className="text-sm text-gray-500">{item.description}</div>
            {item.date && (
              <div className="text-xs text-gray-400 mt-1">{item.date}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;