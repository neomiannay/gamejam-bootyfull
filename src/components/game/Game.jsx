import { Grid, OrbitControls, Plane } from '@react-three/drei';
import Chris from '../../blocks/Chris';
import Missy from '../../blocks/Missy';
import { Perf } from 'r3f-perf';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function Game() {
  return (
    <Canvas className="canvas" shadows camera={{ position: [0, 10, 10] }}>
      <Perf position="bottom-right" />
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

        <Plane args={[40, 10]} rotation={[0, -Math.PI / 2, 0]} position={[5, 5, -8]}>
          <meshStandardMaterial color="green" side={2} />
        </Plane>

        <Plane args={[40, 10]} rotation={[0, -Math.PI / 2, 0]} position={[-5, 5, -8]}>
          <meshStandardMaterial color="green" side={2} />
        </Plane>

        <Plane args={[40, 40]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="black" side={2} />
        </Plane>

        <Missy />
        <Chris />
      </Suspense>
    </Canvas>
  );
}

export default Game;