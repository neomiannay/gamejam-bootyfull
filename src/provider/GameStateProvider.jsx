import React, { useEffect, useRef } from 'react';

let context = {};
const GameStateContext = React.createContext();

export function GameStateProvider({ children }) {
  context = {};

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
}

export function useGameStateContext() {
  const context = React.useContext(GameStateContext);
  if (!context) throw new Error('useGameStateContext must be used within a GameStateProvider');
  return context;
}
