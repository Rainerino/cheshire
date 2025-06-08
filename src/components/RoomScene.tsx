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
import { Route, useLocation } from "wouter";
import AboutScene from "./AboutScene";
    
const CAMERA_POSITION = [1.8, 2., 0]
const CAMERA_LOOK_AT = [0, 1.1, 0]

const PAGE_ANGLE = Math.PI / 6.5;
const LOOKAT_EPS = 0.00001;
const HOME_POSITION = [0.077, 1.5, 0.218]
const HOME_LOOK_AT = [0.077 - LOOKAT_EPS * Math.cos(PAGE_ANGLE), 0, 0.218 + LOOKAT_EPS * Math.sin(PAGE_ANGLE)]

export default function RoomScene(props) {
  // Upon enter, fix the camera
  const [shift, setShift] = useState(true);
  const [location, setLocation] = useLocation();
  const [mycam, setMycam] = useState<THREE.PerspectiveCamera | null>();
  const [hovered, setHovered] = useState(false)
  const [enableMouse, setEnableMouse] = useState(false)
  const [initialize, setInitialize] = useState(false)
  useCursor(hovered)

  const ref = useRef<CameraControls>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.smoothTime = 0.25;
    setShift(true)
    ref.current.setLookAt(
      HOME_POSITION[0],
      HOME_POSITION[1],
      HOME_POSITION[2],
      HOME_LOOK_AT[0],
      HOME_LOOK_AT[1],
      HOME_LOOK_AT[2],
      false
    )

  }, [ref]);
  useFrame((state, delta) => {
    if (!ref.current) return;

    // console.log(ref.current.camera.position)

    // console.log(homeClickedRef.current)


    ref.current.smoothTime = 0.5;
    if (location === "/home") {
      ref.current.zoomTo(1, false);
    } else {
      setEnableMouse(false)
    }

    if (shift) {
      ref.current.disconnect();

      // Make sure the first frame is not transitioned.
      if (!initialize) {
        setInitialize(true)
        setEnableMouse(false)
      }

      ref.current.setLookAt(
        HOME_POSITION[0],
        HOME_POSITION[1],
        HOME_POSITION[2],
        HOME_LOOK_AT[0],
        HOME_LOOK_AT[1],
        HOME_LOOK_AT[2],
        initialize
      )

    } else {
      const eps = 0.1;
      const dist = ref.current.camera.position.distanceTo(
        new THREE.Vector3(CAMERA_POSITION[0]
          , CAMERA_POSITION[1]
          , CAMERA_POSITION[2]))
      console.log(dist)


      if (!enableMouse) {
        if (dist > eps) {
      // Arrived at target position
      // You can trigger any logic here if needed
          ref.current.setLookAt(
            CAMERA_POSITION[0],
            CAMERA_POSITION[1],
            CAMERA_POSITION[2],
            CAMERA_LOOK_AT[0],
            CAMERA_LOOK_AT[1],
            CAMERA_LOOK_AT[2],
            true
          )
          console.log("?????????")
        } else {
          setEnableMouse(true);
          ref.current.connect(state.gl.domElement);
        }
      } else {
        console.log("???ASD")

        ref.current.dollySpeed = 0;
        ref.current.truckSpeed = 0;
        ref.current.azimuthRotateSpeed = 1;
        ref.current.polarRotateSpeed = 0.5;

        ref.current.minPolarAngle = -Math.PI / 5 + Math.PI / 2
        ref.current.maxPolarAngle = -0.01 + Math.PI / 2
        ref.current.minAzimuthAngle = -Math.PI / 6 + Math.PI / 2
        ref.current.maxAzimuthAngle = Math.PI / 6 + Math.PI / 2
      }

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
            shift={shift}
            setShift={setShift}
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
            shadow-mapSize={[1024, 1024]}
            shadow-camera-fov={120}
            // shadow-camera-far={100}
            // shadow-camera-near={0.1}
            position={[-2.25, 1, -2.245]}
            intensity={0.8}>
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
          </pointLight>
          <OverheadLamp position={[-1, 2.5, -0.4]} />

        </Route>

      </group>
    )
}