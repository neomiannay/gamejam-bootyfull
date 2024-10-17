import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStateContext } from '../provider/GameStateProvider';

export function useWaveShooter(bounds) {
  const { setScore } = useGameStateContext();

  const [waves, setWaves] = useState([]);
  const nextWaveTimeRef = useRef(0);
  const speed = 10;
  const waveDelay = 500;
  const damage = 1;

  const shootWave = (position) => {
    const now = performance.now();
    if (now - nextWaveTimeRef.current > waveDelay) {
      const newWave = {
        x: position.x,
        y: position.y,
        z: position.z,
        speed,
        damage,
        createdAt: now,
        boundingBox: new THREE.Box3().setFromCenterAndSize(position, new THREE.Vector3(2, 2, 2)),
        hasCollided: false,
      };
      setWaves((prevWaves) => [...prevWaves, newWave]);
      nextWaveTimeRef.current = now;
    }
  };

  const updateWaves = (delta) => {
    setWaves((prevWaves) =>
      prevWaves
        .map((wave) => {
          const newZ = wave.z + wave.speed * delta;
          return {
            ...wave,
            z: newZ,
            boundingBox: new THREE.Box3().setFromCenterAndSize(
              { x: wave.x, y: wave.y, z: newZ },
              new THREE.Vector3(0.5, 0.5, 0.5)
            ),
          };
        })
        .filter((wave) => wave.z < bounds.z)
    );
  };

  const checkCollisions = (target) => {
    let collisions = [];
    setWaves((prevWaves) =>
      prevWaves.map((wave) => {
        if (!wave.hasCollided && wave.boundingBox.intersectsBox(target.boundingBox)) {
          collisions.push({ target, wave });
          target.health -= wave.damage;
          setScore((prevScore) => prevScore + 1);
          return { ...wave, hasCollided: true };
        }
        return wave;
      })
    );
    return collisions;
  };

  useFrame((state, delta) => {
    updateWaves(delta);
  });

  return {
    waves,
    shootWave,
    checkCollisions,
  };
}

export default React.memo(useWaveShooter);
