import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, useGLTF, Environment, Float, Html, OrbitControls, PerspectiveCamera, PivotControls } from '@react-three/drei'
import { MathUtils } from 'three'
import CameraControl from '../components/common/CameraControl'
import { useLocation, Route, Link } from "wouter"
import ProjectScreen from '../components/modules/ProjectScreen'
import ProjectNavPage from './ProjectNav'


export function Soda(props) {
    const ref = useRef()
    const [hovered, spread] = useHover()
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/soda-bottle/model.gltf')
    useFrame((state, delta) => (ref.current.rotation.y += delta))
    return (
        <group ref={ref} {...props} {...spread} dispose={null}>
        <ambientLight intensity={10} />
        <mesh geometry={nodes.Mesh_sodaBottle.geometry}>
          <meshStandardMaterial color={hovered ? 'red' : 'green'} roughness={0.33} metalness={0.8} envMapIntensity={2} />
        </mesh>
        <mesh geometry={nodes.Mesh_sodaBottle_1.geometry} material={materials.red} material-envMapIntensity={0} />
      </group>
    )
  }
  
  function useHover() {
    const [hovered, hover] = useState(false)
    return [hovered, { onPointerOver: (e) => hover(true), onPointerOut: () => hover(false) }]
  }


export default function HomePage(props) {
    const [location, navigate] = useLocation();
  return (
      // < camera={{ position: [] }}>
      <group {...props}>
        {/* <CameraControl /> */}
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]}> */}
        <mesh rotation={[0, 0, 0]}>
          <planeGeometry args={[5, 5]} />
          <Html style={{ userSelect: 'none' }}
              transform>
                {/* <iframe title="embed" width={700} height={500} src="https://threejs.org/" frameBorder={0} /> */}
                    <div style={{ width: '700', height: '500'}}>
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
          <Route path="/about" component={() => <ProjectScreen position={[0, 0, 0]} rotation={[0, 0, 0]} />} />
          <Route path="/project" component={() => <ProjectNavPage />} />
          <Route path="/credit">
              <PivotControls lineWidth={3} depthTest={false} scale={2}>
              <Soda scale={6} position={[0, -1.6, 0]} />
              </PivotControls>
          </Route>
      </group>
  )
}
