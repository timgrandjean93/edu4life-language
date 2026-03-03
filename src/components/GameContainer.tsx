import React from 'react';
import { motion } from 'framer-motion';
import { useOrientation } from '../hooks/useOrientation';
import { OrientationWarning } from './OrientationWarning';

interface GameContainerProps {
  children: React.ReactNode;
  className?: string;
  currentPage?: string;
}

export const GameContainer: React.FC<GameContainerProps> = ({ 
  children, 
  className = '',
  currentPage: _currentPage
}) => {
  const { isMobile, isLandscape } = useOrientation();
  // Op mobiel horizontaal (landscape): altijd melding tonen om verticaal (portrait) te zetten
  const showOrientationWarning = isMobile && isLandscape;
  // Op mobiel in portrait tonen we content; landscape-only niet nodig want warning doet het werk
  const isExcludedPage = true; // Content altijd zichtbaar wanneer geen warning (portrait of desktop)

  return (
    <div className={`game-container w-full h-screen min-h-screen ${className}`}>
      <OrientationWarning isVisible={showOrientationWarning} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${isExcludedPage ? '' : 'landscape-only'} w-full h-full ${showOrientationWarning ? 'hidden' : 'block'}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
