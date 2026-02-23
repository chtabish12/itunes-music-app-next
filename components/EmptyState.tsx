'use client';

import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.163 7.519c.474.609 1.128 1.085 1.837 1.085.709 0 1.363-.476 1.837-1.085M15 12a3 3 0 11-6 0 3 3 0 016 0m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Results Yet</h2>
      <p className="text-gray-600 mb-4">
        Start searching for your favorite music, artists, or albums
      </p>
      <p className="text-gray-500 text-sm">Use the search bar above to get started</p>
    </div>
  );
};

export default EmptyState;
