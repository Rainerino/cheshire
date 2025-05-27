import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// @ts-ignore
// import desktop from './assets/models/room/Desktop.glb'


export function DesktopBasic() {
    const gltf = useLoader(GLTFLoader, desktop)
    return <primitive object={gltf.scene} />
  }
