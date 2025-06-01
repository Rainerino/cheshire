import { useRef } from "react"
import * as THREE from "three"
import { Helper } from '@react-three/drei'

interface PointLightWShadowProps {
    position: THREE.Vector3,
    rotation: THREE.Euler | [number, number, number],
    intensity?: number,
    decay?: number,
    near?: number,
    far?: number,
    bias?: number
}
  
const PointLightWShadow: React.FC<PointLightWShadowProps> = ({
    position,
    rotation,
    intensity = 20,
    decay = 2,
    near = 0.1,
    far = 10,
    bias = -0.01,
}) => {
    return (
      <>
          <pointLight
            position={position}
            rotation={rotation}
            intensity={intensity}
            castShadow={true}
            decay={decay}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={far}
            shadow-camera-near={near}
            shadow-bias={bias}>
          <orthographicCamera attach='shadow-camera'>
            <Helper type={THREE.CameraHelper} />
          </orthographicCamera>
          </pointLight>
      </>
    )
};
  
export default PointLightWShadow