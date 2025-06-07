import * as THREE from 'three'
import { useLocation, Link } from "wouter"
import { PerspectiveCamera, Text, CameraControls, useTexture, Html, useCursor, Decal, RenderTexture } from '@react-three/drei'
import { useState } from 'react'
import { useLoader, useThree } from '@react-three/fiber'

import handwritten_font from '/fonts/elegant_typewriter/ELEGANT TYPEWRITER Regular.ttf?url'
import handwritten_cn_font from '/fonts/Huiwenmincho-improved.ttf?url'
const GOLDEN = 1.618033988
const SIZE = 0.3;
const STARTING_HEIGHT = 0.3
const LINE_HEIGHT = 0.1;
const LIST_FONT_SIZE = 0.05;
export default function HomeNavPage(props) {
  const [location, setLocation] = useLocation()
  const [hovered, setHovered] = useState(false)
  const texture = useLoader(THREE.TextureLoader, '/textures/paper_light.jpg')
  useCursor(hovered)
  return (
    <group {...props}>
      <mesh
        // onPointerOver={(e) => setHovered(true)}
        // onPointerOut={(e) => setHovered(false)}
        receiveShadow>
        <planeGeometry args={[SIZE, SIZE * GOLDEN]} />
        <meshPhongMaterial
          roughness={1}
          map={texture} />
        <Decal
          // debug
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[SIZE, SIZE * GOLDEN, SIZE]}
        >
          {/* ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789! */}
          <meshStandardMaterial
            roughness={1}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}>
            <RenderTexture attach="map" anisotropy={64}>
              <PerspectiveCamera makeDefault manual aspect={1 / GOLDEN} position={[0, 0, 2]} />
              {/* <ambientLight intensity={1} /> */}
              <Text
                font={handwritten_font}
                position={[0, 0.5, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("/about")}>
                Welcome to my page
              </Text>
              <Text
                font={handwritten_font}
                position={[-0.2, STARTING_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("/about")}>
                About me
              </Text>

              <Text
                font={handwritten_font}
                position={[-.2, STARTING_HEIGHT - LINE_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                Projects
              </Text>

              <Text
                font={handwritten_font}
                position={[-.17, STARTING_HEIGHT - LINE_HEIGHT * 2, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                Playground
              </Text>

              <Text
                font={handwritten_font}
                position={[-.23, STARTING_HEIGHT - LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                Credit
              </Text>


              <Text
                font={handwritten_cn_font}
                position={[0.3, -0.2, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/credit")}>
                语言:中
              </Text>


              <Text
                font={handwritten_font}
                position={[0, 0.8, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All work and no play made Jack a dull boy
              </Text>

              <Text
                font={handwritten_font}
                position={[0, 0.7, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All work and no play makes All a dull boy
              </Text>

              <Text
                font={handwritten_font}
                position={[-0.48, STARTING_HEIGHT + LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                AI
              </Text>
              <Text
                font={handwritten_font}
                position={[0.43, STARTING_HEIGHT + LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                dl boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.46, STARTING_HEIGHT + LINE_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.4, STARTING_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                dull boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.41, STARTING_HEIGHT - LINE_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                ull boj
              </Text>
              <Text
                font={handwritten_font}
                position={[0.44, STARTING_HEIGHT - LINE_HEIGHT * 2, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                l boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.47, STARTING_HEIGHT - LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                oy
              </Text>
              <Text
                font={handwritten_font}
                position={[-0.33, -0.2, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All work and not
              </Text>
              <Text
                font={handwritten_font}
                position={[-0.31, -0.3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All work not play
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.4, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All work and play not makes Jack a dull boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.5, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All works and no plays make Jack dull boys
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.6, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All work and no play makes John a dull boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.7, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All work and no play makes Jack a doll boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.8, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                All play and no work makes Jack a dull boy
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
