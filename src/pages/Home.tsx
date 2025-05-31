import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, useGLTF, Environment, Float, Html, OrbitControls, PerspectiveCamera, PivotControls } from '@react-three/drei'
import { MathUtils } from 'three'
import CameraControl from '../components/common/CameraControl'
import { useLocation, Route, Link } from "wouter"


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

  
export function Duck(props) {
    const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf')
    return <primitive object={scene} {...props} />
}
export function Apple(props) {
    const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple-half/model.gltf')
    useFrame((state, delta) => (scene.rotation.y += delta))
    return <primitive object={scene} {...props} />
  }

export default function App(props) {
    const [location, navigate] = useLocation();
  return (
      // <Canvas camera={{ position: [] }}>
      <group {...props}>
        <CameraControl />
          <Route path="/">
              <mesh>
                  <planeGeometry args={[5, 5]} />
                  {/* <meshStandardMaterial color="#00ff00" /> */}
              </mesh>
            <Html style={{ userSelect: 'none' }} castShadow receiveShadow  transform>
                {/* <iframe title="embed" width={700} height={500} src="https://threejs.org/" frameBorder={0} /> */}
                <div style={{ width: '700', height: '500'}}>
                    <ul>
                          <li>{`The current page is: ${location}`}</li>
                          {/* <a onClick={() => navigate("/somewhere")}>Click to update</a> */}
                          <li>
                          <Link href="/somewhere" className="active">Click to update</Link>
                          </li>
                          <li>
                          <Link href="/somewhere1" className="active">Click to update</Link>
                          </li>
                          <li>
                          <Link href="/somewhere2" className="active">Click to update</Link>
                          </li>
                    <li>Milk</li>
                    </ul>
                </div>
            </Html>
          </Route>
          <Route path="/somewhere" component={() => <Duck />} />
          <Route path="/somewhere1" component={() => <Apple />} />
          <Route path="/somewhere2">
              
                <PivotControls lineWidth={3} depthTest={false} displayValues={false} scale={2}>
              <Soda scale={6} position={[0, -1.6, 0]} />
              </PivotControls>
          </Route>
      <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} />
      </group>

    // </Canvas>
  )
}
