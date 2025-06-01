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
import ProjectScreen from '../components/modules/ProjectScreen'

// import { useFrame, useRef } from 'react-three-fiber';
function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const CAMERA_POSITION: number[] = [0, 1.5, 7]

const CAMERA_LOOK_AT: number[] = [0, 1, 0]


function ProjectNavPage() {
  const { camera, scene } = useThree();
    return (
      <group>
        <OrbitControls
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
          position={new THREE.Vector3().fromArray(CAMERA_POSITION)}
          fov={20}
        /> 
            {/* <CameraControl></CameraControl> */}
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            {/* <mesh
                position={[0, 0, -0.9]}
                rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.5, 2]} />
                <meshPhongMaterial color='gray' />
            </mesh> */}
            <Suspense fallback={<Loader />}>
                <SpotLight
                position={[0, 3, -1]}
                distance={20}
                angle={-Math.PI * (50/180)}
                attenuation={5}
                anglePower={5} // Diffuse-cone anglePower (default: 5)
                />
                <AccumulativeShadows
                    temporal frames={100}
                    color="white" colorBlend={2}
                    toneMapped={true} alphaTest={0.75} opacity={2} scale={12}>
                    <RandomizedLight
                        castShadow
                        intensity={Math.PI} amount={10} radius={4}
                        ambient={0.5} position={[0, 3, -5]} bias={0.0001} />
                </AccumulativeShadows>
                <OldTV rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
                <ProjectScreen
                    position={[-0.07, 0.885, -0.04]}
                    rotation={[0, 0, 0]}
                    w={0.51} h={0.4}
                />
                <DoubleCouch position={[-1.4, 0, 2]} rotation={[0, 0, 0]}/>
                <SingleCouch position={[0.5, 0, 1.6]} rotation={[0, -Math.PI / 2, 0]} />
                <SingleCouch position={[0.5, 0, 0.1]} rotation={[0, -Math.PI / 2, 0]} />
                <CouchTable position={[0.75, 0, 1.3]} rotation={[0, -Math.PI/2 , 0]} />
          {/* <Chandelier /> */}
        </Suspense>
      </group>
    );
}
export default ProjectNavPage;