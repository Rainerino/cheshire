import * as THREE from 'three'
import { useLocation, Link } from "wouter"
import { PerspectiveCamera, Text, CameraControls, useTexture, Html, useCursor, Decal, RenderTexture } from '@react-three/drei'
import { useState } from 'react'
import { useThree } from '@react-three/fiber'

import handwritten_font from '/fonts/handwritten.ttf?url'
import engineer_font from '/fonts/engineer.ttf?url'

const GOLDEN = 1.618033988
const SIZE = 0.3;

const LIST_FONT_SIZE = 0.05;
export default function HomeNavPage(props) {
  const [location, setLocation] = useLocation()
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)
  return (
    <group {...props}>
      <mesh
        // onPointerOver={(e) => setHovered(true)}
        // onPointerOut={(e) => setHovered(false)}
        receiveShadow>
        <planeGeometry args={[SIZE, SIZE * GOLDEN]} />
        <Decal
          // debug
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[SIZE, SIZE * GOLDEN, SIZE]}
        >
          {/* ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789! */}
          <meshStandardMaterial roughness={1} transparent polygonOffset polygonOffsetFactor={-1}>
            <RenderTexture attach="map" anisotropy={64}>
              <PerspectiveCamera makeDefault manual aspect={1 / GOLDEN} position={[0, 0, 2]} />
              {/* <ambientLight intensity={1} /> */}
              <Text
                font={handwritten_font}
                position={[0, 0.1, 0]}
                fontSize={LIST_FONT_SIZE}
                color="red"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("/about")}>
                About
              </Text>

              <Text
                font={handwritten_font}
                position={[0, 0, 0]}
                fontSize={LIST_FONT_SIZE}
                color="red"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                Projects
              </Text>

              <Text
                font={handwritten_font}
                position={[0, -0.1, 0]}
                fontSize={LIST_FONT_SIZE}
                color="red"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/credit")}>
                Credit
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </Decal>
        {/* <meshStandardMaterial color="white" side={THREE.DoubleSide} map={texture} /> */}
        {/* <Html
          center
          style={{ userSelect: 'none' }}
          transform
          scale={0.03}
          position={[-0.05, 0.1, 0]}

        >
          <div style={{ width: 10, height: 5 }}>
            <ul>
              <li>{`The current page is: ${location}`}</li>
              <li>
                <Link href="/home/about" >About</Link>
              </li>
              <li>
                <Link href="/projects" >Project</Link>
              </li>
              <li>
                <Link href="/credit" >Credit</Link>
              </li>
              <li>Milk</li>
            </ul>
          </div>
        </Html> */}
      </mesh>
    </group>
  )
}
