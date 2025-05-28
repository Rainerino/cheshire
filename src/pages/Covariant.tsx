import { useRef, Suspense, useState} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  OrthographicCamera,
  Html, 
  MeshPortalMaterial,
  useProgress, 
  Gltf,
  AccumulativeShadows, 
  RandomizedLight, 
  Environment,
  useCursor,
  CubeCamera,
} from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'
import gsap from 'gsap'

import { Desktop } from '../components/models/Desktop'
import { Room } from '../components/models/Room'
import PointLightWShadow from '../components/common/PointLightWShadow'
import Curtain from '../components/models/Curtain'
import "./Covariant.css"
import { RedcareBase } from '../components/models/RedcareBase'
import { RedcareStation } from '../components/models/RedcareStation'
import { RedcareTote } from '../components/models/RedcareTote'
import { ABB1300 } from '../components/models/ABB1300'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const CAMERA_POSITION: number[][] = [
  [-0.3, 4.33, 1.76],
  [-2.63, 3.05, 3.65],
  [-2.07, 5.07, 2.11]
]
// _Vector3 {x: -2.069830475568031, y: 5.07567819499762, z: 2.1135408510197125}
const CAMERA_LOOK_AT: number[][] = [
  [-0.3, 0, 2.7],
  [1, 0.5, 1],
  [0, 0.5, 2.11],
]

const STATION_OFFSET = new THREE.Vector3(-0.9, 0, 1.8);
const STATION_ROTATION = new THREE.Euler(0, -Math.PI, 0);

const CURRENT_TARGET = 2

function monitor_click_event(e: MouseEvent, camera: THREE.Camera) {
  console.log('monitor click event', e)
  console.log(camera.position)
}

function Frame({ ...props }) {
  const portal = useRef()
  const { camera } = useThree();
  const [hovered, hover] = useState(false)
  useFrame(() => {
    console.log(camera.position)
    // camera.lookAt(new THREE.Vector3().fromArray(CAMERA_LOOK_AT))
    // camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI/2)
    // camera.rotation.z += Math.PI/2;
    // camera.position.set(1, 1, 1)

  });
  useCursor(hovered)
    return (
      <group>
        <mesh
          position={[-0.15, 1.20, 0.17]}
          rotation={[0, Math.PI/2, 0]}
          onDoubleClick={(e) => (e.stopPropagation())}
          onPointerOver={(e) => hover(true)}
          onPointerOut={() => hover(false)}>
          {/* <color attach="background" args={['#f0f0f0']} /> */}
          <planeGeometry args={[0.53, 0.3]} />
          <MeshPortalMaterial
            ref={portal}
            // blur = {1024}
            side={THREE.DoubleSide}>
            <color attach="background" args={["#0fffff"]} />
            <ambientLight intensity={1} />
            {/* <RedcareStation /> */}
            <Gltf src="/models/room/Desktop.glb" scale={1} position={[0, -0.8, -4]} /> 
          </MeshPortalMaterial>
        </mesh>
      </group>
    )
}
function CovariantCanvas() {
    const { camera } = useThree();
    return (
      <group>
        <OrbitControls
          target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT[CURRENT_TARGET])}
          enableDamping={true}
          // enablePan={false}
          // enableRotate = {false}
          // enableZoom={false}
          minPolarAngle={- Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          maxDistance={10}
          // minDistance={0.3}
          dampingFactor={0.3}
        />
        <PerspectiveCamera
          makeDefault
          position={new THREE.Vector3().fromArray(CAMERA_POSITION[CURRENT_TARGET])}
          fov={30}
        /> 
        <ambientLight intensity={0.1} />
        {/* <AccumulativeShadows temporal frames={100} scale={10}>
          <RandomizedLight amount={8} position={[5, 5, 0]} />
        </AccumulativeShadows> */}
        <Suspense fallback={<Loader />}>
          <Desktop
            position={new THREE.Vector3(0, 0.28, 0)}
            monitor_click_event={(e: MouseEvent) => monitor_click_event(e, camera)} />
          {/* <Environment preset="sunset" background /> */}
          <PointLightWShadow
            position={new THREE.Vector3(-0.35, 2.4, 2.5)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={2}
            decay={1}
            near={0.2}
            far={10} />
          {/* {x: 0.00785536018694799, y: 3.362279762715715, z: 1.7383673784236808} */}
          <PointLightWShadow
            position={new THREE.Vector3(0, 2.3, 1.7)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={0.5}
            decay={1}
            near={0.2}
            far={10} />
          <RedcareBase
            position={STATION_OFFSET}
          rotation={STATION_ROTATION}/>
          <RedcareStation
            position={STATION_OFFSET}
            rotation={STATION_ROTATION}/>
          <RedcareTote
            position={STATION_OFFSET}
            rotation={STATION_ROTATION} />
          <ABB1300
            position={STATION_OFFSET}
            rotation={STATION_ROTATION} />
          <Frame />
        </Suspense>
      </group>
    );
}
export default CovariantCanvas;