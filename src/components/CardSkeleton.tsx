import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#333333] border-gray-700 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-60 bg-[#555555]"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-6 w-3/4 bg-[#555555] rounded mb-3"></div>
        <div className="h-4 w-1/4 bg-[#555555] rounded mb-4"></div>
        <div className="h-4 w-full bg-[#555555] rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-[#555555] rounded"></div>
        <div className="mt-auto pt-4">
          <div className="h-6 w-24 bg-[#555555] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;