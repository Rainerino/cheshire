import * as THREE from 'three'
import { useLocation, Link } from "wouter"
import { useTexture, Html } from '@react-three/drei'

export default function HomePage(props) {
  const [location] = useLocation()
  const texture = useTexture('/textures/paper.jpg')

  return (
    <group {...props}>
      <mesh receiveShadow>
        <planeGeometry args={[0.3 * 0.618, 0.3]} />
        <meshStandardMaterial color="white" side={THREE.DoubleSide} map={texture} />
        <Html
          style={{ userSelect: 'none' }}
          transform
          scale={0.03}
          position={[-0.05, 0.1, 0]}
        >
          <div style={{ width: 10, height: 5 }}>
            <ul>
              <li>{`The current page is: ${location}`}</li>
              <li>
                <Link href="/about" className="active">About</Link>
              </li>
              <li>
                <Link href="/project" className="active">Project</Link>
              </li>
              <li>
                <Link href="/credit" className="active">Credit</Link>
              </li>
              <li>Milk</li>
            </ul>
          </div>
        </Html>
      </mesh>
    </group>
  )
}
