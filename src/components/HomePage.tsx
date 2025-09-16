import React, { useRef, useEffect, useState } from 'react';
import { ClickableButton } from './ClickableButton';
import { RotationMessage } from './RotationMessage';
import { clickableComponents } from '../data/clickableComponents';
import type { ClickableComponent } from '../data/clickableComponents';

export const HomePage: React.FC = () => {
  const riverRef = useRef<HTMLDivElement>(null);
  const [showRotationMessage, setShowRotationMessage] = useState(false);
  
  // Responsive configuratie wordt nu direct toegepast in de component data

  useEffect(() => {
    // Apply background permanently with fixed attachment
    document.body.style.backgroundImage = "url('/assets/backgrounds/background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
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
    // Hier kun je later games starten of andere acties uitvoeren
    if (component.gameId) {
      console.log('Starting game:', component.gameId);
    }
  };

  // Responsive configuratie wordt nu direct toegepast in de component data

  return (
    <div className="relative w-full min-h-screen" style={{ 
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      overflowY: 'auto',
      minHeight: '100vh'
    }}>
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
          <h1 className="font-bold drop-shadow-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ 
            fontFamily: 'Comfortaa, sans-serif', 
            textAlign: 'center',
            width: '100%',
            margin: '0 auto',
            display: 'block',
            lineHeight: '1.2'
          }}>
            WETLANDS EDU AND CS TOPICS IN R4L TOOLBOX
          </h1>
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