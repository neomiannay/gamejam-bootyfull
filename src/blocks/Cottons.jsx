import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import * as THREE from 'three';

import { useDirectionContext } from '../provider/DirectionProvider';
import { useGameStateContext } from '../provider/GameStateProvider';
import { missyBounds } from '../utils/constants';

function Cottons() {
  const { chrisMeshPosition } = useDirectionContext();
  const { setChrisScore } = useGameStateContext();

  const [cottons, setCottons] = useState([]);
  const [svgGroup, setSvgGroup] = useState(null); // State for the loaded SVG group

  // Cottons bounds
  const boundsCottons = { z: 10 };

  // Function to spawn a new cotton
  const spawnCotton = () => {
    const newCotton = {
      x: Math.random() * missyBounds, // Random x position within bounds
      y: -0.1, // Fixed y position
      z: -10, // Start at z = -10
      boundingBox: new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(Math.random() * missyBounds, 0, -10),
        new THREE.Vector3(0.5, 0.5, 0.5) // Size of the box
      ),
      hasCollided: false,
    };
    setCottons((prevCottons) => [...prevCottons, newCotton]);
  };

  // Load SVG once on mount
  useEffect(() => {
    const loader = new SVGLoader();
    loader.load('/public/images/coton.svg', (data) => {
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
          mesh.scale.set(0.002, 0.002, 0.002);
          mesh.rotateX(-Math.PI / 2.5);
          group.add(mesh);
        });
      });

      setSvgGroup(group); // Store the group to use it in the cottons
    });
  }, []);

  // Spawn cottons at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      spawnCotton();
    }, 3000); // Spawns every 3 seconds

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
    setCottons((prevCottons) =>
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
            setChrisScore((prevScore) => prevScore + 1);
            cotton.hasCollided = true; // Mark as collided
          }

          return cotton;
        })
        .filter((cotton) => !cotton.hasCollided) // Remove cottons that have passed z = 10 or collided
        .filter((cotton) => cotton.z < boundsCottons.z)
    );
  });

  return (
    <>
      {cottons.map((cotton, index) => (
        <mesh key={index} position={[cotton.x, cotton.y, cotton.z]}>
          {svgGroup && svgGroup.children.map((child, i) => <primitive object={child.clone()} key={i} />)}
        </mesh>
      ))}
    </>
  );
}

export default React.memo(Cottons);
