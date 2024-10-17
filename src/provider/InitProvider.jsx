import React, { createContext, useContext, useEffect } from 'react';
import { useDirectionContext } from './DirectionProvider';

let context = {};
export const InitContext = createContext();

export function InitProvider({ children }) {
  const { gamepadEmulator1, gamepadEmulator2 } = useDirectionContext();

  const update = () => {
    gamepadEmulator1.update();
    gamepadEmulator2.update();
    requestAnimationFrame(update);
  };

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gamepadEmulator1, gamepadEmulator2]);

  context = {};

  return <InitContext.Provider value={context}>{children}</InitContext.Provider>;
}

export function useInitContext() {
  const context = useContext(InitContext);
  if (!context) throw Error('useInitContext must be used inside a `InitProvider`');
  return context;
}
