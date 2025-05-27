import { useRef, Suspense } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, AccumulativeShadows, RandomizedLight, PerspectiveCamera, Environment, Center } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber' 
import { Desktop } from '../models/Desktop'
import { useThree } from '@react-three/fiber'

import { Html, useProgress, SpotLight, SpotLightShadow } from '@react-three/drei'
import { DesktopBasic } from '../models/DesktopBasic'
import { RoomBasic } from '../models/RoomBasic'
import { Room } from '../models/Room'
import PointLightWShadow from '../common/PointLightWShadow' // <--- CORRECTED IMPORT
import Curtain from '../models/Curtain'


function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function monitor_click_event(e: MouseEvent) {
  console.log('monitor click event', e)

}
// import PointLightWShadow from '../common/PointLightWShadow'; // NOT NEEDED

function LandingCanvas() {
    return (
      <group>
        <OrbitControls
          target={[0, 1, 0.25]}
          enableDamping={true}
          enablePan={false}
          enableZoom={true}
          minPolarAngle={- Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          maxDistance={2}
          minDistance={0.3}
          dampingFactor={0.3}
        >
        </OrbitControls>
        <PerspectiveCamera
          makeDefault
          position={[1.24, 1.24, 0.25]} />
        <ambientLight intensity={0.05} />
        <Suspense fallback={<Loader />}>
          <Desktop monitor_click_event={monitor_click_event} />
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