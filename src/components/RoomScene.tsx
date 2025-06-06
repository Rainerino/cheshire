import { CameraControls, Environment, OrbitControls, PerspectiveCamera, useCursor } from "@react-three/drei";
import HomeNavPage from "./modules/HomePaper";
import * as THREE from 'three'
import { RedrumDoor } from "./modules/RedrumDoor";
import { Room2 } from "./models/Room2";
import { Desktop2 } from "./models/Desktop2";
import Curtain from "./models/Curtain";
import Mirror from "./modules/Mirror";
import { OverheadLamp } from "./modules/OverheadLamp";
import { useEffect, useMemo, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Route } from "wouter";
import AboutScene from "./AboutScene";
    
const CAMERA_POSITION = [1.8, 1.9, 0]
const CAMERA_LOOK_AT = [0, 1.1, 0]

const PAGE_ANGLE = Math.PI / 6.5;
const LOOKAT_EPS = 0.00001;
const HOME_POSITION = [0.077, 1.5, 0.218]
const HOME_LOOK_AT = [0.077 - LOOKAT_EPS * Math.cos(PAGE_ANGLE), 0, 0.218 + LOOKAT_EPS * Math.sin(PAGE_ANGLE)]

export default function RoomScene(props) {
  // Upon enter, fix the camera
  const [shift, setShift] = useState(true);
  const [mycam, setMycam] = useState<THREE.PerspectiveCamera | null>();
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const ref = useRef<CameraControls>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.smoothTime = 0.25;
    setShift(true)
    // ref.current.camera.lookAt(new THREE.Vector3(HOME_LOOK_AT[0], HOME_LOOK_AT[1], HOME_LOOK_AT[2]));

  }, [ref]);
  useFrame((state, delta) => {
    if (!ref.current) return;

    // console.log(ref.current.camera.position)
    ref.current.zoomTo(1, false);
    // console.log(homeClickedRef.current)
    if (shift) {
      // ref.current.enabled = false;
      ref.current.disconnect();
      ref.current.setLookAt(
        HOME_POSITION[0],
        HOME_POSITION[1],
        HOME_POSITION[2],
        HOME_LOOK_AT[0],
        HOME_LOOK_AT[1],
        HOME_LOOK_AT[2],
        true
      )
    } else {
      ref.current.connect(state.gl.domElement);
      // ref.current.disconnect();
      // ref.current.smoothTime = 1.0;
      // ref.current.azimuthRotateSpeed = 3;
      // ref.current.polarRotateSpeed = 1;
      // ref.current.boundaryFriction = 1
      // // ref.current.dollyToCursor = false;
      // ref.current.minPolarAngle = -Math.PI / 5 + Math.PI / 2
      // ref.current.maxPolarAngle = -Math.PI / 18 + Math.PI / 2
      // ref.current.minAzimuthAngle = -Math.PI / 6 + Math.PI / 2
      // ref.current.maxAzimuthAngle = Math.PI / 6 + Math.PI / 2
      // ref.current.maxZoom = 1.2;
      // // ref.current.minZoom = 0.3;
      // ref.current.dollySpeed = 0.5;
      // ref.current.minDistance = 1;
      // ref.current.maxDistance = 2.5;
      // ref.current.infinityDolly = false;

      ref.current.setLookAt(
        CAMERA_POSITION[0],
        CAMERA_POSITION[1],
        CAMERA_POSITION[2],
        CAMERA_LOOK_AT[0],
        CAMERA_LOOK_AT[1],
        CAMERA_LOOK_AT[2],
        true
      )
    }

  })
    return (
      <group {...props}>
        <Route path="/home" nest>
          <Route path="/about" >
            <AboutScene controls={ref} />
          </Route>

          <HomeNavPage
            position={[0.11, 0.87, 0.2]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2 + Math.PI / 6.5]}
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
            ref={setMycam}
            makeDefault
            position={new THREE.Vector3().fromArray(HOME_POSITION)}
            // lookAt={new THREE.Vector3().fromArray(HOME_LOOK_AT)}
            fov={25}
          />
          {mycam && <CameraControls ref={ref} camera={mycam} />}
          <ambientLight intensity={0.05} />
          <Room2 position={[-1.5, 0, 0]} rotation={[0, Math.PI, 0]} />
          <RedrumDoor />
          <Desktop2
            // onPointerOver={() => setHovered(true)}
            // onPointerOut={() => setHovered(false)}
            // onClick={(e) => setShift(!shift)}
            position={[-0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
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

        </Route>

      </group>
    )
}