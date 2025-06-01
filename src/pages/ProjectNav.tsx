import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame, extend} from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, AccumulativeShadows, RandomizedLight, PerspectiveCamera, Environment, Center} from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber' 
import { Desktop } from '../components/models/Desktop'
import { Chandelier } from '../components/models/Chandelier'
import { CouchTable } from '../components/models/CouchTable'
import { DoubleCouch } from '../components/models/DoubleCouch'
import { SingleCouch } from '../components/models/SingleCouch'
import { OldTV } from '../components/models/TV.tsx'
import { useThree } from '@react-three/fiber'

import { Html, useProgress, SpotLight, SpotLightShadow } from '@react-three/drei'
import { Room } from '../components/models/Room'
import PointLightWShadow from '../components/common/PointLightWShadow' // <--- CORRECTED IMPORT
import Curtain from '../components/models/Curtain'
import MonitorDisplay from '../components/modules/Monitor.tsx'
import gsap from 'gsap'
import "./Landing.css"
import CameraControl from '../components/common/CameraControl.tsx'

// import { useFrame, useRef } from 'react-three-fiber';
function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const CAMERA_POSITION: number[][] = [
  [0.8, 1.49, 0.175],
  [0.12, 1.25, 0.175]
]

const CAMERA_LOOK_AT: number[] = [0, 1.23, 0.175]


function ProjectNavPage() {
  const { camera, scene } = useThree();
    return (
      <group>
        {/* <OrbitControls
          target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT)}
          enableDamping={true}
          dampingFactor= {0.03}
          enablePan={false}
          // enableRotate = {false}
          enableZoom={false}
          // minPolarAngle={-Math.PI / 18 + Math.PI / 2}
          // maxPolarAngle={Math.PI/ 18 + Math.PI / 2}
          // maxDistance={2}
          // minAzimuthAngle={-Math.PI / 10 + Math.PI / 2}
          // maxAzimuthAngle={ Math.PI / 10 + Math.PI / 2 }
          // minDistance={0.3}
        >
        </OrbitControls>
        <PerspectiveCamera
          makeDefault
          // 0.12, 0.97, 0.175
          position={new THREE.Vector3().fromArray(CAMERA_POSITION[1])}
          fov={75}
        />  */}
        <CameraControl></CameraControl>
        <ambientLight intensity={0.05} />
        <Suspense fallback={<Loader />}>

        </Suspense>
      </group>
    );
}
export default ProjectNavPage;