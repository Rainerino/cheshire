import React, { Suspense,  useRef} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Perf } from "r3f-perf"
import { useLocation, useRoute, useRouter } from "wouter"
import { Loader } from '@react-three/drei'
import LandingPage from './pages/Landing'
import CovariantPage from './pages/Covariant'
import Overlay from './components/modules/CovariantOverlay'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const debug = true;

function Root() {
  const [, params] = useRoute('/')
  const [location, setLocation] = useLocation()
  const router = useRouter()
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
          onClick={() => setLocation('/projects/home')}
        >
          {params ? `Home ${router.base} ${location}` : `Back ${router.base} ${location}`}
        </a>
        {/* <Overlay ref={overlay} caption={caption} scroll={scroll} /> */}
      </div>
    </React.StrictMode>
  )
}

createRoot(container).render(<Root />);
