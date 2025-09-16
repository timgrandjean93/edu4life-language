import { useState, useEffect } from 'react';

interface OrientationState {
  isLandscape: boolean;
  isPortrait: boolean;
  angle: number;
  isMobile: boolean;
}

export const useOrientation = (): OrientationState => {
  const [orientation, setOrientation] = useState<OrientationState>({
    isLandscape: true,
    isPortrait: false,
    angle: 0,
    isMobile: false,
  });

  useEffect(() => {
    const updateOrientation = () => {
      const isMobile = window.innerWidth <= 768;
      const isLandscape = window.innerWidth > window.innerHeight;
      const isPortrait = !isLandscape;
      const angle = window.screen?.orientation?.angle || 0;

      setOrientation({
        isLandscape,
        isPortrait,
        angle,
        isMobile,
      });
    };

    // Initial check
    updateOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    // Listen for screen orientation changes (more reliable on mobile)
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', updateOrientation);
    }

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', updateOrientation);
      }
    };
  }, []);

  return orientation;
};
