import { Suspense, useReducer, useRef, useState } from 'react'
import { useGLTF, Environment, PerspectiveCamera, OrbitControls, PivotControls, SpotLight, Preload, MeshReflectorMaterial, Helper, AccumulativeShadows, RandomizedLight, Grid, Loader } from '@react-three/drei'
import * as THREE from 'three'
import { Redirect, Route, Router, useLocation, useRoute, useRouter } from "wouter"

import { Room2 } from '../components/models/Room2'
import Curtain from '../components/models/Curtain'
import HomeNavPage from '../components/modules/HomePaper'
import ProjectScreen from '../components/modules/ProjectScreen'
import ProjectNavPage from './NavigateProjects'

import "./Landing.css"
import CovariantPage from './Covariant'
import MotionMetricsPage from './MotionMetrics'
import NextPage from './Next'
import { Desktop2 } from '../components/models/Desktop2'
import Mirror from '../components/modules/Mirror'
import { OverheadLamp } from '../components/modules/OverheadLamp'
import { RedrumDoor } from '../components/modules/RedrumDoor'
import RoomScene from '../components/RoomScene'
import AboutScene from '../components/AboutScene'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Perf } from "r3f-perf"
import React from 'react'


function useHover() {
  const [hovered, setHovered] = useState(false)
  return [hovered, { onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false) }]
}

function Soda(props: any) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, eventHandlers] = useHover()
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/soda-bottle/model.gltf') as any
  return (
    <group ref={ref} {...props} {...eventHandlers} dispose={null}>
      <ambientLight intensity={10} />
      <mesh geometry={nodes.Mesh_sodaBottle.geometry}>
        <meshStandardMaterial 
          color={hovered ? 'red' : 'green'} 
          roughness={0.33} 
          metalness={0.8} 
          envMapIntensity={2} 
        />
      </mesh>
      <mesh 
        geometry={nodes.Mesh_sodaBottle_1.geometry} 
        material={materials.red} 
        material-envMapIntensity={0} 
      />
    </group>
  )
}



const debug = true
function LandingPage() {
  const [, params] = useRoute('/home')
  const [location, setLocation] = useLocation()
  const router = useRouter()
  return (
    <React.StrictMode>
      <Redirect to="/projects/next" />
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas shadows gl={{ antialias: true, autoClear: true }} >
          <color attach="background" args={['black']} />
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
          <OrbitControls makeDefaults />
          <PivotControls lineWidth={3} depthTest={false} scale={2}>
            <Soda scale={6} position={[0, -1.6, 0]} />
          </PivotControls>
        </Route>

        <RoomScene />

        <Preload all />
      </Suspense>
      {debug && <Stats />}
      {debug && <Perf position="bottom-left" />}

    </Canvas>
    {/* <Loader /> */}
        <a
          style={{ position: 'absolute', top: 50, left: 50, fontSize: '13px' }}
          href="#"
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
          {params ? `Home ${router.base} ${location}` : `Back ${router.base} ${location}`}
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
    '/models/stations/pick_tote.glb?url',
    '/models/stations/redcare_one_piece.glb?url',
    '/models/stations/robot_base.glb?url',
  ].forEach(useGLTF.preload)
}

preloadGLTFFiles()
export default LandingPage
