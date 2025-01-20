import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading (e.g., fetching data or waiting for resources)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds (or once content is ready)
    }, 2000);

    // Clear timeout if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary z-50">
          <motion.div
            className="relative flex items-center justify-center border-8 border-transparent rounded-full w-24 h-24"
            animate={{
              borderColor: ['#F66B04', '#451805', '#FCEDD4', '#F66B04'], // Cycle through colors
            }}
            transition={{
              duration: 3, // Duration of one full cycle
              repeat: Infinity, // Infinite loop
              ease: 'easeInOut',
            }}
          >
            <motion.img
              src="/image/favicon.png"
              alt="Logo"
              className="w-10 h-10"
              animate={{
                scale: [1, 1.2, 1], // Pulsing animation for the logo
              }}
              transition={{
                duration: 1.5, // Pulsing duration
                repeat: Infinity, // Infinite loop
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      {!loading }
    </>
  );
}
