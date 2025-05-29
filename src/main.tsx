import React, { useRef, useState, Suspense, useEffect} from 'react'
import ReactDOMClient from 'react-dom/client'
import './index.css'
import { Canvas, useThree} from '@react-three/fiber'
import LandingPage from './pages/Landing.tsx'
import CovariantPage from './pages/Covariant.tsx'
import { Stats, OrbitControls, Grid, Preload} from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from "r3f-perf"
import Background from './components/common/Background.tsx'
import MonitorDisplay from './components/modules/Monitor.tsx'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
// Background component moved to its own file: ./components/Background.tsx
const debug = true;
ReactDOMClient.createRoot(container).render(
  <React.StrictMode>
    <Canvas shadows={true}  >
      <Background />
      {debug && <Stats />}
      {debug && <Perf position="bottom-left" />}
      {debug && <Grid infiniteGrid={true} />}
      <LandingPage />
      <Preload all />
    </Canvas>
  </React.StrictMode>

  )