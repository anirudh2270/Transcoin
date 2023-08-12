import React from 'react';

export default function Sidebar_skeleton() {
  const rendered_skeleton = [];

  for (let i = 0; i < 7; i++) {
    if (i == 0) {
      rendered_skeleton.push(
        <div key={i} className='flex items-center justify-between'>
          <div>
            <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
            <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
          </div>
          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
        </div>
      );
    } else {
      rendered_skeleton.push(
        <div key={i} className='flex items-center justify-between pt-4'>
          <div>
            <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
            <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
          </div>
          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
        </div>
      );
    }
  }
  return (
    <div
      role='status'
      className='max-w-md space-y-6 rounded animate-pulse md:p-6 md:ps-0'
    >
      {rendered_skeleton}
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
