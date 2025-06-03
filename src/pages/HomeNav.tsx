import * as THREE from 'three'
import { useLocation, Link } from "wouter"
import { useTexture, Html, useCursor } from '@react-three/drei'
import { useState } from 'react'
import { useThree } from '@react-three/fiber'

export default function HomeNavPage(props) {
  const [location] = useLocation()
  const texture = useTexture('/textures/paper.jpg')
  const [hovered, setHovered] = useState(false)
  const { invalidate } = useThree()
  invalidate()
  useCursor(hovered)
  return (
    <group {...props}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        receiveShadow>
        <planeGeometry args={[0.3 * 0.618, 0.3]} />
        
        {/* <meshStandardMaterial color="white" side={THREE.DoubleSide} map={texture} /> */}
        <Html
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
                <Link href="/about" >About</Link>
              </li>
              <li>
                <Link href="/projects/home" >Project</Link>
              </li>
              <li>
                <Link href="/credit" >Credit</Link>
              </li>
              <li>Milk</li>
            </ul>
          </div>
        </Html>
      </mesh>
    </group>
  )
}
