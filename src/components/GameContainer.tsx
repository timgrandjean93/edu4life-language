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
  currentPage
}) => {
  const { isMobile, isPortrait } = useOrientation();
  // Exclude wetlandfresk, wetland4life, privacy, cookies, and termsofuse pages from orientation warning
  const excludedPages = ['wetlandfresk', 'wetland4life', 'privacy', 'cookies', 'termsofuse'];
  const shouldShowWarning = isMobile && isPortrait && (!currentPage || !excludedPages.includes(currentPage));
  const showOrientationWarning = shouldShowWarning;
  // For excluded pages, don't use landscape-only class to avoid CSS hiding content on mobile
  const isExcludedPage = currentPage && excludedPages.includes(currentPage);

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
