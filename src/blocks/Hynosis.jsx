import React from 'react';
import { VideoTexture } from 'three';

function Hynosis() {
  const video = document.createElement('video');
  video.src = '../../public/videos/spirale.mp4';
  video.loop = true;
  video.muted = true;
  video.style.display = 'none'; // Hide the video element
  document.body.appendChild(video);

  video.play();
  const texture = new VideoTexture(video);
  texture.needsUpdate = true;

  return (
    <mesh position={[0, 4, -12]} scale={[0.2, 0.1, 1]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default React.memo(Hynosis);
