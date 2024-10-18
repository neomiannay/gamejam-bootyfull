import React, { useEffect, useRef, useState } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { clamp } from 'lodash';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';
import { useGameStateContext } from '../provider/GameStateProvider';
import { SVGLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

function Missy() {
  const meshRef = useRef(null);
  const { direction, player2, missyPosition, setMissyPosition, setChrisRotation, setMissyMeshPosition } =
    useDirectionContext();
  const { missyScore } = useGameStateContext();
  const [isRotating, setIsRotation] = useState(false);
  const [accumulatedRotation, setAccumulatedRotation] = useState(0);
  const [svgGroup, setSvgGroup] = useState(null);

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

  // Load SVG once on mount
  useEffect(() => {
    const loader = new SVGLoader();
    loader.load('/images/missy/cursor-missy.svg', (data) => {
      const paths = data.paths;
      const group = new THREE.Group();

      paths.forEach((path) => {
        const material = new THREE.MeshBasicMaterial({
          color: path.color || 0xffffff, // Default to white if no color in SVG
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          const geometry = new THREE.ShapeGeometry(shape);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.set(0.004, 0.004, 0.004);
          mesh.rotateX(Math.PI / 1.8); // Rotate the wave
          group.add(mesh);
        });
      });

      setSvgGroup(group); // Store the group to use it in the cottons
    });
  }, []);

  return (
    <>
      <mesh position={[0, -0.8, -11]} ref={meshRef}>
        {svgGroup && svgGroup.children.map((child, i) => <primitive object={child.clone()} key={i} />)}
      </mesh>
    </>
  );
}

export default React.memo(Missy);
