import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 400); // Wait a bit before unmounting
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-white font-poppins"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      onAnimationComplete={() => {
        if (progress === 100) {
          // This is a backup if the timeout above doesn't trigger
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary">Do Thanh Thuy</h1>
        <p className="text-slate-400 mb-6 font-inter text-sm tracking-widest uppercase">Loading...</p>
        
        {/* Progress Bar Container */}
        <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/10">
          {/* Progress Fill */}
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        <div className="mt-4 text-xs font-inter text-slate-500">{Math.round(progress)}%</div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
