import React, { Suspense,  useRef} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Perf } from "r3f-perf"
import { Redirect, useLocation, useRoute, useRouter } from "wouter"
import { Loader } from '@react-three/drei'
import LandingPage from './pages/Landing'
import CovariantPage from './pages/Covariant'
import Overlay from './components/modules/CovariantOverlay'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const debug = true;

function Root() {
  const [, params] = useRoute('/home')
  const [location, setLocation] = useLocation()
  const router = useRouter()
  return (
    <React.StrictMode>
      <Redirect to="/projects/motion_metrics" />
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas shadows gl={{ antialias: true, autoClear: true }} >
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
          onClick={() => {
            if (location.includes('projects')) {
              if (location === '/projects') {
                setLocation('/home#');
              } else {
                setLocation('/projects');
              }
            } else {
              setLocation('/home#');
            }
          }}
        >
          {params ? `Home ${router.base} ${location}` : `Back ${router.base} ${location}`}
        </a>
      </div>
    </React.StrictMode>
  )
}


createRoot(container).render(<Root />);
