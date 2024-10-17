import React, { useEffect, useRef, useState } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';
import { clamp } from 'lodash';

function Chris() {
  const meshRef = useRef();
  const { direction, player1, chrisPosition, chrisRotation, setChrisPosition } = useDirectionContext();

  useEffect(() => {
    const joystickMoveHandler = (event) => {
      const { x, y } = event.position;
      setChrisPosition({ x, z: y });
    };

    Axis.joystick1.addEventListener('joystick:move', joystickMoveHandler);

    return () => {
      Axis.joystick1.removeEventListener('joystick:move', joystickMoveHandler);
    };
  }, []);

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

      /*
       ** joystick movment
       */
      meshRef.current.position.x += rotatedX * 10 * delta;
      meshRef.current.position.z -= rotatedY * 10 * delta;
      /*
       ** END joystick movment
       */

      /*
       ** keyboard movment
       */
      const { x: xKB, y: yKB } = direction;
      const computedX = meshRef.current.position.x;
      const clampedX = clamp(computedX + xKB * 10 * delta, -missyBounds, missyBounds);

      meshRef.current.position.x = clampedX;
      meshRef.current.position.z -= yKB * 10 * delta;
      /*
       ** END keyboard movment
       */

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
