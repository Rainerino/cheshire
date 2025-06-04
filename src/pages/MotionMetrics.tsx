import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import CameraControl from '../components/common/CameraControl';
import { CAT6080 } from '../components/models/CAT_6080';

export default function MotionMetricsPage(props) {

    return (
        <group {...props}>
            <CameraControl />
            {/* <OrbitControls />
            <PerspectiveCamera makeDefault /> */}
            <Environment preset='city' />
            <CAT6080 />
            <Grid infiniteGrid/>
                {/* Add 3D objects here if needed */}
        </group>
    )
} 

