import React from 'react';
import { motion } from 'framer-motion';

interface HomeButtonProps {
  onClick: () => void;
  className?: string;
}

export const HomeButton: React.FC<HomeButtonProps> = ({ onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      style={{ backgroundColor: 'white' }}
        className={`
          relative overflow-hidden
          bg-white hover:bg-white
          text-gray-800 font-bold w-20 h-20 rounded-full
          shadow-xl hover:shadow-2xl
          transition-all duration-300
          border-4 border-white hover:border-white
          flex items-center justify-center
          z-50
          opacity-100
          ${className}
        `}
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ 
        scale: 0.95,
        y: 0
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Button content */}
      <div className="relative flex items-center justify-center">
        <img 
          src="/assets/icons/Home.png" 
          alt="Home" 
          className="w-10 h-10"
          style={{ 
            backgroundColor: 'white',
            opacity: 1
          }}
        />
      </div>
    </motion.button>
  );
};
