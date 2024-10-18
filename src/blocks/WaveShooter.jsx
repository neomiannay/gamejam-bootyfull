import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStateContext } from '../provider/GameStateProvider';
import { useDirectionContext } from '../provider/DirectionProvider';
import { useAudioContext } from '../provider/AudioProvider';

export function useWaveShooter(bounds) {
  const { chrisMeshPosition } = useDirectionContext();
  const { setMissyScore } = useGameStateContext();
  const { playSound, setVolume } = useAudioContext();

  const [waves, setWaves] = useState([]);
  const nextWaveTimeRef = useRef(0);
  const speed = 10;
  const waveDelay = 350;
  const damage = 1;

  // Shoot a wave from the current position
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

  // Update the waves' positions
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

  // Create the target object
  const target = {
    id: 1,
    position: new THREE.Vector3(chrisMeshPosition.x, 0.0, chrisMeshPosition.z),
    boundingBox: new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(chrisMeshPosition.x, 0, chrisMeshPosition.z),
      new THREE.Vector3(3, 1, 1) // Size of the target's bounding box
    ),
  };

  // Check for collisions between the waves and the target
  const checkCollisions = () => {
    let collisions = [];
    setWaves((prevWaves) =>
      prevWaves.map((wave) => {
        if (!wave.hasCollided && wave.boundingBox.intersectsBox(target.boundingBox)) {
          collisions.push({ target, wave });
          target.health -= wave.damage;
          setMissyScore((prevScore) => prevScore + 1);
          // Alternate between 2 sounds randomly
          const soundToPlay = Math.random() < 0.5 ? 'wave1' : 'wave2';
          playSound('actions', soundToPlay);
          setVolume('actions', soundToPlay, 0.8);

          return {
            ...wave,
            hasCollided: true,
          };
        }
        return wave;
      })
    );

    // remove collided waves
    setWaves((prevWaves) => prevWaves.filter((wave) => !wave.hasCollided));
    return collisions;
  };

  // Update the waves in each frame
  useFrame((state, delta) => {
    updateWaves(delta);
  });

  // Return the waves, shootWave and checkCollisions
  return {
    waves,
    shootWave,
    checkCollisions,
  };
}

export default React.memo(useWaveShooter);
