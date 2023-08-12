import { motion } from 'framer-motion';
import React from 'react';
const animationConfiguration = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0 },
};
const Transitions = ({ children }) => {
  return (
    <motion.div
      className='animate__animated animate__fadeInUp'
      variants={animationConfiguration}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
export default Transitions;
