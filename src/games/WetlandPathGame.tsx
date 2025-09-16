import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WetlandPathGameProps {
  onLevelComplete: (level: number, score: number) => void;
  currentLevel: number;
  isPaused: boolean;
}

interface PathStep {
  id: number;
  x: number;
  y: number;
  isCompleted: boolean;
  isCorrect: boolean;
  description: string;
  wetlandType: string;
}

const wetlandTypes = [
  { name: 'Moeras', color: 'bg-green-500', description: 'Een nat gebied met veel planten' },
  { name: 'Vijver', color: 'bg-blue-500', description: 'Een klein waterlichaam' },
  { name: 'Rietland', color: 'bg-yellow-500', description: 'Gebied met riet en water' },
  { name: 'Bos', color: 'bg-green-700', description: 'Een dicht bebost gebied' },
];

export const WetlandPathGame: React.FC<WetlandPathGameProps> = ({
  onLevelComplete,
  currentLevel,
  isPaused,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [path, setPath] = useState<PathStep[]>([]);

  // Generate path based on current level
  useEffect(() => {
    const steps = Array.from({ length: 5 + currentLevel }, (_, i) => ({
      id: i,
      x: (i * 150) % 600 + 50,
      y: Math.floor(i / 3) * 150 + 100,
      isCompleted: false,
      isCorrect: Math.random() > 0.3, // 70% chance to be correct
      description: `Stap ${i + 1}: ${wetlandTypes[i % wetlandTypes.length].description}`,
      wetlandType: wetlandTypes[i % wetlandTypes.length].name,
    }));
    setPath(steps);
    setCurrentStep(0);
    setScore(0);
  }, [currentLevel]);

  const handleStepClick = (stepId: number) => {
    if (stepId !== currentStep) return;

    const step = path[stepId];
    const newPath = [...path];
    newPath[stepId].isCompleted = true;
    setPath(newPath);

    if (step.isCorrect) {
      setScore(prev => prev + 10);
      setCurrentStep(prev => prev + 1);
      
      if (stepId === path.length - 1) {
        // Level completed
        setTimeout(() => {
          onLevelComplete(currentLevel, score + 10);
        }, 1000);
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  const getStepColor = (step: PathStep) => {
    if (step.isCompleted) {
      return step.isCorrect ? 'bg-green-500' : 'bg-red-500';
    }
    if (step.id === currentStep) {
      return 'bg-wetland-500';
    }
    return 'bg-gray-300';
  };

  if (isPaused) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">⏸️</div>
          <h3 className="text-2xl font-bold text-wetland-800">Game gepauzeerd</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Instructions */}
      <div className="bg-white/90 backdrop-blur-sm p-4 border-b border-wetland-200">
        <h3 className="text-lg font-semibold text-wetland-800 mb-2">
          Volg het juiste pad door de wetlands
        </h3>
        <p className="text-wetland-600 text-sm">
          Klik op de juiste stappen om door de wetlands te navigeren. 
          Elke juiste stap geeft 10 punten, een foute stap kost 5 punten.
        </p>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="relative w-full h-full">
          {/* Path Steps */}
          {path.map((step) => (
            <motion.div
              key={step.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: step.id <= currentStep ? 1 : 0.7, 
                opacity: step.id <= currentStep ? 1 : 0.5 
              }}
              whileHover={{ scale: step.id === currentStep ? 1.1 : 1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute w-12 h-12 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all ${
                getStepColor(step)
              } ${step.id === currentStep ? 'ring-4 ring-wetland-300' : ''}`}
              style={{
                left: `${step.x}px`,
                top: `${step.y}px`,
              }}
              onClick={() => handleStepClick(step.id)}
            >
              {step.isCompleted ? (step.isCorrect ? '✓' : '✗') : step.id + 1}
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {path.slice(0, -1).map((step, index) => {
              const nextStep = path[index + 1];
              return (
                <motion.line
                  key={`line-${index}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: step.isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  x1={step.x + 24}
                  y1={step.y + 24}
                  x2={nextStep.x + 24}
                  y2={nextStep.y + 24}
                  stroke={step.isCompleted ? '#10b981' : '#d1d5db'}
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
              );
            })}
          </svg>
        </div>

        {/* Score Display */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-sm text-wetland-600">Score</div>
          <div className="text-2xl font-bold text-wetland-800">{score}</div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
            <motion.div
              className="bg-wetland-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / path.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-center text-sm text-wetland-600 mt-1">
            {currentStep} / {path.length} stappen
          </div>
        </div>
      </div>
    </div>
  );
};
