import React from 'react';
import { motion } from 'framer-motion';
import { useOrientation } from '../hooks/useOrientation';
import { OrientationWarning } from './OrientationWarning';

interface GameContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GameContainer: React.FC<GameContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  const { isMobile, isPortrait } = useOrientation();
  const showOrientationWarning = isMobile && isPortrait;

  return (
    <div className={`game-container w-full h-screen min-h-screen ${className}`}>
      <OrientationWarning isVisible={showOrientationWarning} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`landscape-only w-full h-full ${showOrientationWarning ? 'hidden' : 'block'}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
