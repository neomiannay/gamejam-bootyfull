import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';
import { useGameStateContext } from '../provider/GameStateProvider';

function Cottons() {
  const { chrisMeshPosition } = useDirectionContext();
  const { setChrisScore } = useGameStateContext();

  // State to store cotton positions and bounding boxes
  const [cottons, setCottons] = useState([]);

  // Function to spawn a new cotton
  const spawnCotton = () => {
    const newCotton = {
      x: Math.random() * missyBounds, // Random x position within bounds
      y: 0, // Fixed y position
      z: -10, // Start at z = -10
      boundingBox: new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(Math.random() * missyBounds, 0, -10),
        new THREE.Vector3(0.5, 0.5, 0.5) // Size of the box
      ),
      hasCollided: false,
    };
    setCottons((prevCottons) => [...prevCottons, newCotton]);
  };

  // UseEffect to spawn cotton every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      spawnCotton();
    }, 3000); // Spawns every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const target = {
    id: 1,
    position: new THREE.Vector3(chrisMeshPosition.x, 0.0, chrisMeshPosition.z),
    boundingBox: new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(chrisMeshPosition.x, 0, chrisMeshPosition.z),
      new THREE.Vector3(3, 1, 1) // Size of the target's bounding box
    ),
  };

  // Update the position of each cotton and check for collisions
  useFrame((state, delta) => {
    setCottons(
      (prevCottons) =>
        prevCottons
          .map((cotton) => {
            if (cotton.length < 1) return;
            // Update the cotton's position
            cotton.z += 10 * delta;
            cotton.boundingBox.setFromCenterAndSize(
              new THREE.Vector3(cotton.x, cotton.y, cotton.z),
              new THREE.Vector3(0.5, 0.5, 0.5)
            );

            // Check for collisions
            if (cotton.boundingBox.intersectsBox(target.boundingBox) && !cotton.hasCollided) {
              console.log('Collided with cotton');
              setChrisScore((prevScore) => prevScore + 1);
              cotton.hasCollided = true; // Mark as collided
            }

            return cotton;
          })
          .filter((cotton) => !cotton.hasCollided) // Remove cottons that have passed z = 10 or collided
    );
  });

  return (
    <>
      {cottons.map((cotton, index) => (
        <mesh key={index} position={[cotton.x, cotton.y, cotton.z]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      ))}
    </>
  );
}

export default React.memo(Cottons);
