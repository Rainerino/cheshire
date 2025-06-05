import React, { useEffect, useMemo, useReducer, useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Grid, Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import ProjectScreen from '../components/modules/ProjectScreen';
CameraControls.install({ THREE })
extend({ CameraControls })


export default function DuoYiPage(props) {
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);
   
    const timeDivRef = React.useRef<HTMLDivElement>(null);
    const mesh_ref = useRef();

    useEffect(() => {
        controls.camera.add(mesh_ref.current)
    }, [])
    useFrame((state, delta) => {
        controls.enabled = true;
        controls.mouseButtons.middle = CameraControls.ACTION.NONE;
        controls.mouseButtons.wheel = CameraControls.ACTION.NONE;
        controls.mouseButtons.left = CameraControls.ACTION.ROTATE;
        controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
        controls.update(delta)
        // controls.minZoom = 0;
        // controls.maxZoom = 0;
        // controls.update(delta);

        if (timeDivRef.current) {
            timeDivRef.current.textContent = new Date().toLocaleTimeString();
        }
        
    });

    return (
        <group {...props}>
            {/* <OrbitControls /> */}
            {/* <PerspectiveCamera makeDefault /> */}
            <Grid infiniteGrid />
            {/* <ProjectScreen
                position={[-0.07, 0.885, -0.04]}
                rotation={[0, 0, 0]}
                w={0.51}
                h={0.4}
            /> */}
            <mesh ref={mesh_ref}  position={[0, 0, -1]}>
                <boxGeometry args={[0.4, 0.2, 0.05]} />
                {/* <meshStandardMaterial color="orange" /> */}
                <Html center distanceFactor={3}>
                    <div
                        ref={timeDivRef}
                        style={{
                            background: 'rgba(255,255,255,0.5)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            color: '#222',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                    >
                        {/* Initial text, will be updated */}
                        {new Date().toLocaleTimeString()}
                    </div>
                </Html>
            </mesh>
                {/* Add 3D objects here if needed */}
        </group>
    )
} 

