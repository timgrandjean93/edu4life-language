import React from 'react';
import type { ClickableComponent } from '../data/clickableComponents';

interface ClickableButtonProps {
  component: ClickableComponent;
  onClick?: (component: ClickableComponent) => void;
}

export const ClickableButton: React.FC<ClickableButtonProps> = ({
  component,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(component);
    }
  };

  // Bepaal de positie van de button
  const getPosition = () => {
    if (component.riverPosition) {
      // Positionering op de rivier - relatief ten opzichte van de rivier container
      const x = `${component.riverPosition.x}%`;
      // offsetY is nu een percentage van de rivier hoogte
      const offsetY = (component.riverPosition.offsetY || 0);
      
      return {
        left: x,
        top: `${offsetY}%`,
        transform: 'translateX(-50%)', // Center de button horizontaal
        position: 'absolute' as const
      };
    } else {
      // Normale positionering
      return {
        left: `${component.x}%`,
        top: `${component.y}%`,
        transform: 'translate(-50%, -50%)',
        position: 'absolute' as const
      };
    }
  };

  // Bepaal de anchor point transformatie
  const getAnchorTransform = () => {
    if (component.anchorPoint === 'top') {
      return 'translateX(-50%)'; // Alleen horizontaal centreren
    } else if (component.anchorPoint === 'bottom') {
      return 'translateX(-50%) translateY(-100%)'; // Horizontaal centreren, verticaal van onderkant
    } else {
      return 'translate(-50%, -50%)'; // Volledig centreren
    }
  };

  const position = getPosition();
  const anchorTransform = getAnchorTransform();

  return (
    <button
      onClick={handleClick}
      className="z-20 transition-transform duration-300 hover:scale-105 hover:z-30"
      style={{
        ...position,
        transform: anchorTransform,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        zIndex: 20
      }}
    >
      {component.image ? (
        // Custom image component
        <div className="relative" style={{ background: 'transparent' }}>
          <img
            src={component.image}
            alt={component.title}
            className="max-w-none h-auto"
            style={{
              width: `${component.widthPercentage || 15}vw`, // Viewport width percentage
              height: 'auto', // Automatische hoogte behoud aspect ratio
              maxWidth: 'none', // Geen maxWidth beperking meer
              background: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              filter: 'none'
            }}
          />
          {/* Geen hover effect - alleen scale transformatie */}
        </div>
      ) : (
        // Default icon button
        <div className={`
          ${component.color} 
          ${component.size === 'small' ? 'w-12 h-12' : 
            component.size === 'medium' ? 'w-16 h-16' : 'w-20 h-20'}
          rounded-full shadow-lg hover:shadow-xl
          flex items-center justify-center
          border-2 border-white
          transition-all duration-300
        `}>
          <span className="text-2xl">
            {component.icon}
          </span>
        </div>
      )}
    </button>
  );
};
