import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Perf } from "r3f-perf"
import { useLocation, useRoute } from "wouter"
import { Loader } from '@react-three/drei'
import LandingPage from './pages/Landing'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const debug = true;

function Root() {
  const [, params] = useRoute('/')
  const [, setLocation] = useLocation()
  return (
    <React.StrictMode>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas shadows>
          <Suspense fallback={null}>
            <LandingPage />
          </Suspense>
          {debug && <Stats />}
          {debug && <Perf position="bottom-left" />}
        </Canvas>
        <Loader />
        <a
          style={{ position: 'absolute', top: 50, left: 50, fontSize: '13px' }}
          href="#"
          onClick={() => setLocation('/')}
        >
          {params ? 'Home' : 'Back'}
        </a>
      </div>
    </React.StrictMode>
  )
}

createRoot(container).render(<Root />);
