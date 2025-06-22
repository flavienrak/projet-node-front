'use client';

import React from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Mat_screen() {
  const { scene, materials } = useGLTF('/models/ecran.glb');
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    // Créer la vidéo
    const video = document.createElement('video');
    video.src = '/video.mp4';
    video.crossOrigin = 'Anonymous';
    video.loop = true;
    video.muted = true;
    video.play();
    videoRef.current = video;

    // Créer la texture
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;

    // Appliquer à ScreenMaterial
    const screenMaterial = materials.Mat_screen as THREE.MeshStandardMaterial;

    if (screenMaterial) {
      screenMaterial.map = texture;
      screenMaterial.needsUpdate = true;
    }
  }, [materials]);

  return <primitive object={scene} />;
}
