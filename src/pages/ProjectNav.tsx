import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame, extend} from '@react-three/fiber'
import { useDepthBuffer, OrbitControls, useGLTF, useTexture, AccumulativeShadows, RandomizedLight, PerspectiveCamera, Environment, Center} from '@react-three/drei'
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
import { Autofocus, Scanline, Noise, EffectComposer, Selection, Select, DepthOfField } from '@react-three/postprocessing'

import { Room } from '../components/models/Room'
import PointLightWShadow from '../components/common/PointLightWShadow' // <--- CORRECTED IMPORT
import Curtain from '../components/models/Curtain'
import MonitorDisplay from '../components/modules/Monitor.tsx'
import gsap from 'gsap'
import "./Landing.css"
import CameraControl from '../components/common/CameraControl.tsx'
import ProjectScreen from '../components/modules/ProjectScreen'

const CAMERA_START_POSITION: number[] = [0, 2.3, 8]
const CAMERA_FINISH_POSITION: number[] = [0, 1.7, 6]
const CAMERA_LOOK_AT: number[] = [0, -0.3, -6]

// Do a Dolly zoom first

const EPS = 0.01
const isCameraAtPosition = (pos: THREE.Vector3, target: number[]) => {
    return (
        Math.abs(pos.x - target[0]) < EPS &&
        Math.abs(pos.y - target[1]) < EPS &&
        Math.abs(pos.z - target[2]) < EPS
    )
}

function ProjectNavPage() {
    const { camera } = useThree()
    
    // const { ref } = useRef()
    useFrame((state, delta) => {
        // Check whether we are in the first position
        if (isCameraAtPosition(camera.position, CAMERA_START_POSITION)) {
            
            // Do a dolly zoom onto the TV
            gsap.to(camera.position, {
                x: CAMERA_FINISH_POSITION[0],
                y: CAMERA_FINISH_POSITION[1],
                z: CAMERA_FINISH_POSITION[2],
                duration: 1.5,
                ease: "power2.out",
            })
            // Do a dolly zoom onto the TV
            
        }
        
    })
    return (
      <group>
        <OrbitControls
          target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT)}
          enableDamping={true}
          dampingFactor= {0.03}
          enablePan={false}
          enableRotate = {false}
          enableZoom={false}
        >
        </OrbitControls>
        <PerspectiveCamera
          makeDefault
          // 0.12, 0.97, 0.175
          position={new THREE.Vector3().fromArray(CAMERA_START_POSITION)}
          fov={15}
        /> 
        {/* <CameraControl></CameraControl> */}
        <ambientLight intensity={0.1} />
        {/* <Environment files='/images/cabin_4k.hdr' background backgroundBlurriness={0.5}/> */}
        {/* <Environment preset='sunset' backgroundBlurriness={0.5} /> */}
        <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[20, 100]} />
            <meshPhongMaterial color='#202020'/>
        </mesh>
        {/* <mesh
            receiveShadow
            position={[0, 0, -0.9]}
            rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.5, 2]} />
            <meshPhongMaterial color='gray' />
        </mesh> */}
        <EffectComposer multisampling={8} autoClear={false}>
            {/* <Scanline
            blendFunction={BlendFunction.OVERLAY} // blend mode
            density={1} // scanline density
            scrollSpeed={0.1} // scroll speed
            />
            <Noise opacity={0.02} /> */}
            <Autofocus
                mouse={true}
                smoothTime={0.15}
                focusRange={0.00025}
                bokehScale={8}
                resolutionScale={0.5}
                resolutionX={2048}
                resolutionY={2048}/>
        </EffectComposer>
        <fog attach="fog" args={['#202020', 5, 20]} />
            <Select enabled={false}>
                <SpotLight
                castShadow
                shadow-bias={-0.0001}
                shadow-mapSize={[2048, 2048]}
                position={[0, 5, -5]}
                distance={70}
                penumbra={0.4}
                radiusTop={0.4}
                radiusBottom={40}
                angle={0.45}
                attenuation={20}
                anglePower={5}
                intensity={300}
                opacity={0.2}
                />
                {/* <AccumulativeShadows
                    temporal frames={60}
                    color="white" colorBlend={2}
                    toneMapped={true} alphaTest={0.75} opacity={2} scale={12} resolution={512}>
                    <RandomizedLight
                        castShadow
                        intensity={Math.PI} amount={10} radius={4}
                        ambient={0.5} position={[0, 3, -5]} bias={0.0001} />
                </AccumulativeShadows> */}
                <OldTV rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
                <DoubleCouch position={[-1.4, 0, 2]} rotation={[0, 0, 0]}/>
                <SingleCouch position={[0.5, 0, 1.6]} rotation={[0, -Math.PI / 2, 0]} />
                <SingleCouch position={[0.5, 0, 0.1]} rotation={[0, -Math.PI / 2, 0]} />
                <CouchTable position={[0.75, 0, 1.3]} rotation={[0, -Math.PI/2 , 0]} />
            </Select>
            <ProjectScreen
                    position={[-0.07, 0.885, -0.04]}
                    rotation={[0, 0, 0]}
                    w={0.51} h={0.4}
                />
          {/* <Chandelier /> */}
      </group>
    );
}
export default ProjectNavPage;