import React, { useEffect, useMemo, useRef, useState } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { clamp } from 'lodash';
import * as THREE from 'three';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';
import { Plane } from '@react-three/drei';

function Chris() {
  const meshRef = useRef();
  const { chrisPosition, chrisRotation, setChrisPosition, setChrisMeshPosition, controlledByPlayer } =
    useDirectionContext();

  // Joystick event handler
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

  // Update position and rotation each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      const { x, z } = chrisPosition;
      const angleRotation = chrisRotation;
      const cosAngle = Math.cos(angleRotation);
      const sinAngle = Math.sin(angleRotation);

      // Calculate rotated positions
      const rotatedX = x * cosAngle - z * sinAngle;
      const rotatedY = x * sinAngle + z * cosAngle;

      setChrisPosition((prev) => ({
        x: prev.x + rotatedX * 10 * delta,
        z: prev.z - rotatedY * 10 * delta,
      }));

      // Clamping positions
      const clampedX = clamp(meshRef.current.position.x + rotatedX * 10 * delta, -missyBounds, missyBounds);
      const clampedZ = clamp(meshRef.current.position.z - rotatedY * 10 * delta, 0, 7);

      meshRef.current.position.x = clampedX;
      meshRef.current.position.z = clampedZ;

      setChrisMeshPosition(meshRef.current.position);

      meshRef.current.rotation.y = angleRotation;
    }
  });

  // Head front material with texture
  const headFrontMaterial = useMemo(() => {
    const texture = new THREE.TextureLoader().load('/images/chris/tete-4.png');
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
  }, []);

  // Head back material with texture
  const headBackMaterial = useMemo(() => {
    const texture = new THREE.TextureLoader().load('/images/chris/tete-dos.png');
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, flipY: true, transparent: true });
  }, []);

  return (
    <>
      <group ref={meshRef} position={[0, 0.8, 7]} rotation={[-0.3, 0, 0]}>
        <mesh scale={[1.5, 1.5, 1.5]}>
          <Plane args={[1, 1]} material={headFrontMaterial} />
        </mesh>

        <mesh scale={[1.5, 1.5, 1.5]} position={[0, 0, -0.02]}>
          <Plane args={[1, 1]} material={headBackMaterial} />
        </mesh>
      </group>
    </>
  );
}

export default React.memo(Chris);
