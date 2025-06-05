import { useEffect, useMemo, useRef } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import {
  PerspectiveCamera,
  useScroll,
  ScrollControls,
  Text,
  OrbitControls,
  Html
} from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

import { RedcareBase } from '../components/models/RedcareBase'
import { RedcareStation } from '../components/models/RedcareStation'
import ToteScene from './Tote'
import { ABB1300 } from '../components/models/ABB1300'
import PointLightWShadow from '../components/common/PointLightWShadow'
import "./Covariant.css"


import CameraControls from 'camera-controls'
CameraControls.install({ THREE })
extend({ CameraControls })

const CAMERA_POSITION = [
  [-0.3, 4.33, 1.76],
  [-0.35, 2.3, 2.4],
  [-2.63, 3.05, 3.65],
  [-2.07, 5.07, 2.11]
]
const CAMERA_LOOK_AT = [
  [-0.3, 0, 2.7],
  [-0.35, 0, 2.8],
  [1, 0.5, 1],
  [0, 0.5, 2.11],
]

const STATION_OFFSET = new THREE.Vector3(-0.9, 0, 1.8)
const STATION_ROTATION = new THREE.Euler(0, -Math.PI, 0)
const TOTE_OFFSET = new THREE.Vector3(0.556, 0.867, 0.725).add(STATION_OFFSET)
const PART = 5;

function HudText() {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);
  const mesh_ref = useRef()
  const scroll = useScroll()

  useFrame(() => {
    
  })
  return (
          <mesh ref={mesh_ref}  position={[0, 0, -1]}>
              <boxGeometry args={[0.4, 0.2, 0.05]} />
              {/* <meshStandardMaterial color="orange" /> */}
              <Html center distanceFactor={3}>
                  <div
                      ref={timeDivRef}
                      style={{
                          background: 'rgba(255,255,255,0.5)',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          color: '#222',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                  >
                      {/* Initial text, will be updated */}
                      {new Date().toLocaleTimeString()}
                  </div>
              </Html>
          </mesh>
  )
}
function CameraRig() {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);
  
  const scroll = useScroll()

  useEffect(() => {
    controls.smoothTime = 0.5
    controls.enabled = true;
    controls.setLookAt(
      CAMERA_POSITION[0][0],
      CAMERA_POSITION[0][1],
      CAMERA_POSITION[0][2],
      CAMERA_LOOK_AT[0][0],
      CAMERA_LOOK_AT[0][1],
      CAMERA_LOOK_AT[0][2],
      false
    )
  }, [controls])
  useFrame((state, delta) => {
  

    if (scroll.visible(0, 1 / PART, 0.01)) {
      // First scene
      controls.setLookAt(
        CAMERA_POSITION[0][0],
        CAMERA_POSITION[0][1],
        CAMERA_POSITION[0][2],
        CAMERA_LOOK_AT[0][0],
        CAMERA_LOOK_AT[0][1],
        CAMERA_LOOK_AT[0][2],
        true
      )

      
      // SplitText.create(".split", {
      //   type: "words, chars",
      //   onSplit(self) {
      //     gsap.from(self.chars, {
      //       duration: 1, 
      //       y: 100, 
      //       autoAlpha: 0, 
      //       stagger: 0.05
      //     });
      //   }
      // });
      // display text
    }

    if (scroll.visible(1/PART, 1/PART, 0.01)) {
      // First scene
      controls.setLookAt(
        CAMERA_POSITION[1][0],
        CAMERA_POSITION[1][1],
        CAMERA_POSITION[1][2],
        CAMERA_LOOK_AT[1][0],
        CAMERA_LOOK_AT[1][1],
        CAMERA_LOOK_AT[1][2],
        true
      )
    }

    
    if (scroll.visible(2/PART, 1/PART, 0.01)) {
      // First scene
      controls.setLookAt(
        CAMERA_POSITION[2][0],
        CAMERA_POSITION[2][1],
        CAMERA_POSITION[2][2],
        CAMERA_LOOK_AT[2][0],
        CAMERA_LOOK_AT[2][1],
        CAMERA_LOOK_AT[2][2],
        true
      )
    }

    if (scroll.visible(3/PART, 1/PART, 0.01)) {
      // Go to the next page
      controls.setLookAt(
        CAMERA_POSITION[3][0],
        CAMERA_POSITION[3][1],
        CAMERA_POSITION[3][2],
        CAMERA_LOOK_AT[3][0],
        CAMERA_LOOK_AT[3][1],
        CAMERA_LOOK_AT[3][2],
        true
      )
    }

    if (scroll.visible(4/PART, 1/PART, 0.01)) {
      // Go to the next page
      controls.setLookAt(
        CAMERA_POSITION[0][0],
        CAMERA_POSITION[0][1],
        CAMERA_POSITION[0][2],
        CAMERA_LOOK_AT[0][0],
        CAMERA_LOOK_AT[0][1],
        CAMERA_LOOK_AT[0][2],
        true
      )
    }

  
    controls.update(delta)
  })
}

function CovariantPage() {
  return (
    <group>
      <PerspectiveCamera
        makeDefault
        fov={30}
      />
      {/* <OrbitControls /> */}
      <ScrollControls pages={PART}>
        
          <CameraRig />

        
        {/* <Text position={[0, -4, 0]} color="red" anchorX="center" anchorY="middle" fontSize={1}>
          hello world!
        </Text> */}
          <PointLightWShadow
            position={new THREE.Vector3(-0.35, 2.4, 2.5)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={2}
            decay={1}
            near={0.2}
            far={10}
          />
          <PointLightWShadow
            position={new THREE.Vector3(0, 2.3, 1.7)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={0.5}
            decay={1}
            near={0.2}
            far={10}
          />
          <RedcareBase
            position={STATION_OFFSET}
            rotation={STATION_ROTATION}
          />
          <RedcareStation
            position={STATION_OFFSET}
            rotation={STATION_ROTATION}
          />
          <ToteScene
            position={TOTE_OFFSET}
            rotation={STATION_ROTATION}
          />
          <ABB1300
            position={STATION_OFFSET}
            rotation={STATION_ROTATION}
          />
        </ScrollControls>
    </group>
  )
}

export default CovariantPage
