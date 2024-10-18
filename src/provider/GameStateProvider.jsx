import React, { useEffect, useRef, useState } from 'react';
import { GAME_PHASES } from '../utils/constants';

let context = {};
const GameStateContext = React.createContext();

export function GameStateProvider({ children }) {
  const [currentPhase, setCurrentPhase] = useState(GAME_PHASES.START);
  const [missyScore, setMissyScore] = useState(0);
  const [chrisScore, setChrisScore] = useState(0);
  const [progressScore, setProgressScore] = useState(0);
  const [chrisProgressScore, setChrisProgressScore] = useState(0);

  const maxPossibleScore = 10;

  context = {
    currentPhase,
    setCurrentPhase,
    missyScore,
    setMissyScore,
    chrisScore,
    setChrisScore,
    maxPossibleScore,
    progressScore,
    setProgressScore,
    chrisProgressScore,
    setChrisProgressScore,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
}

export function useGameStateContext() {
  const context = React.useContext(GameStateContext);
  if (!context) throw new Error('useGameStateContext must be used within a GameStateProvider');
  return context;
}
