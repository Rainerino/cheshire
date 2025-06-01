import React, { useRef, useState, Suspense, useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Canvas, useThree} from '@react-three/fiber'
import LandingPage from './pages/Landing.tsx'
import CovariantPage from './pages/Covariant.tsx'
import ToteScene from './pages/Tote.tsx'
import { Stats, OrbitControls, Grid, Preload} from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from "r3f-perf"
import Background from './components/common/Background.tsx'
import MonitorDisplay from './components/modules/Monitor.tsx'
import { Route, Link, useLocation, useRoute } from "wouter"
import HomePage from "./pages/Home.tsx";



const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
// Background component moved to its own file: ./components/Background.tsx
const debug = true;

function Root() {
  const [, params] = useRoute('/')
  const [, setLocation] = useLocation()
  return <>
    <React.StrictMode>
    <div style={{ width: '100%', height: '100%'}}>
      <Canvas
        shadows={true}
      >
        <HomePage />
        <Background />
        {debug && <Stats />}
        {debug && <Perf position="bottom-left" />}
        {debug && <Grid infiniteGrid={true} />}
      </Canvas>
      <a style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }} href="#" onClick={() => setLocation('/')}>
        {params ? 'Home' : 'Back'}
      </a>
      </div>
   </React.StrictMode>
  </>

}
createRoot(container).render(<Root />);