import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll, OrbitControls, Gltf, useCursor, PerspectiveCamera, RenderTexture, MeshPortalMaterial, Text } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'
import { Desktop } from '../models/Desktop'
import { Room } from '../models/Room'
import { RedcareStation } from '../models/RedcareStation'
import { FC } from 'react'
import { RedcareTote } from '../models/RedcareTote'
import { RedcareBase } from '../models/RedcareBase'
import ABB1300 from '../models/ABB1300'
import CovariantPage from '../../pages/Covariant'
import { useRoute } from 'wouter'


const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

const material = new THREE.LineBasicMaterial({ color: 'white' })
const new_geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 0.5, 0)])
const state = proxy({
  clicked: null,
  urls: [1, 2, 3, 4, 5, 6].map((u) => `/images/${u}.jpg`)})

function Minimap() {
  const ref = useRef()
  const scroll = useScroll()
  const { urls } = useSnapshot(state)
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
      easing.damp(child.scale, 'y', 0.15 + y / 6, 0.15, delta)
    })
  })
  return (
    <group ref={ref}>
      {urls.map((_, i) => (
        <line key={i} geometry={new_geometry} material={material} position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]} />
      ))}
    </group>
  )
}

function Item({ index, position, width, c = new THREE.Color(), children, ...props }) {
    const ref = useRef()
    // const ref_b = useRef()
    const a_light = useRef()
    const plane = useRef()
    const bg = useRef()
    const scroll = useScroll()
    const portal = useRef<THREE.Material>(null)
    
    const { clicked, urls } = useSnapshot(state)
    const [hovered, hover] = useState(false)

    const w = width * GOLDEN_RATIO;
    const h = width;
    useFrame((state, delta) => {
      
    const y = scroll.curve((index)/ urls.length - 1.5 / urls.length, 4 / urls.length)
    if (portal.current && ref.current && a_light.current && plane.current) {
        const targetScale = (1-y) / 3 + 0.8; // normal to 1
        // easing.damp(ref.current.scale, "x", targetScale, 0.15, delta)
        // easing.damp(ref.current.scale, "y", targetScale, 0.15, delta)
        // easing.damp(ref.current.scale, "z", targetScale, 0.15, delta)

        easing.damp(a_light.current, "intensity", hovered ? 5 : 0, 0.5, delta)
        }
    })
    useCursor(hovered)
    const [, setLocation] = useRoute()

    const handleClick = () => {
        setLocation(`/page/${index}`)
    }

    return (
        <group {...props}>
            <mesh
                ref={ref}
                name={`${index}`}
                position={position}
                rotation={new THREE.Euler(-0.14, Math.PI / 2, 0, "YZX")}
                onDoubleClick={(e) => e.stopPropagation()}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                onClick={handleClick}
            >
                <planeGeometry ref={plane} args={[w, h]} />
                <MeshPortalMaterial
                    ref={portal}
                    transparent blur={0.2}
                    color='white'>
                    <color attach='background' args={['white']} />
                    <ambientLight ref={a_light} intensity={1} />
                    {children}
                </MeshPortalMaterial>
            </mesh>
        </group>
    )
    return <group {...props}>
        <mesh
            ref={ref}
            name='{index}'
            position={position}
            rotation={new THREE.Euler(-0.14, Math.PI/2, 0, "YZX")}
            onDoubleClick={(e) => (e.stopPropagation())}
            onPointerOver={(e) => hover(true)}
            onPointerOut={() => hover(false)}>
            <planeGeometry ref={plane} args={[w, h]} />
            <MeshPortalMaterial
                // worldUnits={true}
                ref={portal}
                transparent blur={0.2}
                // side={THREE.DoubleSide}
                color='white'>
                    <color attach='background' args={['white']} />
                    <ambientLight ref={a_light}  intensity={1} />
                    {children}
                    {/* <Gltf src="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf" position={[0, index/6, -3]} /> */}
                </MeshPortalMaterial>
            {/* <Text name={index} fontSize={0.2} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
                /{index}
            </Text> */}
        </mesh>
    </group>

}

function Soda(props) {
  const ref = useRef()
  const [hovered, spread] = useHover()
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/soda-bottle/model.gltf')
  useFrame((state, delta) => (ref.current.rotation.y += delta))
  return (
    <group ref={ref} {...props} {...spread} dispose={null}>
      <mesh geometry={nodes.Mesh_sodaBottle.geometry}>
        <meshStandardMaterial color={hovered ? 'red' : 'green'} roughness={0.33} metalness={0.8} envMapIntensity={2} />
      </mesh>
      <mesh geometry={nodes.Mesh_sodaBottle_1.geometry} material={materials.red} material-envMapIntensity={0} />
    </group>
  )
}

function Duck(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf')
  return <primitive object={scene} {...props} />
}


function Items({ w = 1}) {
    const gap = w * 0.2
    const { urls } = useSnapshot(state)
    const { height } = useThree((state) => state.viewport)
    const xW = w + gap
    const page_w = 0.541 // The whole page, DO NOT CHANGE
    const page_h = 0.305
    const page_center = new THREE.Vector3(-1, -0.4, -0.2)
    return (
        <ScrollControls
            damping={0.1} pages={(height - xW + urls.length * xW) / height}>
            {/* <Minimap /> */}
            <mesh>
                <planeGeometry args={[page_w, page_h]}/>
                <meshStandardMaterial color='white'>
                    <RenderTexture attach="map">
                        <Scroll>
                            <Item index={0} position={new THREE.Vector3(page_center.x, page_center.y + xW, page_center.z)} width={w}>
                                {/* <CovariantPage position={[0, 0, 0]} /> */}
                                <Desktop position={[1, -2, -3]} />
                            </Item>/
                            <Item index={1} position={new THREE.Vector3(page_center.x, page_center.y, page_center.z)} width={w}>
                                <Desktop position={[1, -2, -3]} />
                            </Item>/
                            <Item index={2} position={new THREE.Vector3(page_center.x, page_center.y-xW, page_center.z)} width={w}>
                                <RedcareBase position={[0.5, 0, -1.5]} />
                            </Item>/
                            <Item index={3} position={new THREE.Vector3(page_center.x, page_center.y - 2 *xW, page_center.z)} width={w}>
                                <RedcareBase position={[0.5, 0, -1.5]} />
                            </Item>/
                            <Item index={4} position={new THREE.Vector3(page_center.x, page_center.y - 3 * xW, page_center.z)} width={w}>
                                <RedcareBase position={[0.5, 0, -1.5]} />
                            </Item>/
                            <Item index={5} position={new THREE.Vector3(page_center.x, page_center.y - 4 * xW, page_center.z)} width={w}>
                                <RedcareBase position={[0.5, 0, -1.5]} />
                            </Item>/
                        </Scroll>
                    </RenderTexture>
                </meshStandardMaterial>
            </mesh>
        </ScrollControls>
    )
}


// Helper component to render Items to a texture using Drei's <RenderTexture>

const MonitorDisplay: FC = (props) => {
    return (
        <group {...props}>
            <ambientLight intensity={1} />

            <Items />
        </group>
    )
}

export default MonitorDisplay
