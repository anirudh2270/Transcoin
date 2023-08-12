import { motion } from 'framer-motion';
import React from 'react';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

export default function DarkModeSwitch({ App_theme, handle_theme }) {
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      onClick={() => handle_theme()}
      className={`flex-start flex h-[30px] w-[60px] rounded-[50px] bg-[#f0f0f0] p-[3px] shadow-inner hover:cursor-pointer dark:bg-[#2f2f2f] ${
        App_theme == 'dark' && 'place-content-end'
      }`}
    >
      <motion.div
        className='flex h-[23px] w-[23px] drop-shadow-md items-center justify-center rounded-full bg-white dark:bg-black/90'
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          {App_theme == 'light' ? (
            <RiSunFill className='w-4 h-4 text-yellow-500' />
          ) : (
            <RiMoonClearFill className='w-4 h-4 text-yellow-300' />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
