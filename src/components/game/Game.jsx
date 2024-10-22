import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import Chris from '../../blocks/Chris';
import Missy from '../../blocks/Missy';
import { Perf } from 'r3f-perf';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import Waves from '../../blocks/Waves';
import Cottons from '../../blocks/Cottons';
import Hypnosis from '../../blocks/Hypnosis';
import * as THREE from 'three'
import Camera from '../../blocks/Camera';
import Background from '../../blocks/Background/Background';

function Game() {




  return (
    <Canvas className="canvas">
      {/* <Perf position="bottom-right" /> */}
      
      <color attach="background" args={['#000000']} />
      <Suspense fallback={null}>
        <Background/>
        <Camera/>
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
