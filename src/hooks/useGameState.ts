import { useState, useCallback } from 'react';

export interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  totalLevels: number;
  score: number;
  isCompleted: boolean;
}

export interface GameState {
  progress: GameProgress;
  isPlaying: boolean;
  isPaused: boolean;
  currentGame: string | null;
}

const initialProgress: GameProgress = {
  currentLevel: 1,
  completedLevels: [],
  totalLevels: 0,
  score: 0,
  isCompleted: false,
};

const initialState: GameState = {
  progress: initialProgress,
  isPlaying: false,
  isPaused: false,
  currentGame: null,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const startGame = useCallback((gameId: string, totalLevels: number) => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      currentGame: gameId,
      progress: {
        ...prev.progress,
        totalLevels,
        currentLevel: 1,
        completedLevels: [],
        score: 0,
        isCompleted: false,
      },
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const completeLevel = useCallback((level: number, score: number) => {
    setGameState(prev => {
      const newCompletedLevels = [...prev.progress.completedLevels];
      if (!newCompletedLevels.includes(level)) {
        newCompletedLevels.push(level);
      }

      const newCurrentLevel = level + 1;
      const isCompleted = newCurrentLevel > prev.progress.totalLevels;

      return {
        ...prev,
        progress: {
          ...prev.progress,
          currentLevel: isCompleted ? prev.progress.currentLevel : newCurrentLevel,
          completedLevels: newCompletedLevels,
          score: prev.progress.score + score,
          isCompleted,
        },
        isPlaying: !isCompleted,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  const nextLevel = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        currentLevel: Math.min(prev.progress.currentLevel + 1, prev.progress.totalLevels),
      },
    }));
  }, []);

  return {
    gameState,
    startGame,
    pauseGame,
    completeLevel,
    resetGame,
    nextLevel,
  };
};
