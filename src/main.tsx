import React, { useRef, useState, Suspense} from 'react'
import ReactDOMClient from 'react-dom/client'
import './index.css'
import { Canvas} from '@react-three/fiber'
import App from './App.tsx'
import LandingCanvas from './components/canvas/Landing.tsx'
import { Stats, OrbitControls, Grid} from '@react-three/drei'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

ReactDOMClient.createRoot(container).render(
  <Canvas shadows>
    {/* <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
    {/* <App position={[-1.2, 0, 0]} />
    <App position={[1.2, 0, 0]} /> */}
    <Stats />
    <Grid infiniteGrid={true} />
    <LandingCanvas />
  </Canvas>,
  )