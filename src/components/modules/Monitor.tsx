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
import CameraControl from '../common/CameraControl'

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
    // const ref_b = useRef()
    const a_light = useRef()
    const plane = useRef()
    const bg = useRef()
  const scroll = useScroll()
    const portal = useRef<THREE.Material>(null)
    
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const click = () => (state.clicked = index === clicked ? null : index)
  const over = () => hover(true)
    const out = () => hover(false)
    

    const w = width * GOLDEN_RATIO;
    const h = width;
    useFrame((state, delta) => {
      
    const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
    // easing.damp3(ref.current.scale, [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 + y, 1], 0.15, delta)
    // ref.current.material.scale[0] = ref.current.scale.x
    // ref.current.material.scale[1] = ref.current.scale.y
    // if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
    // if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
    // if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
        // easing.damp(ref.current.material, 'grayscale', hovered || clicked === index ? 0 : Math.max(0, 1 - y), 0.15, delta)

    if (portal.current && ref.current && a_light.current && plane.current) {
        // portal.current.intensity = hovered || clicked === index ? 10 : 1;
        // ref.current.blur = hovered ? 0.4 : 3
        // ref.current.position.x = position[0] + 2
        const targetScale = y / 5 + 1; // normal to 1
        // width = width * y;

        easing.damp(ref.current.scale, "x", targetScale, 0.15, delta)
        easing.damp(ref.current.scale, "y", targetScale, 0.15, delta)
        easing.damp(ref.current.scale, "z", targetScale, 0.15, delta)
        // easing.damp(ref_b.current.scale, "x", targetScale, 0.15, delta)
        // easing.damp(ref_b.current.scale, "y", targetScale, 0.15, delta)
        // easing.damp(ref_b.current.scale, "z", targetScale, 0.15, delta)

        // const targetPositionZ = y;
        // easing.damp(ref.current.position, "z", targetPositionZ, 0.15, delta)
        // easing.damp(ref_b.current.position, "z", targetPositionZ -0.001, 0.15, delta)
        
        const new_plane = new THREE.PlaneGeometry(w * (1 +  y), h);
        plane.current.dispose();
        plane.current = new_plane;

        // easing.damp(ref_b.current.scale, "x", targetScale, 0.15, delta)
        easing.damp(a_light.current, "intensity", hovered ? 5 : 0, 1, delta)
        // TODO: change the color of plane geometry.
        // bg.current.material.color
        // easing.damp(portal.current, "blur", hovered ? 0.4 : 2, 0.25, delta)
    }
    // easing.dampC(portal.current.material.color, hovered || clicked === index ? 'white' : '#aaa', hovered ? 0.3 : 0.15, delta)
    })
    useCursor(hovered)

    //   return <Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
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
                transparent blur={0.1}
                // side={THREE.DoubleSide}
                color='white'>
                    <color attach='background' args={['white']} />
                    <ambientLight ref={a_light}  intensity={1} />
                    {children}
                    {/* <Gltf src="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf" position={[0, index/6, -3]} /> */}
                </MeshPortalMaterial>
            <Text name={index} fontSize={0.2} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
                /{index}
            </Text>
        </mesh>
        {/* <mesh ref={ref_b} name='{index}_b' position={[position.x, position.y, position.z-0.001]}>
            <planeGeometry args={[w + 0.05, h + 0.05]} />
            <meshBasicMaterial color="black" />
        </mesh> */}
    </group>

}


function Items({ w = 0.5}) {
    const gap = w * 0.2
    const { urls } = useSnapshot(state)
    const { width } = useThree((state) => state.viewport)
    const xW = w + gap
    const page_w = 0.541
    const page_h = 0.305
    return (
        <ScrollControls
            vertical={true}
            damping={0.1} pages={(width - xW + urls.length * xW) / width}>
            {/* <Minimap /> */}
            <mesh>
                <planeGeometry args={[page_w, page_h]}/>
                <meshStandardMaterial color='white'>
                    <RenderTexture attach="map">
                        <Scroll>
                            <Item index={0} position={new THREE.Vector3(-1.2, 1-xW, -0.5)} width={w}>
                                <Desktop position={[1, -2, -3]} />
                            </Item>/
                            <Item index={1} position={new THREE.Vector3(-1.2, 1, -0.5)} width={w}>
                                {/* <Room position={[0, -5, -30]} /> */}
                            </Item>/
                            <Item index={2} position={new THREE.Vector3( -1.2, 1+xW, -0.5)} width={w}>
                                <RedcareStation position={[0, 0, 0]} />
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
            <ambientLight intensity={10} />
            {/* <CameraControl></CameraControl> */}
            <Items />
        </group>
    )
}

export default MonitorDisplay
