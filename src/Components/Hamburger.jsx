import React from 'react';
import { motion } from 'framer-motion';

const lineOneVariants = {
  initial: {
    rotate: '0deg',
    transform: 'translate(0, 0)',
    transition: {
      ease: 'easeOut',
    },
  },
  animate: {
    y: '3px',
    rotate: '45deg',
    transform: 'translate(1px, 3px) rotate(45deg)',
    transition: {
      ease: 'easeOut',
    },
  },
};

const lineTwoVariants = {
  initial: { rotate: '0deg', transform: 'translate(0, 0)' },
  animate: {
    y: '-3px',
    rotate: '-45deg',
    transform: 'translate(1px, -3px) rotate(-45deg)',
    transition: {
      ease: 'easeOut',
    },
  },
};

export const Hamburger = ({ is_collapsed, handle_hamburger }) => {
  return (
    <div className='grid w-10 h-10 mr-3 rounded-full drop-shadow place-items-center'>
      <motion.div
        className='flex flex-col justify-between w-5 h-2 cursor-pointer'
        onClick={() => handle_hamburger()}
      >
        <motion.div
          variants={lineOneVariants}
          initial='initial'
          animate={is_collapsed ? 'animate' : 'initial'}
          className='bg-gray-400 w-full h-0.5'
        ></motion.div>

        <motion.div
          variants={lineTwoVariants}
          initial='initial'
          animate={is_collapsed ? 'animate' : 'initial'}
          className='bg-gray-400 w-full h-0.5'
        ></motion.div>
      </motion.div>
    </div>
  );
};
