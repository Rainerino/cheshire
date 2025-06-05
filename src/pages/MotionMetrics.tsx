import React, { useMemo } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { CAT6080 } from '../components/models/CAT_6080';
import CameraControls from 'camera-controls'
import * as THREE from 'three'
CameraControls.install({ THREE })
extend({ CameraControls })

export default function MotionMetricsPage(props) {
 const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

    useFrame((state, delta) => {
        controls.enabled = true;
      controls.update(delta);
    });
    return (
        <group {...props}>
            {/* <OrbitControls />
            <PerspectiveCamera makeDefault /> */}
            <Environment 
            files="/textures/snow_field_1k.hdr"
            background
            backgroundBlurriness={0.1}
            backgroundIntensity={0.5} 
            />
            <CAT6080 />
            <Grid infiniteGrid/>
                {/* Add 3D objects here if needed */}
        </group>
    )
} 

