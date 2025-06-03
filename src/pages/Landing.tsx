import { useRef, useState } from 'react'
import { useGLTF, Environment, PerspectiveCamera, OrbitControls, PivotControls, SpotLight, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { Route, Router } from "wouter"

import { Desktop } from '../components/models/Desktop'
import { Chair } from '../components/models/Chair'
import { DeskLamp } from '../components/models/DeskLamp'
import { LamyPen } from '../components/models/LamyPen'
import { PaperHolder } from '../components/models/PaperHolder'
import { TypeWriter } from '../components/models/TypeWriter'
import { WoodenDesk } from '../components/models/WoodenDesk'
import { Room } from '../components/models/Room'
import Curtain from '../components/models/Curtain'
import HomeNavPage from './HomeNav'
import ProjectScreen from '../components/modules/ProjectScreen'
import ProjectNavPage from './ProjectNav'

import "./Landing.css"
import CovariantPage from './Covariant'
import CameraControl from '../components/common/CameraControl'
import MotionMetricsPage from './MotionMetrics'
import DuoYiPage from './DuoYi'
import NextPage from './Next'

const CAMERA_POSITION = [
  [1.8, 1.9, 0],
  [0.12, 1.25, 0.175]
]

const CAMERA_LOOK_AT = [0, 1.1, 0]

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

function LandingPage() {
  return (
    <group>
      <Router base="/projects">
        <Route path="/" component={() => <ProjectNavPage />} />
        <Route path="/covariant" component={() => <CovariantPage />} />
        <Route path="/motion_metrics" component={() => <MotionMetricsPage />} />
        <Route path="/duoyi" component={() => <DuoYiPage />} />
        <Route path="/next" component={() => <NextPage />} />
      </Router>
      <Route path="/about"  component={() => <ProjectScreen position={[0, 0, 0]} rotation={[0, 0, 0]} />} />
      {/* <Route path="/duoyi" component={DuoyiPage} />
      <Route path="/motion_metrics" component={MotionMetricsPage} />
      <Route path="/next" component={NextPage} /> */}
      <Route path="/credit" >
        <PerspectiveCamera fov={75} />
        <ambientLight intensity={1} />
        <OrbitControls makeDefaults />
        <PivotControls lineWidth={3} depthTest={false} scale={2}>
          <Soda scale={6} position={[0, -1.6, 0]} />
        </PivotControls>
      </Route>
      <Route path="/">
        <HomeNavPage 
          position={[0.1, 0.87, 0.5]} 
          rotation={[-Math.PI / 2, 0, Math.PI / 2 + Math.PI / 5]} 
          scale={[1, 1, 1]} 
        />
        {/* <Environment 
          files="/textures/night.hdr"
          background
          backgroundBlurriness={0.1}
          backgroundIntensity={0.1} 
        /> */}
        <Environment preset='night' />
        {/* <CameraControl /> */}
        <OrbitControls
          target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT)}
          enableDamping
          dampingFactor={0.01}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={-Math.PI / 5 + Math.PI / 2}
          maxPolarAngle={-Math.PI / 18 + Math.PI / 2}
          minAzimuthAngle={-Math.PI / 6 + Math.PI / 2}
          maxAzimuthAngle={Math.PI / 6 + Math.PI / 2}
        />
        <PerspectiveCamera
          makeDefault
          position={new THREE.Vector3().fromArray(CAMERA_POSITION[0])}
          fov={45}
        />
        <ambientLight intensity={0.1} />
        <Room />
        <WoodenDesk position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <LamyPen position={[0.2, 0.882, 0.5]} rotation={[0, Math.PI * 4 / 3, 0]} />
        <DeskLamp position={[-0.1, 0.87, -0.43]} rotation={[0, Math.PI / 2 + Math.PI / 4, 0]} />
        <TypeWriter position={[0, 0.87, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Curtain
          position={new THREE.Vector3(-2.8, 1.9, -0.31)}
          rotation={new THREE.Euler(0, -Math.PI / 2, 0)} 
        />
        {/* <fog attach="fog" args={['#202020', 5, 20]} /> */}
        <SpotLight
          castShadow
          volumetric
          penumbra={0.1}
          intensity={10}
          angle={0.4}
          distance={0}
          shadow-bias={-0.0001}
          shadow-mapSize={[512, 512]}
          position={[0, 2.5, 0]} 
        />
      </Route>
      {/* <Preload all /> */}
    </group>
  )
}

function preloadGLTFFiles() {
  [
    '/models/room/Desktop.glb?url',
    '/models/room/Chair.glb?url',
    '/models/room/DeskLamp.glb?url',
    '/models/room/LamyPen.glb?url',
    '/models/room/PaperHolder.glb?url',
    '/models/room/TypeWriter.glb?url',
    '/models/room/WoodenDesk.glb?url',
    '/models/room/Room.glb?url',
  ].forEach(useGLTF.preload)
}

preloadGLTFFiles()
export default LandingPage
