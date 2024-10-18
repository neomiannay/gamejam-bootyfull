import React, { useEffect, useRef, useState } from 'react';
import Axis from 'axis-api';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useDirectionContext } from '../provider/DirectionProvider';
import { missyBounds } from '../utils/constants';
import { clamp } from 'lodash';
import { SVGLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

function Chris() {
  const meshRef = useRef();
  const { chrisPosition, chrisRotation, setChrisPosition, setChrisMeshPosition, controlledByPlayer } =
    useDirectionContext();

  const [svgGroup, setSvgGroup] = useState(null);

  useEffect(() => {
    const joystick = controlledByPlayer === 2 ? Axis.joystick2 : Axis.joystick1;
    const joystickMoveHandler = (event) => {
      const { x, y } = event.position;
      setChrisPosition({ x, z: y });
    };

    joystick.addEventListener('joystick:move', joystickMoveHandler);

    return () => {
      joystick.removeEventListener('joystick:move', joystickMoveHandler);
    };
  }, [controlledByPlayer, setChrisPosition]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const { x, z } = chrisPosition;
      const angleRotation = chrisRotation;
      const cosAngle = Math.cos(angleRotation);
      const sinAngle = Math.sin(angleRotation);

      const rotatedX = x * cosAngle - z * sinAngle;
      const rotatedY = x * sinAngle + z * cosAngle;

      setChrisPosition((prev) => ({
        x: prev.x + rotatedX * 10 * delta,
        z: prev.z - rotatedY * 10 * delta,
      }));

      const computedX = meshRef.current.position.x;
      const clampedX = clamp(computedX + rotatedX * 10 * delta, -missyBounds, missyBounds);
      meshRef.current.position.x = clampedX;

      const computedZ = meshRef.current.position.z;
      const clampedZ = clamp(computedZ - rotatedY * 10 * delta, -6, 7);
      meshRef.current.position.z = clampedZ;

      setChrisMeshPosition(meshRef.current.position);
      meshRef.current.rotation.y = angleRotation;
    }
  });

  // Load SVG once on mount
  useEffect(() => {
    const loader = new SVGLoader();
    loader.load('/images/chris/tete-4.svg', (data) => {
      const paths = data.paths;
      const group = new THREE.Group();

      paths.forEach((path) => {
        const material = new THREE.MeshBasicMaterial({
          color: path.color || 0xffffff,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          const geometry = new THREE.ShapeGeometry(shape);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.set(0.02, 0.02, 0.02);
          mesh.rotateZ(-Math.PI);
          mesh.rotateX(Math.PI / 6);

          group.add(mesh);
        });
      });

      setSvgGroup(group); // Store the group to use it in the cottons
    });
  }, []);

  return (
    <>
      <mesh ref={meshRef} position={[0, 0.8, 7]}>
        {svgGroup && svgGroup.children.map((child, i) => <primitive object={child.clone()} key={i} />)}
      </mesh>
    </>
  );
}

export default React.memo(Chris);
