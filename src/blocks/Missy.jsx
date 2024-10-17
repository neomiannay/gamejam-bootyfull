import React, { useEffect, useRef, useState } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { clamp } from 'lodash';
import { useWaveShooter } from './WaveShooter';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';

function Missy() {
  const meshRef = useRef(null);
  const { player2, missyPosition, setMissyPosition, setChrisRotation } = useDirectionContext();
  const [isRotating, setIsRotation] = useState(false);
  const [accumulatedRotation, setAccumulatedRotation] = useState(0);

  const boundsWaves = { z: 10 };
  const { waves, shootWave } = useWaveShooter(boundsWaves);

  useEffect(() => {
    const joystickMoveHandler = (event) => {
      const { x, y } = event.position;
      setMissyPosition({ x, y });
    };

    const handleKeyDown = (event) => {
      if (event.key === 'x') {
        setIsRotation(true);
      }

      if (meshRef.current && event.key === 'a') {
        shootWave({
          x: meshRef.current.position.x,
          y: meshRef.current.position.y,
          z: meshRef.current.position.z,
        });
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'x') {
        setIsRotation(false);
      }
    };

    Axis.joystick2.addEventListener('joystick:move', joystickMoveHandler);
    player2.addEventListener('keydown', handleKeyDown);
    player2.addEventListener('keyup', handleKeyUp);

    return () => {
      Axis.joystick2.removeEventListener('joystick:move', joystickMoveHandler);
      player2.removeEventListener('keydown', handleKeyDown);
      player2.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const { x: xMissy } = missyPosition;

    if (meshRef.current && !isRotating) {
      const computedX = meshRef.current.position.x;
      const clampedX = clamp(computedX + xMissy * 10 * delta, -missyBounds, missyBounds);
      meshRef.current.position.x = clampedX;
    }

    const joystickRotationValue = xMissy;

    if (isRotating) {
      setAccumulatedRotation((prevRotation) => prevRotation + joystickRotationValue * delta * 3);

      const angleRotation = accumulatedRotation;
      setChrisRotation(angleRotation);
    }
  });

  // useEffect(() => {
  //   const joystickMoveHandler = (event) => {
  //     if (meshRef.current) {
  //       const { x } = event.position;
  //       const currentTime = performance.now();
  //       const delta = (currentTime - lastTimestampRef.current) / 1000;
  //       lastTimestampRef.current = currentTime;

  //       meshRef.current.position.x += x * 10 * delta;
  //       const clampedX = clamp(meshRef.current.position.x, bounds.x[0], bounds.x[1]);
  //       meshRef.current.position.x = clampedX;
  //     }
  //   };

  //   Axis.joystick2.addEventListener('joystick:move', joystickMoveHandler);
  //   player1.addEventListener('keydown', player1keydownHandler);

  //   return () => {
  //     Axis.joystick2.removeEventListener('joystick:move', joystickMoveHandler);
  //     player1.removeEventListener('keydown', player1keydownHandler);
  //   };
  // }, []);

  // useFrame((_, delta) => {
  //   if (meshRef.current) {
  //     const { x, y } = direction;

  //     meshRef.current.position.x += x * 10 * delta;
  //     const clampedX = clamp(meshRef.current.position.x, bounds.x[0], bounds.x[1]);
  //     meshRef.current.position.x = clampedX;

  //     meshRef.current.position.y -= y * 10 * delta;
  //     const clampedY = clamp(meshRef.current.position.y, bounds.y[0], bounds.y[1]);
  //     meshRef.current.position.y = clampedY;
  //   }
  // });

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
