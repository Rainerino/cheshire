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
import { DesktopBasic } from '../components/models/DesktopBasic'
import { RoomBasic } from '../components/models/RoomBasic'
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
  [0.12, 1.25, 0.175]
]
// _Vector3 {x: -0.3195355788383821, y: 4.337162435914561, z: 1.2508072134178676}
const CAMERA_LOOK_AT: number[] = [-0.3, 0, 2.7]

const STATION_OFFSET = new THREE.Vector3(-0.9, 0, 1.8);
const STATION_ROTATION = new THREE.Euler(0, -Math.PI, 0);

// _Vector3 {x: -0.28194033633246585, y: 4.071042611766185, z: 1.7684700243287432}
// Covariant.tsx: 68 _Vector3 { x: -0.001198597740649782, y: -0.9804993308335117, z: 0.1965187665300494 }

// _Vector3 {x: -0.2617058030913809, y: -0.9651443213275512, z: 0.0025517910329686533}x: -0.2617058030913809y: -0.9651443213275512z: 0.0025517910329686533[[Prototype]]: Object
// Covariant.tsx:69 _Vector3 {x: -0.9309810974777887, y: 4.0223803647815535, z: 2.4347546739731984}
// {x: -1.2752672368179523, y: 3.209193407052544, z: 2.2971683008864168}
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
          target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT)}
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
          position={new THREE.Vector3().fromArray(CAMERA_POSITION[0])}
          fov={30}
        /> 
        <ambientLight intensity={0.05} />
        {/* <AccumulativeShadows temporal frames={100} scale={10}>
          <RandomizedLight amount={8} position={[5, 5, 0]} />
        </AccumulativeShadows> */}
        <Suspense fallback={<Loader />}>
          <Desktop
            position={new THREE.Vector3(0, 0.28, 0)}
            monitor_click_event={(e: MouseEvent) => monitor_click_event(e, camera)} />
          {/* <Environment preset="sunset" background /> */}
          <PointLightWShadow
            position={new THREE.Vector3(0, 3.5, 0)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={20} />
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