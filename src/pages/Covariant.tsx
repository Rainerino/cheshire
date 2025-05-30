import { useRef, Suspense, useState, useEffect} from 'react'
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
  Grid,
  Stats
} from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'
import gsap from 'gsap'
import { proxy, useSnapshot } from 'valtio'

import { Desktop } from '../components/models/Desktop'
import { Room } from '../components/models/Room'
import PointLightWShadow from '../components/common/PointLightWShadow'
import Curtain from '../components/models/Curtain'
import "./Covariant.css"
import { RedcareBase } from '../components/models/RedcareBase'
import { RedcareStation } from '../components/models/RedcareStation'
import  ToteScene  from './Tote'
import { ABB1300 } from '../components/models/ABB1300'
import CameraControl from '../components/common/CameraControl'
import Overlay from '../components/modules/CovariantOverlay'
import { Perf } from "r3f-perf"
import Background from '../components/common/Background.tsx'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const CAMERA_POSITION: number[][] = [
  [-0.3, 4.33, 1.76],
  [-0.3, 2.3, 2.3],
  [-2.63, 3.05, 3.65],
  [-2.07, 5.07, 2.11]
]
// _Vector3 {x: -2.069830475568031, y: 5.07567819499762, z: 2.1135408510197125}
const CAMERA_LOOK_AT: number[][] = [
  [-0.3, 0, 2.7],
  [-0.3, 0, 2.7],
  [1, 0.5, 1],
  [0, 0.5, 2.11],
]

const STATION_OFFSET = new THREE.Vector3(-0.9, 0, 1.8);
const STATION_ROTATION = new THREE.Euler(0, -Math.PI, 0);
const TOTE_OFFSET = new THREE.Vector3(0.556, 0.867, 0.725).add(STATION_OFFSET);

function CameraMovement({ scroll, ...props }) {
  useFrame((state, delta) => {
    const camera = state.camera;
    // Clamp scroll.current between 0 and 1
    const t = Math.max(0, Math.min(1, scroll.current));
    // Interpolate between camera positions (0, 1, 2, 3, 4)
    const posA = new THREE.Vector3().fromArray(CAMERA_POSITION[0]);
    const posB = new THREE.Vector3().fromArray(CAMERA_POSITION[1]);
    const posC = new THREE.Vector3().fromArray(CAMERA_POSITION[2]);
    const posD = new THREE.Vector3().fromArray(CAMERA_POSITION[3]);

    const tgtA = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[0]);
    const tgtB = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[1]);
    const tgtC = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[2]);
    const tgtD = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[3]);

    let targetPosition = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3();

    if (t < 1 / 3) {
      // Interpolate between 0 and 1
      const localT = t * 3;
      targetPosition.lerpVectors(posA, posB, localT);
      targetLookAt.lerpVectors(tgtA, tgtB, localT);
    } else if (t < 2 / 3) {
      // Interpolate between 1 and 2
      const localT = (t - 1 / 3) * 3;
      targetPosition.lerpVectors(posB, posC, localT);
      targetLookAt.lerpVectors(tgtB, tgtC, localT);
    } else {
      // Interpolate between 2 and 3
      const localT = (t - 2 / 3) * 3;
      targetPosition.lerpVectors(posC, posD, localT);
      targetLookAt.lerpVectors(tgtC, tgtD, localT);
    }

    // Smoothly interpolate camera position
    camera.position.lerp(targetPosition, 0.1);
    // Smoothly interpolate camera lookAt
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.lerp(targetLookAt, 1);
    camera.lookAt(currentLookAt);
  })
}

const CURRENT_TARGET = 0

function CovariantPage() {

  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)


  return (
    <group>
      <CameraMovement scroll={scroll} />
      {/* <OrbitControls
        target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT[CURRENT_TARGET])}
        enableDamping={true}
        enablePan={false}
        enableRotate = {false}
        enableZoom={false}
        minPolarAngle={- Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        maxDistance={10}
        // minDistance={0.3}
        dampingFactor={0.3}
      /> */}
      <PerspectiveCamera
        makeDefault
        position={new THREE.Vector3().fromArray(CAMERA_POSITION[CURRENT_TARGET])}
        fov={30}
      /> 
      {/* <CameraControl /> */}
      {/* <ambientLight intensity={0.1} /> */}
      {/* <AccumulativeShadows temporal frames={100} scale={10}>
        <RandomizedLight amount={8} position={[5, 5, 0]} />
      </AccumulativeShadows> */}
      <Suspense fallback={<Loader />}>
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
        <ToteScene
          // position={STATION_OFFSET.add(TOTE_OFFSET)}
          position={TOTE_OFFSET}
          rotation={STATION_ROTATION} />
        <ABB1300
          position={STATION_OFFSET}
          rotation={STATION_ROTATION} />
      </Suspense>
        {/* <Overlay ref={overlay} caption={caption} scroll={scroll} /> */}
        
    </group>
            
    );
}
export default CovariantPage;