import React, { useEffect, useRef, useState } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useDirectionContext } from '../provider/DirectionProvider';

function Chris() {
  const meshRef = useRef();
  const { player2 } = useDirectionContext();
  const joystick1ValuesRef = useRef({ x: 0, y: 0 });
  const joystick2ValuesRef = useRef({ x: 0 });
  const [isMKeyPressed, setIsMKeyPressed] = useState(false);
  const [accumulatedRotation, setAccumulatedRotation] = useState(0);

  useEffect(() => {
    const joystickMoveHandler = (event) => {
      const { x, y } = event.position;
      joystick1ValuesRef.current = { x, y };
    };

    const joystickRotationHandler = (event) => {
      const { x } = event.position;
      joystick2ValuesRef.current = { x };
    };

    const handleKeyDown = (event) => {
      if (event.key === 'x') {
        setIsMKeyPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'x') {
        setIsMKeyPressed(false);
      }
    };

    Axis.joystick1.addEventListener('joystick:move', joystickMoveHandler);
    Axis.joystick2.addEventListener('joystick:move', joystickRotationHandler);
    player2.addEventListener('keydown', handleKeyDown);
    player2.addEventListener('keyup', handleKeyUp);

    return () => {
      Axis.joystick1.removeEventListener('joystick:move', joystickMoveHandler);
      Axis.joystick2.removeEventListener('joystick:move', joystickRotationHandler);
      player2.removeEventListener('keydown', handleKeyDown);
      // player2.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const { x, y } = joystick1ValuesRef.current;
      const joystickRotationValue = joystick2ValuesRef.current.x;

      if (isMKeyPressed) {
        // Incrémente ou décrémente la rotation accumulée en fonction de la valeur du joystick
        setAccumulatedRotation((prevRotation) => prevRotation + joystickRotationValue * delta * 3);
      }

      const angleRotation = accumulatedRotation;
      const cosAngle = Math.cos(angleRotation);
      const sinAngle = Math.sin(angleRotation);

      const rotatedX = x * cosAngle - y * sinAngle;
      const rotatedY = x * sinAngle + y * cosAngle;

      meshRef.current.position.x += rotatedX * 10 * delta;
      meshRef.current.position.z -= rotatedY * 10 * delta;
      meshRef.current.rotation.y = angleRotation;
    }
  });

  return (
    <>
      <Html>
        <div>
          <h1>{accumulatedRotation.toFixed(2)}</h1>
        </div>
      </Html>

      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
}

export default React.memo(Chris);
