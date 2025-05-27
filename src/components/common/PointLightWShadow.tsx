import { useRef } from "react"
import * as THREE from "three"

interface PointLightWShadowProps {
    position: THREE.Vector3,
    rotation: THREE.Euler | [number, number, number],
    intensity: number
}
  
const PointLightWShadow: React.FC<PointLightWShadowProps> = ({
    position,
    rotation,
    intensity = 20
}) => {
    return (
      <>
          <pointLight
            position={position}
            rotation={rotation}
            intensity={intensity}
            castShadow={true}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={10}
            shadow-camera-near={0.1}
            shadow-bias={-0.01}>
          </pointLight>
      </>
    )
};
  
export default PointLightWShadow