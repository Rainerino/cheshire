import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Grid, OrbitControls, PerspectiveCamera, CameraControls, Box } from '@react-three/drei';
import * as THREE from 'three'

import type { InstancedMesh, BufferGeometry } from 'three'
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Geometry } from 'three-stdlib'
import { RedcareTote } from '../models/RedcareTote';
import { Coffee } from '../sku/Coffee';
import { InkBox } from '../sku/InkBox';
import { Lotion } from '../sku/Lotion';
import { PaperBox } from '../sku/PaperBox';
import { CapBottle } from '../sku/CapBottle';
import { Mustard } from '../sku/Mustard';
import { TonerBox } from '../sku/TonerBox';
import { MultuCapBottle } from '../sku/MutliCapBottle';
import { PencilCase } from '../sku/PencilCase';


const WALL_HEIGHT = 2 / 2;
const BOTTOM_WIDTH = 0.58 / 2;
const BOTTOM_LENGTH = 0.38 / 2;
const WALL_THICKNESS = 0.02;
const EPS = 0.001
const HEIGHT_OFFSET = 0.3

export default function ToteScene(props) {
    const controls = useRef(null);
    const [isPaused, togglePaused] = useState(true)
    return (
        <group {...props}>
            {/* <CameraControls ref={controls} />
            <hemisphereLight intensity={0.35 * Math.PI} />
            <ambientLight intensity={5} /> */}
            <RedcareTote onClick={() => togglePaused((value) => !value)} />
            <Physics
                paused={isPaused}
                // debug
                gravity={[0, -10, 0]}
                colliders="hull">
                {/* Bottom */}
                <CuboidCollider position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[BOTTOM_WIDTH, BOTTOM_LENGTH, WALL_THICKNESS]} />
                {/* Side front and back */}
                <CuboidCollider position={[0, WALL_HEIGHT, -BOTTOM_LENGTH - WALL_THICKNESS]} rotation={[0, 0, 0]} args={[BOTTOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS,]} />
                <CuboidCollider position={[0, WALL_HEIGHT, BOTTOM_LENGTH + WALL_THICKNESS]} rotation={[0, 0, 0]} args={[BOTTOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS,]} />

                {/* Side left and right */}
                <CuboidCollider position={[-BOTTOM_WIDTH - WALL_THICKNESS, WALL_HEIGHT, 0]} rotation={[0, Math.PI / 2, 0]} args={[BOTTOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS,]} />
                <CuboidCollider position={[BOTTOM_WIDTH + WALL_THICKNESS, WALL_HEIGHT, 0]} rotation={[0, -Math.PI / 2, 0]} args={[BOTTOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS,]} />
                <RigidBody position={[0, 0.5, 0]}>
                    <PaperBox />
                </RigidBody>
                <RigidBody position={[0, 0.7, 0]}>
                    <Coffee />
                </RigidBody>
                <RigidBody position={[0, 0.9, 0]}>
                    <MultuCapBottle />
                </RigidBody>
            </Physics>
            {/* Add 3D objects here if needed */}
        </group>
    )
}

