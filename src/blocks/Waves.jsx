// This component manages the rendering and behavior of waves shot by Missy
import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWaveShooter } from './WaveShooter';
import { useDirectionContext } from '../provider/DirectionProvider';

// Define the bounds for the waves
export const boundsWaves = { z: 10 };

function Waves() {
  // Access necessary context and functions from custom hooks
  const { player2, chrisPosition, chrisMeshPosition, missyMeshPosition } = useDirectionContext();
  const { waves, checkCollisions, shootWave } = useWaveShooter(boundsWaves);

  // Listen for keydown events and shoot a wave when certain keys are pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.key);
      if (missyMeshPosition && (event.key === 'a' || event.key === 'w')) {
        shootWave({
          x: missyMeshPosition.x,
          y: 0.2,
          z: -10,
        });
      }
    };

    player2.addEventListener('keydown', handleKeyDown);

    return () => {
      player2.removeEventListener('keydown', handleKeyDown);
    };
  }, [missyMeshPosition]);

  // Check for collisions and update wave positions on each frame
  useFrame((state, delta) => {
    checkCollisions();
  });

  // Render the waves as spheres at their respective positions
  return (
    <>
      {waves.map((wave, index) => (
        <mesh key={index} position={[wave.x, wave.y, wave.z]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </>
  );
}

export default React.memo(Waves);
