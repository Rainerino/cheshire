import { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame, extend} from '@react-three/fiber'
import { useDepthBuffer, OrbitControls, useGLTF, useTexture, AccumulativeShadows, RandomizedLight, PerspectiveCamera, Environment, Center} from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber' 
import { Desktop } from '../components/models/Desktop'
import { Chair } from '../components/models/Chair'
import { DeskLamp } from '../components/models/DeskLamp'
import { LamyPen } from '../components/models/LamyPen'
import { PaperHolder } from '../components/models/PaperHolder'
import { TypeWriter } from '../components/models/TypeWriter'
import { WoodenDesk } from '../components/models/WoodenDesk'

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
  [2, 1.3, 0],
  [0.12, 1.25, 0.175]
]

const CAMERA_LOOK_AT: number[] = [0, 1.23, 0]

function monitor_click_event(e: MouseEvent, camera: THREE.Camera) {
  console.log('monitor click event', e)
  console.log(camera.position)

  // Only react to click if it's one of the two specific positions
  const isNearPosition = (posArr: number[], epsilon: number) =>
    Math.abs(posArr[0] - camera.position.x) < epsilon &&
    Math.abs(posArr[1] - camera.position.y) < epsilon &&
    Math.abs(posArr[2] - camera.position.z) < epsilon;

  const EPS = 0.01; // Adjust this value as needed for your precision
  // if (!isNearPosition(CAMERA_POSITION[0], EPS) && !isNearPosition(CAMERA_POSITION[1], EPS)) {
  //   return
  // }

  const targetPosition = isNearPosition(CAMERA_POSITION[1], EPS) ? CAMERA_POSITION[0] : CAMERA_POSITION[1];
  gsap.to(camera.position, {
    x: targetPosition[0],
    y: targetPosition[1],
    z: targetPosition[2],
    duration: 1.5,
    ease: "power3.inOut",
  })

}



function LandingPage() {
  const { camera, scene, gl } = useThree();
  const depthBuffer = useDepthBuffer()
  useEffect(() => {
    gl.physicallyCorrectLights = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap
  }, [gl]);
    return (
      <group>
        <Environment preset="night" />
        <OrbitControls
          target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT)}
          enableDamping={true}
          dampingFactor= {0.03}
          // enablePan={false}
          // enableRotate = {false}
          // enableZoom={false}
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
          position={new THREE.Vector3().fromArray(CAMERA_POSITION[0])}
          fov={45}
        /> 
        {/* <CameraControl></CameraControl> */}
        <ambientLight intensity={0.01} />
        <Suspense fallback={<Loader />}>
          <Room />
          <Chair position={[0.8, 0, -0.4]} rotation={[0, -Math.PI/2, 0]} />
          <WoodenDesk position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]}/>
          <LamyPen position={[0.19, 0.881, 0.29]} rotation={[0, Math.PI * 4/3, 0]}/>
          <DeskLamp position={[-0.1, 0.87, -0.43]} rotation={[0, Math.PI/2 + Math.PI/4, 0]}/>
          <TypeWriter position={[0, 0.87, 0]} rotation={[0, -Math.PI/2, 0]}/>
          {/* <PaperHolder position={[-0.1, 0.87, 0.91]} rotation={[0, Math.PI/2, 0]}/> */}
          <Curtain
            position={new THREE.Vector3(-2.8, 1.9, -0.31)}
            rotation={new THREE.Euler(0, -Math.PI / 2, 0)} />
          {/* <PointLightWShadow
            position={new THREE.Vector3(0, 2.5, 0)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            /> */}
          {/* <fog attach="fog" args={['#202020', 5, 20]} /> */}
          <SpotLight
            // depthBuffer={depthBuffer}
            castShadow
            debug
            volumetric
            penumbra={0.1}
            intensity={10}
            angle={0.3}
            distance={0}
            shadow-bias={-0.00001}
            shadow-mapSize={[512, 512]}
            position={[0, 3, 0]} />

        </Suspense>
      </group>
    );
}
export default LandingPage;