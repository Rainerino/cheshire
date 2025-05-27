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

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

// import PointLightWShadow from '../common/PointLightWShadow'; // NOT NEEDED

function LandingCanvas() {
    return (
      <group>
        <OrbitControls target={[0, 1, 0.25]} enableDamping={true} />
        <PerspectiveCamera makeDefault position={[1.24, 1.24, 0.25]} />
        <ambientLight intensity={0.05} />
        <Suspense fallback={<Loader />}>
          <Desktop />
          {/* <Environment preset="sunset" background /> */}
          <Room />
          <PointLightWShadow
            position={new THREE.Vector3().fromArray([0, 3.5, 0])}
            rotation={new THREE.Euler().fromArray([-Math.PI / 2, 0, 0])}
            intensity={20} />
        </Suspense>
      </group>
    );
}

export default LandingCanvas;