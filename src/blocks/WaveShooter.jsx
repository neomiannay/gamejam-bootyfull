import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function useWaveShooter(bounds) {
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
      };
      setWaves((prevWaves) => [...prevWaves, newWave]);
      nextWaveTimeRef.current = now;
    }
  };

  const updateWaves = (delta) => {
    setWaves((prevWaves) =>
      prevWaves
        .map((wave) => ({
          ...wave,
          z: wave.z + wave.speed * delta,
        }))
        .filter((wave) => wave.z < bounds.z)
    );
  };

  useFrame((state, delta) => {
    updateWaves(delta);
  });

  return {
    waves,
    shootWave,
  };
}

export default React.memo(useWaveShooter);
