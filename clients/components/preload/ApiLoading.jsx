
import React from "react";
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 w-full max-h-full flex justify-center items-center bg-opacity-50 bg-primary-600/20 z-50">
      <motion.div
            className="relative flex items-center justify-center border-4 border-transparent rounded-full p-3"
            animate={{
              rotate:[0, 360],
              borderColor: ['#F66B04', '#451805', '#FCEDD4', '#F66B04'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity, 
              ease: 'easeInOut',
            }}
          >
            <motion.img
              src="/image/favicon.png"
              alt="Logo"
              className="w-7 h-7"
              animate={{
                rotate:[0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'easeInOut',
              }}
            />
          </motion.div>
    </div>
  );
};

export default LoadingSpinner;
