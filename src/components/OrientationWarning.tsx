import React from 'react';
import { motion } from 'framer-motion';

interface OrientationWarningProps {
  isVisible: boolean;
}

export const OrientationWarning: React.FC<OrientationWarningProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="portrait-warning fixed inset-0 z-50 flex flex-col items-center justify-center bg-wetland-600 text-white p-8"
      style={{ minHeight: '100vh' }}
    >
      {/* Rotation arrow - Perfectly centered and responsive */}
      <div className="mb-8 flex justify-center items-center px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="font-bold"
          style={{ 
            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.7))',
            textShadow: '0 0 30px rgba(255,255,255,1)',
            fontSize: 'clamp(4rem, 15vw, 8rem)'
          }}
        >
          ↻
        </motion.div>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 w-full text-center px-4" style={{ 
        fontFamily: 'Comfortaa, sans-serif', 
        textAlign: 'center',
        maxWidth: '90vw',
        minWidth: '320px'
      }}>
        Rotate Your Screen
      </h2>
      
      <p className="text-xl mb-8 leading-relaxed mx-auto text-center px-4" style={{ 
        maxWidth: '90vw',
        minWidth: '320px',
        width: '100%'
      }}>
        For the best experience, please rotate your phone to landscape mode.
      </p>
      
      {/* Decorative elements */}
      <div className="flex justify-center items-center space-x-3 mt-4">
        <motion.div 
          className="w-3 h-3 bg-white rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div 
          className="w-3 h-3 bg-white rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="w-3 h-3 bg-white rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
};
