'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Plane } from '@react-three/drei';
import { Grid } from '@react-three/drei';

const ScreenViewer = dynamic(() => import('@/components/3d/Mat_screen'), {
  ssr: false,
});

export default function ModelComponent() {
  return (
    <Canvas
      shadows
      camera={{ position: [2, 3, -3.5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* <color attach="background" args={['#111111']} /> */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 5, 5]} intensity={1} castShadow />
      <Suspense fallback={'Loading'}>
        <ScreenViewer />
        {/* <Environment files="/hdri/studio.exr" background /> */}
      </Suspense>
      <OrbitControls />
      <Environment preset="apartment" />
    </Canvas>
  );
}
