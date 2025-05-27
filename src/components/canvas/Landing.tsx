import { useRef, Suspense } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, PerspectiveCamera, Environment, Center } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber' 
import { Desktop } from '../models/Desktop'

import { Html, useProgress } from '@react-three/drei'
import { DesktopBasic } from '../models/DesktopBasic'
import reactLogo from './assets/react.svg'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function LandingCanvas() {
    return (
      <group>
        <PerspectiveCamera makeDefault position={[1.24, 1.24, 0.25]} />
        <ambientLight intensity={0.05} />
        <pointLight position={[0, 3.5, 0]} intensity={20} />
        <directionalLight position={[0, 0, 5]} color="red" />
        <Suspense fallback={<Loader />}>
          <DesktopBasic />
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
        </group>
    );
}

export default LandingCanvas;