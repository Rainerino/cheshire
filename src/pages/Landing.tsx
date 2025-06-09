import { Suspense, useReducer, useRef, useState } from 'react'
import { CameraControls, useGLTF, Environment, PerspectiveCamera, OrbitControls, PivotControls, SpotLight, Preload, MeshReflectorMaterial, Helper, AccumulativeShadows, RandomizedLight, Grid, Loader, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import { Redirect, Route, Router, useLocation, useRoute, useRouter } from "wouter"
import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import ProjectNavPage from './NavigateProjects'
import "./Landing.css"
import CovariantPage from './Covariant'
import MotionMetricsPage from './MotionMetrics'
import NextPage from './Next'
import RoomScene from '../components/RoomScene'
import { Canvas, useLoader } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Perf } from "r3f-perf"

THREE.ColorManagement.enabled = true

const debug = true
function LandingPage() {
  const [, params] = useRoute('/home')
  const [location, setLocation] = useLocation()
  const router = useRouter()
  const [dpr, setDpr] = useState(1)
  return (
    <React.StrictMode>
      <Redirect to="/home" />
      {/* <Redirect to="/projects/next" /> */}
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          dpr={dpr}
          // frameloop="demand"
          performance={{ min: 0.1 }}
          shadows gl={{
            powerPreference: "high-performance",
            antialias: true,
            preserveDrawingBuffer: false
          }} >
          <color attach="background" args={['black']} />
          <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(0.5)} >
            {debug && <Stats />}
            {/* {debug && <Perf position="bottom-left" />} */}

            <Suspense fallback={null}>
              <Router base="/projects">
                <Route path="/" component={() => <ProjectNavPage />} />
                <Route path="/covariant" component={() => <CovariantPage />} />
                <Route path="/motion_metrics" component={() => <MotionMetricsPage />} />
                <Route path="/next" component={() => <NextPage />} />
              </Router>
              <Route path="/credit" >
                <PerspectiveCamera makeDefault fov={75} />
                <ambientLight intensity={1} />
                <CameraControls enabled dollySpeed={1} />
                {/* <Environment preset='city' /> */}
                {/* <PivotControls lineWidth={3} depthTest={false} scale={2}>
                    <Curtain position={new THREE.Vector3(-2.45, 1.7, -0.6)}
                      rotation={new THREE.Euler(0, -Math.PI / 2, 0)} />
                  </PivotControls> */}
                {/* <Grid infiniteGrid={true} /> */}
              </Route>
              <RoomScene />
              <Preload all />
            </Suspense>
          </PerformanceMonitor>

        </Canvas>
        {/* <Loader /> */}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 40,
            left: 100,
            transform: 'translateX(-50%)'
          }}
          onClick={() => {
            if (location.includes('projects')) {
              if (location === '/projects') {
                // TODO: fix the actual problems. I guess this works for now.
                window.location.reload();
                setLocation('/home#');
              } else {
                setLocation('/projects');
              }
            } else {
              setLocation('/home#');
            }
          }}
        >
          {params ? `` : `Back`}
        </Button>


        <a
          style={{ position: 'absolute', top: 50, right: 50, fontSize: '13px' }}
          href="#"
          onClick={() => {
            window.location.reload();
            setLocation('/home');
          }}
        >
          {`Home ${router.base} ${location}`}
        </a>
      </div>
    </React.StrictMode>
  )
}

function preloadGLTFFiles() {
  [
    '/models/es/CAT_6080_S.glb?url',
    '/models/room/Desktop2.glb?url',
    '/models/room/Room2.glb?url',
    '/models/tv_room/TVRoom.glb?url',
    '/models/stations/pick_tote.glb?url',
    '/models/stations/redcare_one_piece.glb?url',
    '/models/stations/robot_base.glb?url',
  ].forEach((url) => useGLTF.preload(url))
}

preloadGLTFFiles()

function preloadTexturefiles() {
  [
    '/textures/curtain.png',
    '/textures/paper_light.jpg'
  ].forEach((url) => {
    useLoader.preload(THREE.TextureLoader, url)
  })
}

preloadTexturefiles()
export default LandingPage
