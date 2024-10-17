import React, { createContext, useContext, useState, useEffect } from 'react';
import Axis from 'axis-api';

let context = {};
const DirectionContext = createContext();

export function DirectionProvider({ children }) {
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const gamepadEmulator1 = Axis.createGamepadEmulator(0);
  const gamepadEmulator2 = Axis.createGamepadEmulator(1);

  Axis.registerKeys('o', 'a', 2);
  Axis.registerKeys('p', 'x', 2);

  Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator1, 0);
  Axis.joystick2.setGamepadEmulatorJoystick(gamepadEmulator2, 0);

  const player1 = Axis.createPlayer({
    id: 1,
    joysticks: Axis.joystick1,
  });

  const player2 = Axis.createPlayer({
    id: 2,
    joysticks: Axis.joystick2,
    buttons: Axis.buttonManager.getButtonsById(2),
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'z': // Up
          setDirection((prev) => ({ ...prev, y: 1 }));
          break;
        case 's': // Down
          setDirection((prev) => ({ ...prev, y: -1 }));
          break;
        case 'q': // Left
          setDirection((prev) => ({ ...prev, x: -1 }));
          break;
        case 'd': // Right
          setDirection((prev) => ({ ...prev, x: 1 }));
          break;
        case 'ArrowLeft': // Rotate Left
          setRotation((prev) => (prev - 10 + 360) % 360); // Decrease rotation by 10 degrees
          break;
        case 'ArrowRight': // Rotate Right
          setRotation((prev) => (prev + 10) % 360); // Increase rotation by 10 degrees
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'z': // Stop Up
        case 's': // Stop Down
          setDirection((prev) => ({ ...prev, y: 0 }));
          break;
        case 'q': // Stop Left
        case 'd': // Stop Right
          setDirection((prev) => ({ ...prev, x: 0 }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const normalizedDirection = {
    x: direction.x !== 0 ? direction.x / Math.abs(direction.x) : 0,
    y: direction.y !== 0 ? direction.y / Math.abs(direction.y) : 0,
  };

  context = {
    direction: normalizedDirection,
    rotation,
    player1,
    player2,
    gamepadEmulator1,
    gamepadEmulator2,
  };

  return <DirectionContext.Provider value={context}>{children}</DirectionContext.Provider>;
}

export function useDirectionContext() {
  const context = useContext(DirectionContext);
  if (!context) throw new Error('useDirectionContext must be used inside a `DirectionProvider`');
  return context;
}
