import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { CameraControls, Environment, Grid, OrbitControls, PerspectiveCamera, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { CAT6080 } from '../components/models/CAT_6080';

export default function MotionMetricsPage({ ...props }) {
  // const cam_ref = useRef()
  const data = useScroll()
  const ref = useRef()
  const cameraControlRef = useRef<CameraControls | null>(null);
    useFrame((state, delta) => {
      // cameraControlRef.current.enabled = false;
      console.log(data?.offset)
      // controls.update(delta);
      // controls.mouseButtons.wheel = CameraControls.ACTION.NONE
      // // controls.rotate(45 * THREE.MathUtils.DEG2RAD, 0, true)
      // // console.log(controls.camera.position)
      // cameraControlRef.connect(gl.domElement)
      // cameraControlRef.current.disconnect()
    });
    return (
      <group {...props}>
        {/* <PerspectiveCamera makeDefault /> */}
        {/* <CameraControls ref={cameraControlRef}></CameraControls> */}
        <ScrollControls pages={3} damping={0.1}>
          <CAT6080 ref={ref} />
        </ScrollControls>


        <Environment
            files="/textures/minedump_flats_1k.hdr"
            background
            backgroundBlurriness={0.1}
          backgroundIntensity={0.5}
        />

        <Grid infiniteGrid />
      </group>
    )
} 

