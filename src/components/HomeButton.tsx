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
      style={{ 
        backgroundColor: 'transparent',
        width: '54px',
        height: '54px',
        border: 'none',
        cursor: 'pointer'
      }}
        className={`
          home-button
          relative
          flex items-center justify-center
          z-50
          opacity-100
          ${className}
        `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Button content */}
      <div className="relative flex items-center justify-center">
        <img 
          src="/assets/icons/Home.png" 
          alt="Home" 
          style={{ 
            width: '54px',
            height: '54px',
            opacity: 1
          }}
        />
      </div>
    </motion.button>
  );
};
