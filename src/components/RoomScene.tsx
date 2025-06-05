import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import HomeNavPage from "../pages/HomeNav";
import * as THREE from 'three'
import { RedrumDoor } from "./modules/RedrumDoor";
import { Room2 } from "./models/Room2";
import { Desktop2 } from "./models/Desktop2";
import Curtain from "./models/Curtain";
import Mirror from "./modules/Mirror";
import { OverheadLamp } from "./modules/OverheadLamp";
import { useEffect, useMemo } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import CameraControls from 'camera-controls'
CameraControls.install({ THREE })
extend({ CameraControls })
    
const CAMERA_POSITION = [1.8, 1.9, 0]

const CAMERA_LOOK_AT = [0, 1.1, 1]


export default function RoomScene(props) {
  // Upon enter, fix the camera
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);
  const tgt_look = new THREE.Vector3(0, 1.1, 0)
  const tgt_pos = new THREE.Vector3(1.8, 1.9, 0);
  const cur_pos = new THREE.Vector3();

  useFrame((state, delta) => {
    // camera.position.set(...CAMERA_POSITION)
    // camera.lookAt(...CAMERA_LOOK_AT)
    controls.smoothTime = 0.25;
    controls.dollyTo(1.9, true);
    controls.draggingSmoothTime = 0.1
    // controls.dollyToCursor = false;
    // controls.minPolarAngle = -Math.PI / 5 + Math.PI / 2
    // controls.maxPolarAngle = -Math.PI / 18 + Math.PI / 2
    // controls.minAzimuthAngle = -Math.PI / 6 + Math.PI / 2
    // controls.maxAzimuthAngle = Math.PI / 6 + Math.PI / 2
    // controls.enabled = false;
    
    // // If position and look at are not in CAMERA_POSITION and CAMERA_LOOK_AT, and zoom = 1, smoothly animate to them

    // // Animate position
    controls.setTarget(
      tgt_look.x,
      tgt_look.y,
      tgt_look.z,
      true);
    controls.update(delta);
  })
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
        <PerspectiveCamera
          makeDefault
          position={new THREE.Vector3().fromArray(CAMERA_POSITION)}
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