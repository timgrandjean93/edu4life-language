import React from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '../hooks/useGameState';

interface GameProps {
  gameId: string;
  title: string;
  description: string;
  totalLevels: number;
  onStart: () => void;
  onComplete: () => void;
  children: React.ReactNode;
}

export const Game: React.FC<GameProps> = ({
  gameId,
  title,
  description,
  totalLevels,
  onStart,
  onComplete,
  children,
}) => {
  const { gameState, startGame, completeLevel, resetGame } = useGameState();

  const handleStart = () => {
    startGame(gameId, totalLevels);
    onStart();
  };

  const handleLevelComplete = (level: number, score: number) => {
    completeLevel(level, score);
    if (level === totalLevels) {
      onComplete();
    }
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Game Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-sm border-b border-wetland-200 p-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-wetland-800">{title}</h1>
            <p className="text-wetland-600">{description}</p>
          </div>
          
          {gameState.isPlaying && (
            <div className="text-right">
              <div className="text-sm text-wetland-600">
                Level {gameState.progress.currentLevel} van {totalLevels}
              </div>
              <div className="text-lg font-semibold text-wetland-800">
                Score: {gameState.progress.score}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Game Content */}
      <div className="flex-1 relative overflow-hidden">
        {!gameState.isPlaying ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center h-full p-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🎮
            </motion.div>
            
            <h2 className="text-3xl font-bold text-wetland-800 mb-4">
              Klaar om te beginnen?
            </h2>
            
            <p className="text-lg text-wetland-600 text-center mb-8 max-w-md">
              {description}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="bg-wetland-500 hover:bg-wetland-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors"
            >
              Start Game
            </motion.button>
          </motion.div>
        ) : (
          <div className="h-full">
            {React.isValidElement(children) && 
              React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
                onLevelComplete: handleLevelComplete,
                currentLevel: gameState.progress.currentLevel,
                isPaused: gameState.isPaused,
              })
            }
          </div>
        )}

        {/* Game Complete Overlay */}
        {gameState.progress.isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-wetland-500/95 flex flex-col items-center justify-center text-white p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-4 text-center">
              Gefeliciteerd!
            </h2>
            
            <p className="text-xl text-center mb-6">
              Je hebt alle levels voltooid!
            </p>
            
            <div className="text-2xl font-semibold mb-8">
              Eindscore: {gameState.progress.score}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="bg-white text-wetland-600 font-semibold py-3 px-8 rounded-lg shadow-lg"
            >
              Opnieuw spelen
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
