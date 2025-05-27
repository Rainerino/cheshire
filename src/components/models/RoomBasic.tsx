import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// @ts-ignore
import room from '/models/room/Env.glb?url'


export function RoomBasic() {
    const gltf = useLoader(GLTFLoader, room)
    return <primitive object={gltf.scene} />
  }
