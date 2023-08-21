import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/namespace
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';
import Sidebar_skeleton from '../Loading_Skeletons/Sidebar.jsx';
import { Sidebar_content } from './Sidebar_content.jsx';

export default function Sidebar() {
  const sidebar_content_container = useRef();
  const user_info = useRef();
  const App_theme = useSelector((state) => state.App_theme.mode);
  const location = useLocation();

  const checkScroll = useCallback(() => {
    setTimeout(() => {
      let hasVerticalScrollbar =
        sidebar_content_container.current.scrollHeight >
        sidebar_content_container.current.clientHeight;
      if (hasVerticalScrollbar) {
        user_info.current.classList.add('scroll_shadow');
      } else {
        user_info.current.classList.remove('scroll_shadow');
      }
    }, 600);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [checkScroll, location]);

  return (
    <motion.div
      className=''
      initial={{ x: -300, opacity: 0.2 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <div
        className='flex flex-col m-4 rounded-3xl  relative bg-body_secondary  whitespace-nowrap'
        id='sidebar'
      >
        <div className='p-6'>
          <div className='items-center hidden gap-2 md:block'>
            <img
              src={`src/assets/${
                App_theme == 'dark' ? 'logo_white.png' : 'logo.png'
              }`}
              width={130}
              alt=''
            />
          </div>

          <div
            className='md:mt-4 overflow-auto'
            id='sidebar_content_container'
            ref={sidebar_content_container}
          >
            <ErrorBoundary FallbackComponent={Sidebar_skeleton}>
              <Sidebar_content checkScroll={checkScroll} />
            </ErrorBoundary>
          </div>

          <div
            className='absolute bottom-0 w-full start-0 px-3'
            id='user_info'
            ref={user_info}
          >
            <hr className='w-[90%] dark:border-[#2a2a2c] mx-auto' />
            <div className='flex gap-1 items-center my-6'>
              <img src='src/assets/dp.jpg' className='avatar' alt='' />
              <div>
                <h6 className='font-bold text-text_primary text-sm'>
                  Anirudh Sahu
                </h6>
                <p className='mb-0 text-text_secondary text-sm'>
                  {localStorage.getItem('Email') || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
