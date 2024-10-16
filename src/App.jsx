import { Grid, Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import React, { Suspense } from 'react';
import Chris from './blocks/Chris';

function Scene() {
  return (
    <>
      <Leva />
      <Loader />
      <Canvas className="canvas" shadows camera={{ position: [0, 10, 10] }}>
        <color attach="background" args={['#e8c5b9']} />
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <OrbitControls />

          <Grid
            args={[5, 5]}
            cellSize={0.5}
            cellThickness={1}
            cellColor={'#76492b'}
            sectionSize={2}
            sectionThickness={1.5}
            sectionColor={'#523622'}
            fadeDistance={50}
            fadeStrength={0.5}
            followCamera={false}
            infiniteGrid
          />

          <Chris />
        </Suspense>
      </Canvas>
    </>
  );
}

export default React.memo(Scene);
