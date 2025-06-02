import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, ContactShadows, useGLTF, Environment, Float, Html, OrbitControls, PerspectiveCamera, PivotControls } from '@react-three/drei'
import { MathUtils } from 'three'
import CameraControl from '../components/common/CameraControl'
import { useLocation, Route, Link } from "wouter"
import ProjectScreen from '../components/modules/ProjectScreen'
import ProjectNavPage from './ProjectNav'




export default function HomePage(props) {
  const [location, navigate] = useLocation();
  const texture = useTexture('/textures/paper.jpg')
  return (
      // < camera={{ position: [] }}>
      <group {...props}>
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]}> */}
        <mesh receiveShadow>
          <planeGeometry args={[0.3 * 0.618, 0.3]} />
          
        <meshStandardMaterial color="white" side={THREE.DoubleSide} map={texture} />
          <Html
              style={{ userSelect: 'none' }}
              transform
          scale={0.03}
          position={[0, 0.05, 0]}
              material={<meshPhysicalMaterial side={THREE.DoubleSide} opacity={0.1} />}>
              <div style={{ width: '7', height: '5' }}>
                <ul>
                      <li>{`The current page is: ${location}`}</li>
                      {/* <a onClick={() => navigate("/about")}>Click to update</a> */}
                      <li>
                      <Link href="/about" className="active">Click to update</Link>
                      </li>
                      <li>
                      <Link href="/project" className="active">Click to update</Link>
                      </li>
                      <li>
                      <Link href="/credit" className="active">Click to update</Link>
                      </li>
                  <li>Milk</li>
                  </ul>
              </div>
            </Html>
          </mesh>
      </group>
  )
}
