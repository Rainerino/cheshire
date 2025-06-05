import React, {useEffect, useMemo, useRef} from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import CameraControls from 'camera-controls'
import * as THREE from 'three'
CameraControls.install({ THREE })
extend({ CameraControls })
import type { InstancedMesh, BufferGeometry} from 'three'
import {useConvexPolyhedron, useSphere} from '@react-three/cannon'
import { Debug, Physics, useCompoundBody, usePlane } from '@react-three/cannon'
import { Geometry } from 'three-stdlib'
import type { ConvexPolyhedronProps, PlaneProps, Triplet } from '@react-three/cannon'

function toConvexProps(bufferGeometry: BufferGeometry): [vertices: Triplet[], faces: Triplet[]] {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry)
    geo.mergeVertices()
    const vertices: Triplet[] = geo.vertices.map((v) => [v.x, v.y, v.z])
    const faces: Triplet[] = geo.faces.map((f) => [f.a, f.b, f.c])
    return [vertices, faces]
}

type CubeProps = Pick<ConvexPolyhedronProps, 'position' | 'rotation'> & {
    size: number
}
function Cone({ position, rotation, sides }: ConeProps) {
    const geometry = new THREE.ConeGeometry(0.1, 0.1, sides, 1)
    const args = useMemo(() => toConvexProps(geometry), [geometry])
    const [ref] = useConvexPolyhedron(() => ({ args, mass: 100, position, rotation }), useRef<THREE.Mesh>(null))

    return (
        <mesh castShadow {...{ geometry, position, ref, rotation }}>
            <coneGeometry args={[0.7, 0.7, sides, 1]} />
            <meshNormalMaterial />
        </mesh>
    )
}

function InstancedSpheres({ number = 100 }) {
    const [ref] = useSphere(
        (index) => ({
            args: [0.1],
            mass: 1,
            position: [Math.random() - 0.5,  index * 2 , Math.random() - 0.5 ],
        }),
        useRef<InstancedMesh>(null),
    )
    const colors = useMemo(() => {
        const array = new Float32Array(number * 3)
        const color = new THREE.Color()
        for (let i = 0; i < number; i++)
            color.setRGB(Math.random(), Math.random(), Math.random())
        return array
    }, [number])

    return (
        <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
            <sphereGeometry args={[0.1, 16, 16]}>
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
            </sphereGeometry>
            <meshPhongMaterial color={[Math.random(), Math.random(), Math.random()]} />
        </instancedMesh>
    )
}

const WALL_HEIGHT = 2;
const BOTTOM_WIDTH = 10;
const BOTTOM_LENGTH = 10;
const EPS = 0.1
function Plane(props: PlaneProps) {
    const [ref] = usePlane(() =>
        ({ type: 'Static', ...props }), useRef<THREE.Mesh>(null))
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[BOTTOM_WIDTH, BOTTOM_LENGTH]} />
            <shadowMaterial color="#171717" />
            <meshStandardMaterial />
        </mesh>
    )
}

function VerticalWall(props: PlaneProps) {
    const [ref] = usePlane(() =>
        ({ type: 'Static', ...props }), useRef<THREE.Mesh>(null))
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[BOTTOM_WIDTH, WALL_HEIGHT]} />
            <shadowMaterial color="#171717" />
            <meshStandardMaterial />
        </mesh>
    )
}
function HorizonWall(props: PlaneProps) {
    const [ref] = usePlane(() =>
        ({ type: 'Static', ...props }), useRef<THREE.Mesh>(null))
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[BOTTOM_LENGTH, WALL_HEIGHT]} />
            <shadowMaterial color="#171717" />
            <meshStandardMaterial />
        </mesh>
    )
}


export default function NextPage(props) {
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

    useFrame((state, delta) => {
        controls.enabled = true;
        controls.update(delta);
    });
    return (
        <group {...props}>
            <hemisphereLight intensity={0.35 * Math.PI} />
            <ambientLight intensity={5} />
            <Physics gravity={[0, -10, 0]}>
                <Debug color="black" scale={1.1}>
                {/* Bottom plane */}
                <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />

                {/* Four surrounding walls */}
                {/* Back wall */}
                <VerticalWall rotation={[0, 0, 0]} position={[0, WALL_HEIGHT/2, -BOTTOM_LENGTH/2-EPS]} />
                {/* Front wall */}
                <VerticalWall rotation={[0, Math.PI, 0]} position={[0, WALL_HEIGHT/2, BOTTOM_LENGTH/2+ EPS]} />
                {/* Left wall */}
                <HorizonWall rotation={[0, Math.PI / 2, 0]} position={[-BOTTOM_WIDTH/2-EPS, WALL_HEIGHT/2, 0]} />
                {/* Right wall */}
                <HorizonWall rotation={[0, -Math.PI / 2, 0]} position={[BOTTOM_WIDTH/2, WALL_HEIGHT/2, 0]} />

                <InstancedSpheres number={100}/>
                {/*<Cone position={[-1, 5, 0.5]} rotation={[0.1, 0.2, 0.1]} sides={6} />*/}
                {/*<Cone position={[-1, 6, 0]} rotation={[0.5, 0.1, 0.1]} sides={8} />*/}
                {/*<Cube position={[2, 3, -0.3]} rotation={[0.5, 0.4, -1]} size={0.4} />*/}
                {/*<Cone position={[-0.3, 7, 1]} rotation={[1, 0.4, 0.1]} sides={7} />*/}
                </Debug>
            </Physics>
            <Environment preset={"forest"} />

            <Grid infiniteGrid/>
            {/* Add 3D objects here if needed */}
        </group>
    )
} 

