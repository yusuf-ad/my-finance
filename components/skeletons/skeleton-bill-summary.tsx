import React from "react";

function SkeletonBillSummary() {
  return (
    <div className="space-y-6 lg:max-w-80 w-full">
      <div className="bg-dark text-white py-8 px-6 rounded-lg w-full">
        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
        <div className="mt-8">
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>

      <div className="bg-white py-6 px-6 rounded-lg">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <ul>
          <li className="flex justify-between py-4 border-b">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </li>
          <li className="flex justify-between py-4 border-b">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </li>
          <li className="flex justify-between py-4 border-b last:border-b-0 last:pb-0">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SkeletonBillSummary;
