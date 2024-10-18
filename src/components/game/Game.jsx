import { OrbitControls } from '@react-three/drei';
import Chris from '../../blocks/Chris';
import Missy from '../../blocks/Missy';
import { Perf } from 'r3f-perf';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Waves from '../../blocks/Waves';
import Cottons from '../../blocks/Cottons';
import Hynosis from '../../blocks/Hynosis';

function Game() {
  return (
    <Canvas className="canvas" shadows camera={{ position: [0, 6, 12.5], fov: 70 }}>
      {/* <Perf position="bottom-right" /> */}
      <color attach="background" args={['#000000']} />
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <OrbitControls />

        {/* <Grid
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
          /> */}

        <Missy />
        <Chris />

        <Waves />

        <Cottons />

        <Hynosis />
      </Suspense>
    </Canvas>
  );
}

export default Game;
