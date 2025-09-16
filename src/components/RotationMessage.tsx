import React from 'react';

export const RotationMessage: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="text-center text-white p-8 max-w-md mx-4">
        {/* Rotation Arrow Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Phone outline */}
            <div className="w-16 h-24 border-4 border-white rounded-lg relative">
              {/* Screen content */}
              <div className="absolute inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-sm"></div>
                </div>
              </div>
            </div>
            
            {/* Rotation arrow */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-white animate-spin"
                style={{ animationDuration: '2s' }}
              >
                <path 
                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                  fill="currentColor"
                />
                <path 
                  d="M12 6L13.5 10.5L18 12L13.5 13.5L12 18L10.5 13.5L6 12L10.5 10.5L12 6Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Rotate Your Screen
        </h2>
        <p className="text-lg leading-relaxed opacity-90">
          For the best experience with the wetlands game, please rotate your phone to landscape mode.
        </p>
        
        {/* Decorative elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};
