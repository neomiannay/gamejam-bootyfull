import React, { useEffect, useRef } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';
import { clamp } from 'lodash';

function Chris() {
  const meshRef = useRef();
  const { chrisPosition, chrisRotation, setChrisPosition, setChrisMeshPosition, controlledByPlayer } =
    useDirectionContext();

  useEffect(() => {
    const joystick = controlledByPlayer === 2 ? Axis.joystick2 : Axis.joystick1;
    const joystickMoveHandler = (event) => {
      const { x, y } = event.position;
      setChrisPosition({ x, z: y });
    };

    joystick.addEventListener('joystick:move', joystickMoveHandler);

    return () => {
      joystick.removeEventListener('joystick:move', joystickMoveHandler);
    };
  }, [controlledByPlayer, setChrisPosition]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const { x, z } = chrisPosition;
      const angleRotation = chrisRotation;
      const cosAngle = Math.cos(angleRotation);
      const sinAngle = Math.sin(angleRotation);

      const rotatedX = x * cosAngle - z * sinAngle;
      const rotatedY = x * sinAngle + z * cosAngle;

      setChrisPosition((prev) => ({
        x: prev.x + rotatedX * 10 * delta,
        z: prev.z - rotatedY * 10 * delta,
      }));

      const computedX = meshRef.current.position.x;
      const clampedX = clamp(computedX + rotatedX * 10 * delta, -missyBounds, missyBounds);
      meshRef.current.position.x = clampedX;

      const computedZ = meshRef.current.position.z;
      const clampedZ = clamp(computedZ - rotatedY * 10 * delta, -missyBounds, missyBounds);
      meshRef.current.position.z = clampedZ;

      setChrisMeshPosition(meshRef.current.position);
      meshRef.current.rotation.y = angleRotation;
    }
  });

  return (
    <>
      <Html>
        <div>
          <h1>{chrisRotation.toFixed(2)}</h1>
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
