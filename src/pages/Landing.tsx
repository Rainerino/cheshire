import { useRef, Suspense } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, AccumulativeShadows, RandomizedLight, PerspectiveCamera, Environment, Center } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber' 
import { Desktop } from '../components/models/Desktop'
import { useThree } from '@react-three/fiber'

import { Html, useProgress, SpotLight, SpotLightShadow } from '@react-three/drei'
import { DesktopBasic } from '../components/models/DesktopBasic'
import { RoomBasic } from '../components/models/RoomBasic'
import { Room } from '../components/models/Room'
import PointLightWShadow from '../components/common/PointLightWShadow' // <--- CORRECTED IMPORT
import Curtain from '../components/models/Curtain'
import gsap from 'gsap'
import "./Landing.css"

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const CAMERA_POSITION: number[][] = [
  [1, 1.21, 0.175],
  [0.12, 0.97, 0.175]
]
function monitor_click_event(e: MouseEvent, camera: THREE.Camera) {
  console.log('monitor click event', e)
  console.log(camera.position)

  // Only react to click if it's one of the two specific positions
  const isNearPosition = (posArr: number[], epsilon: number) =>
    Math.abs(posArr[0] - camera.position.x) < epsilon &&
    Math.abs(posArr[1] - camera.position.y) < epsilon &&
    Math.abs(posArr[2] - camera.position.z) < epsilon;

  const EPS = 0.01; // Adjust this value as needed for your precision
  if (!isNearPosition(CAMERA_POSITION[0], EPS) && !isNearPosition(CAMERA_POSITION[1], EPS)) {
    return
  }

  const targetPosition = isNearPosition(CAMERA_POSITION[1], EPS) ? CAMERA_POSITION[0] : CAMERA_POSITION[1];
  gsap.to(camera.position, {
    x: targetPosition[0],
    y: targetPosition[1],
    z: targetPosition[2],
    duration: 1.5,
    ease: "power3.inOut",
  })
}
// import PointLightWShadow from '../common/PointLightWShadow'; // NOT NEEDED

{/* <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
<div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
  <HeroPage />
</div>
</Html> */}

function LandingCanvas() {
    const { camera } = useThree();
    return (
      <group>
        <OrbitControls
          target={[0, 0.95, 0.175]}
          enableDamping={true}
          enablePan={false}
          enableZoom={true}
          minPolarAngle={- Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          maxDistance={2}
          // minDistance={0.3}
          dampingFactor={0.3}
        >
        </OrbitControls>
        <PerspectiveCamera
          makeDefault
          // 0.12, 0.97, 0.175
          position={[1, 1.21, 0.175]}
          fov={75}
        /> 
        <ambientLight intensity={0.05} />
        <Suspense fallback={<Loader />}>
          <Desktop monitor_click_event={(e: MouseEvent) => monitor_click_event(e, camera)} />
          {/* <Environment preset="sunset" background /> */}
          <Room />
          <Curtain
            position={new THREE.Vector3(-2.8, 1.9, -0.31)}
            rotation={new THREE.Euler(0, -Math.PI / 2, 0)} />
          <PointLightWShadow
            position={new THREE.Vector3(0, 3.5, 0)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={20} />
        </Suspense>
      </group>
    );
}
export default LandingCanvas;