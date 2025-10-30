import React, { useRef, useEffect, useState } from 'react';
import { ClickableButton } from './ClickableButton';
import { RotationMessage } from './RotationMessage';
import { clickableComponents } from '../data/clickableComponents';
import type { ClickableComponent } from '../data/clickableComponents';

interface HomePageProps {
  onComponentClick?: (component: ClickableComponent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onComponentClick }) => {
  const riverRef = useRef<HTMLDivElement>(null);
  const [showRotationMessage, setShowRotationMessage] = useState(false);
  
  // Responsive configuratie wordt nu direct toegepast in de component data

  useEffect(() => {
    // Apply background image for homepage
    document.body.style.backgroundImage = "url('/assets/backgrounds/background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundColor = "";
    
    // Cleanup function to remove background when component unmounts
    return () => {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    // Check screen orientation and show rotation message if needed
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth <= 768; // Mobile breakpoint
      
      if (isMobile && isPortrait) {
        setShowRotationMessage(true);
      } else {
        setShowRotationMessage(false);
      }
    };

    // Check on mount
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleComponentClick = (component: ClickableComponent) => {
    console.log('Clicked component:', component.title);
    
    // Use the passed callback if available, otherwise use default behavior
    if (onComponentClick) {
      onComponentClick(component);
    } else {
      // Default behavior for backwards compatibility
      if (component.gameId) {
        console.log('Starting game:', component.gameId);
      }
    }
  };

  // Responsive configuratie wordt nu direct toegepast in de component data

  return (
    <div className="relative w-full min-h-screen homepage-container" style={{ 
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      overflowY: 'auto',
      minHeight: '100vh'
    }}>
      {/* Test header bar (full width) */}
      <div
        style={{
          width: '100%',
          height: '94px',
          backgroundColor: '#51727C',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      />
      {/* Rotation Message Overlay */}
      {showRotationMessage && <RotationMessage />}
      
      {/* Content goes here - background is handled by HTML */}
      <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <div className="text-white transition-colors duration-300" style={{ 
          textAlign: 'center',
          width: '100%',
          maxWidth: '1400px',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        </div>
      </div>

      {/* River - Below the title, full width with aspect ratio */}
      <div ref={riverRef} className="w-full z-10" style={{ 
        width: '100%', 
        position: 'relative',
        maxWidth: '100vw'
      }}>
        <img 
          src="/assets/backgrounds/river.png" 
          alt="River path" 
          style={{ 
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block'
          }}
        />
        
        {/* Clickable Components - River Cards - Binnen de rivier container */}
        {clickableComponents.map((component) => (
          <ClickableButton
            key={component.id}
            component={component}
            onClick={handleComponentClick}
          />
        ))}
        
        {/* Click instruction images - positioned relative to river image with proper scaling */}
        <div 
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '3%',
            zIndex: 20,
            pointerEvents: 'none',
            display: 'flex',
            gap: 'clamp(0.5vw, 8px, 2vw)',
            alignItems: 'flex-end',
            width: 'auto'
          }}
        >
          <img 
            src="/assets/components/Click.png" 
            alt="Click instruction" 
            style={{ 
              width: 'clamp(80px, 8vw, 200px)',
              height: 'auto',
              opacity: 0.9,
              maxWidth: 'none'
            }}
          />
          <img 
            src="/assets/components/Lau.png" 
            alt="Lau instruction" 
            style={{ 
              width: 'clamp(80px, 8vw, 200px)',
              height: 'auto',
              opacity: 0.9,
              maxWidth: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};