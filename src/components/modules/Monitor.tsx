import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll, OrbitControls, Gltf, useCursor, PerspectiveCamera, RenderTexture, MeshPortalMaterial, Text } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'
import { Desktop } from '../models/Desktop'
import { Room } from '../models/Room'
import { RedcareStation } from '../models/RedcareStation'

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

const material = new THREE.LineBasicMaterial({ color: 'white' })
const new_geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 0.5, 0)])
const state = proxy({
  clicked: null,
  urls: [1, 2, 3].map((u) => `/images/${u}.jpg`)})

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
  const scroll = useScroll()
    const portal = useRef()
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const click = () => (state.clicked = index === clicked ? null : index)
  const over = () => hover(true)
  const out = () => hover(false)
    useFrame((state, delta) => {
      
    // const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
    // easing.damp3(ref.current.scale, [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 + y, 1], 0.15, delta)
    // ref.current.material.scale[0] = ref.current.scale.x
    // ref.current.material.scale[1] = ref.current.scale.y
    // if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
    // if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
    // if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
    // easing.damp(ref.current.material, 'grayscale', hovered || clicked === index ? 0 : Math.max(0, 1 - y), 0.15, delta)
    // easing.dampC(ref.current.material.color, hovered || clicked === index ? 'white' : '#aaa', hovered ? 0.3 : 0.15, delta)
    })
    useCursor(hovered)
    //   return <Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
    return <group {...props}>
        <Text name={index} fontSize={0.5} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
            /{index}
        </Text>
        <mesh name='{index}'
            position={position}
            onDoubleClick={(e) => (e.stopPropagation())}
            onPointerOver={(e) => hover(true)}
            onPointerOut={() => hover(false)}>
                <planeGeometry args={[width, width * GOLDEN_RATIO]} />
                <MeshPortalMaterial ref={portal} side={THREE.DoubleSide}>
                <color attach="background" args={['#f0f0f0']} />
                <ambientLight intensity={1} />
                {children}
                {/* <Gltf src="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf" position={[0, index/6, -3]} /> */}
            </MeshPortalMaterial>
        </mesh>
        <mesh name='{index}_b' position={[position.x, position.y, position.z-0.001]}>
            <planeGeometry args={[width + 0.05, width * GOLDEN_RATIO + 0.05]} />
            <meshBasicMaterial color="black" />
        </mesh>
    </group>

}
import { FC } from 'react'
import CameraControl from '../common/CameraControl'

function Items({ w = 1}) {
    const gap = w * 0.3
    const { urls } = useSnapshot(state)
    const { width } = useThree((state) => state.viewport)
    const xW = w + gap
    return (
        <ScrollControls horizontal damping={0.1} pages={(width - xW + urls.length * xW) / width}>
            <Minimap />
            <Scroll>
                <Item index={0} position={new THREE.Vector3(0, 0, 0)} width={w}>
                    <Desktop position={[0, -1, -3]} />
                </Item>/
                <Item index={1} position={new THREE.Vector3(xW, 0, 0)} width={w}>
                    <Room position={[0, -5, -30]} />
                </Item>/
                <Item index={2} position={new THREE.Vector3(2*xW, 0, 0)} width={w}>
                    <RedcareStation position={[0, -2, -6]} />
                </Item>/
            </Scroll>
        </ScrollControls>
    )
}


// Helper component to render Items to a texture using Drei's <RenderTexture>

const App: FC = () => {
    const meshRef = useRef()
    // const [hovered, hover] = useState(false)
    // const [clicked, click] = useState(false)
    // const [active, setActive] = useState(false);

    return (
        <group>
            <color attach="background" args={['#ffffff']} />
            <ambientLight intensity={1} />

            <Items />
            <OrbitControls enableZoom={false} />
        </group>
    )
}

export default App
