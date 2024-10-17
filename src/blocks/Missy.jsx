import React, { useEffect, useRef } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { clamp } from 'lodash';
import { useWaveShooter } from './WaveShooter';
import { useDirectionContext } from '../provider/DirectionProvider';

function Missy() {
  const meshRef = useRef(null);
  const lastTimestampRef = useRef(performance.now());
  const { direction, player1 } = useDirectionContext();

  const bounds = { x: [-4, 4], y: [-4, 4] };
  const boundsWaves = { z: 10 };
  const { waves, shootWave } = useWaveShooter(boundsWaves);

  const player1keydownHandler = (e) => {
    if (meshRef.current) {
      if (e.key === 'w') {
        shootWave({
          x: meshRef.current.position.x,
          y: meshRef.current.position.y,
          z: meshRef.current.position.z,
        });
      }
      a;
    }
  };

  useFrame((_, delta) => {
    if (meshRef.current) {
      const { x, y } = direction;

      meshRef.current.position.x += x * 10 * delta;
      const clampedX = clamp(meshRef.current.position.x, bounds.x[0], bounds.x[1]);
      meshRef.current.position.x = clampedX;

      meshRef.current.position.y -= y * 10 * delta;
      const clampedY = clamp(meshRef.current.position.y, bounds.y[0], bounds.y[1]);
      meshRef.current.position.y = clampedY;
    }
  });

  useEffect(() => {
    const joystickMoveHandler = (event) => {
      if (meshRef.current) {
        const { x } = event.position;
        const currentTime = performance.now();
        const delta = (currentTime - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = currentTime;

        meshRef.current.position.x += x * 10 * delta;
        const clampedX = clamp(meshRef.current.position.x, bounds.x[0], bounds.x[1]);
        meshRef.current.position.x = clampedX;
      }
    };

    Axis.joystick2.addEventListener('joystick:move', joystickMoveHandler);
    player1.addEventListener('keydown', player1keydownHandler);

    return () => {
      Axis.joystick2.removeEventListener('joystick:move', joystickMoveHandler);
      player1.removeEventListener('keydown', player1keydownHandler);
    };
  }, []);

  return (
    <>
      <mesh position={[0, 0.2, -10]} ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      {waves.map((wave, index) => (
        <mesh key={index} position={[wave.x, wave.y, wave.z]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </>
  );
}

export default React.memo(Missy);
