import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import HomeNavPage from "../pages/HomeNav";
import * as THREE from 'three'
import { RedrumDoor } from "./modules/RedrumDoor";
import { Room2 } from "./models/Room2";
import { Desktop2 } from "./models/Desktop2";
import Curtain from "./models/Curtain";
import Mirror from "./modules/Mirror";
import { OverheadLamp } from "./modules/OverheadLamp";
    
    
const CAMERA_POSITION = [
  [1.8, 1.9, 0],
  [0.12, 1.25, 0.175]
]

const CAMERA_LOOK_AT = [0, 1.1, 0]


export default function RoomScene(props) {
    return (
        <group {...props}>
                <HomeNavPage 
          position={[0.1, 0.87, 0.5]} 
          rotation={[-Math.PI / 2, 0, Math.PI / 2 + Math.PI / 5]} 
          scale={[1, 1, 1]} 
        />
        <Environment 
          files="/textures/satara_night_no_lamps_1k.hdr"
          background
          backgroundBlurriness={0.1}
          backgroundIntensity={0.5} 
        />
        {/* <Environment preset='night' /> */}
        {/* <CameraControl /> */}
        <OrbitControls
          target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT)}
          enableDamping
          dampingFactor={0.05}
          enablePan={false}
          enableZoom={false}
          // enableRotate={false}
          minPolarAngle={-Math.PI / 5 + Math.PI / 2}
          maxPolarAngle={-Math.PI / 18 + Math.PI / 2}
          // minAzimuthAngle={-Math.PI / 6 + Math.PI / 2}
          // maxAzimuthAngle={Math.PI / 6 + Math.PI / 2}
        />
        <PerspectiveCamera
          makeDefault
          position={new THREE.Vector3().fromArray(CAMERA_POSITION[0])}
          fov={25}
        />
        <ambientLight intensity={0.05} />
        <Room2 position={[-1.5, 0, 0]} rotation={[0, Math.PI, 0]} />
        <RedrumDoor />
        <Desktop2 position={[-0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Curtain
          position={new THREE.Vector3(-2.45, 1.7, -0.6)}
          rotation={new THREE.Euler(0, -Math.PI / 2, 0)} 
        />
        {/* Curtain and Mirror are conflicted somehow */}
        <Mirror
            position={[1, 1, 1.3]}
            rotation={[0, Math.PI / 17 + Math.PI, 0]}
        />
        <fog attach="fog" args={['#202020', 5, 20]} />
        <pointLight
          color={'#f7e7ba'}
          castShadow
          decay={2}
          shadow-bias={-0.00001}
          shadow-mapSize={[512, 512]}
          shadow-camera-fov={120}
          // shadow-camera-far={100}
          // shadow-camera-near={0.1}
          position={[-2.25, 1, -2.245]}
          intensity={0.8}>     
       {/* <orthographicCamera attach='shadow-camera'>
          <Helper type={THREE.CameraHelper} />
        </orthographicCamera> */}
        </pointLight>
        <pointLight
          color={'#f7e7ba'}
          castShadow
          decay={2}
          shadow-bias={-0.00001}
          shadow-mapSize={[1024, 1024]}
          // shadow-camera-far={100}
          // shadow-camera-near={0.1}
          position={[0.775, 1.1, -2.245]}
          intensity={2}>         
        {/* <orthographicCamera attach='shadow-camera'>
          <Helper type={THREE.CameraHelper} />
        </orthographicCamera> */}
        </pointLight>
        <OverheadLamp position={[0, 2.5, 0]} />
        
    </group>
    )
}