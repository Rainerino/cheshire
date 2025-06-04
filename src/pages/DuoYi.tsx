import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function DuoYiPage(props) {

    return (
        <group {...props}>
            {/* <OrbitControls />
            <PerspectiveCamera makeDefault /> */}
            <Grid infiniteGrid/>
                {/* Add 3D objects here if needed */}
        </group>
    )
} 

