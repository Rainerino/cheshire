
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
} from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'
import gsap from 'gsap'

import { Desktop } from '../components/models/Desktop'
import { Room } from '../components/models/Room'
import PointLightWShadow from '../components/common/PointLightWShadow'
import Curtain from '../components/models/Curtain'
import "./Covariant.css"
import { RedcareBase } from '../components/models/RedcareBase'
import { RedcareStation } from '../components/models/RedcareStation'
import { RedcareTote } from '../components/models/RedcareTote'
import { ABB1300 } from '../components/models/ABB1300'
import { CapBottle } from '../components/sku/CapBottle'
import { Coffee } from '../components/sku/Coffee'
import { InkBox } from '../components/sku/InkBox'
import { Mustard } from '../components/sku/Mustard'

import CameraControl from '../components/common/CameraControl'

import point_cloud_from_mesh from '../lib/point_cloud'

function ToteScene(props) {
    const { camera } = useThree();
    const POSITION_LIMITS = {
        width: 0.5,   // x: -1 to 1
        height: 0.5,  // y: 0 to 2
        length: 0.1,  // z: -1 to 1
    };
    function randomPosition() {
        return [
            Math.random() * POSITION_LIMITS.width - POSITION_LIMITS.width / 2,   // x
            Math.random() * POSITION_LIMITS.height,                              // y
            Math.random() * POSITION_LIMITS.length - POSITION_LIMITS.length / 2, // z
        ];
    }
    return <group {...props}>
        {/* <CameraControl /> */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <AccumulativeShadows temporal frames={100} scale={10}>
            <RandomizedLight amount={8} position={[5, 5, 0]} />
        </AccumulativeShadows> */}
        <PointLightWShadow
            position={new THREE.Vector3(-0.35, 2.4, 2.5)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={2}
            decay={1}
            near={0.2}
            far={10}
        />
        <RedcareTote />
        <CapBottle position={randomPosition()} />
        {/* <Coffee position={randomPosition()} />
        <InkBox position={randomPosition()} />
        <Mustard position={randomPosition()} /> */}
    </group>

}
export default ToteScene;