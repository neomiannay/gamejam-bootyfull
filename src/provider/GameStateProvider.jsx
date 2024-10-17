import React, { useEffect, useRef, useState } from 'react';
import { GAME_PHASES } from '../utils/constants';

let context = {};
const GameStateContext = React.createContext();

export function GameStateProvider({ children }) {
  const [currentPhase, setCurrentPhase] = useState(GAME_PHASES.MENU);
  const [missyScore, setMissyScore] = useState(0);
  const [chrisScore, setChrisScore] = useState(0);

  context = {
    currentPhase,
    setCurrentPhase,
    missyScore,
    setMissyScore,
    chrisScore,
    setChrisScore,
  };

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
}

export function useGameStateContext() {
  const context = React.useContext(GameStateContext);
  if (!context) throw new Error('useGameStateContext must be used within a GameStateProvider');
  return context;
}
