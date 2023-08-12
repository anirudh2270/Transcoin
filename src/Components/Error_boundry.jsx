import React from 'react';
// eslint-disable-next-line import/namespace
import { useErrorBoundary } from 'react-error-boundary';

export default function Error_boundry({ error }) {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className='flex justify-center mt-36'>
      <div className=''>
        <h1 className='font-bold text-3xl text-center text-gray-700'>
          Something went wrong! Please try again later...{' '}
        </h1>

        <h4 className='font-semibold text-center mt-3 text-red-500'>
          Error : {error.message}
        </h4>

        <div className='text-center mt-10'>
          <button
            onClick={resetBoundary}
            className='bg-gray-700 text-white font-semibold p-3 rounded-lg'
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
