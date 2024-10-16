import React, { useEffect, useRef } from 'react';
import { useDirectionContext } from '../provider/DirectionProvider';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';

function Chris() {
  const meshRef = useRef();
  const { direction } = useDirectionContext();
  const lastTimestampRef = useRef(0);

  console.log(Axis);
  useEffect(() => {
    const joystickMoveHandler = (event) => {
      if (meshRef.current) {
        const { x, y } = event.position;

        const currentTime = performance.now();
        const delta = (currentTime - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = currentTime;

        meshRef.current.position.x += x * 10 * delta;
        meshRef.current.position.z -= y * 10 * delta;
      }
    };

    Axis.joystick1.addEventListener('joystick:move', joystickMoveHandler);

    return () => {
      Axis.joystick1.removeEventListener('joystick:move', joystickMoveHandler);
    };
  }, []);

  // useFrame((_, delta) => {
  //   if (meshRef.current) {
  //     const { x, y } = direction;
  //     meshRef.current.position.x += x * 10 * delta;
  //     meshRef.current.position.z -= y * 10 * delta;
  //   }
  // });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default React.memo(Chris);
