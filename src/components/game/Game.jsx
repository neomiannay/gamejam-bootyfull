import { OrbitControls } from '@react-three/drei';
import Chris from '../../blocks/Chris';
import Missy from '../../blocks/Missy';
import { Perf } from 'r3f-perf';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Waves from '../../blocks/Waves';
import Cottons from '../../blocks/Cottons';
import Hypnosis from '../../blocks/Hypnosis';

function Game() {
  return (
    <Canvas className="canvas" shadows camera={{ position: [0, 6, 12.5], fov: 70 }}>
      {/* <Perf position="bottom-right" /> */}
      <color attach="background" args={['#000000']} />
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <OrbitControls />

        <Missy />
        <Chris />

        <Waves />

        <Cottons />

        <Hypnosis />
      </Suspense>
    </Canvas>
  );
}

export default Game;
