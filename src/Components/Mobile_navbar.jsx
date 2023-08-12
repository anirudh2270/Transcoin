import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Sidebar_skeleton from '../Loading_Skeletons/Sidebar.jsx';
import { Sidebar_content } from './Sidebar_content.jsx';

export default function Mobile_navbar({ state, handle_hamburger }) {
  return (
    <>
      <Transition className='md:hidden' appear show={state} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => handle_hamburger()}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0'>
            <div className='flex items-start justify-center min-h-full p-5 mt-28 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md px-7 pb-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:bg-dropdown rounded-2xl'>
                  <div className=''>
                    <ErrorBoundary FallbackComponent={Sidebar_skeleton}>
                      <Sidebar_content />
                    </ErrorBoundary>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
