import React, { useEffect, useRef, useState } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { clamp } from 'lodash';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';
import { useGameStateContext } from '../provider/GameStateProvider';

function Missy() {
  const meshRef = useRef(null);
  const { direction, player2, missyPosition, setMissyPosition, setChrisRotation, setMissyMeshPosition } =
    useDirectionContext();
  const { missyScore } = useGameStateContext();
  const [isRotating, setIsRotation] = useState(false);
  const [accumulatedRotation, setAccumulatedRotation] = useState(0);

  useEffect(() => {
    const joystickMoveHandler = (event) => {
      const { x, y } = event.position;
      setMissyPosition({ x, y });
    };

    const handleKeyDown = (event) => {
      if (event.key === 'x') {
        setIsRotation(true);
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
      setMissyMeshPosition(meshRef.current.position);
    }

    const joystickRotationValue = xMissy;

    if (isRotating) {
      setAccumulatedRotation((prevRotation) => prevRotation + joystickRotationValue * delta * 3);

      const angleRotation = accumulatedRotation;
      setChrisRotation(angleRotation);
    }

    const { x: xKB, y: yKB } = direction;
    const computedX = meshRef.current.position.x;
    const clampedX = clamp(computedX + xKB * 10 * delta, -missyBounds, missyBounds);

    meshRef.current.position.x = clampedX;
    meshRef.current.position.z -= yKB * 10 * delta;

    console.log('MISSY SCORE ', missyScore);
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

  // const { x } = event.position;
  // const currentTime = performance.now();
  // const delta = (currentTime - lastTimestampRef.current) / 1000;
  // lastTimestampRef.current = currentTime;
  // meshRef.current.position.x += x * 10 * delta;
  // const clampedX = clamp(meshRef.current.position.x, -missyBounds, missyBounds);
  // meshRef.current.position.x = clampedX;

  return (
    <>
      <mesh position={[0, 0.2, -10]} ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
}

export default React.memo(Missy);
