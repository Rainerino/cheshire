import React, { useRef, useState, Suspense, useEffect} from 'react'
import ReactDOMClient from 'react-dom/client'
import './index.css'
import { Canvas, useThree} from '@react-three/fiber'
import App from './App.tsx'
import LandingCanvas from './components/canvas/Landing.tsx'
import { Stats, OrbitControls, Grid} from '@react-three/drei'
import * as THREE from 'three'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

function Background() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(0x18181b);
    // Optionally, revert to the default background on unmount
    return () => {
      scene.background = new THREE.Color('black'); // or null for default
    };
  }, [scene]);

  return (
    <>
      {/* Your scene content here */}
    </>
  );
}


ReactDOMClient.createRoot(container).render(
  <Canvas shadows={true} >
    <Background />
    <Stats />
    <Grid infiniteGrid={true} />
    <LandingCanvas />
  </Canvas>,
  )