import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from "wouter";
import { Text, useCursor, Decal, useScroll, Scroll, useTexture, ScrollControls, RenderTexture, PerspectiveCamera } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { proxy, useSnapshot } from 'valtio'
import CurvedPlane from '../common/CurvedPlane'
import gsap from 'gsap'
import { Router, Route, Link } from "wouter";


const screen_state = proxy({ key: "" })

class ProjectInfo {
    constructor(color, title, path, url) {
        this.color = color
        this.title = title
        this.path = path
        this.url = url
    }
}

const project_infos = new Map([
    ["covariant",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Covariant',
            "/images/Covariant.jpg",
            '/covariant')],
    ["motion_metrics",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Motion Metrics',
            "/images/MotionMetrics.jpg",
            '/motion_metrics')],
    ["next",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Next',
            "/images/Next.jpg",
            '/next')],
])

const RADIUS = 1;
const PART = 3;
function Display({ position, rotation, w, h, ...props }) {
    const ref = useRef()
    const scroll = useScroll()
    const [hovered, setHovered] = useState(false)
    if (screen_state.key == '') {
        screen_state.key = "covariant"
    }
    const snap = useSnapshot(screen_state)
    const [location, setLocation] = useLocation();
    const texture = useTexture(project_infos.get(snap.key).path)
    useCursor(hovered)

    const handleClick = () => {
        const url = project_infos.get(screen_state.key).url
        setLocation(url);
    }
    useFrame((state, delta) => {
        if (!ref.current) return
        // Update screen_state.key based on scroll offset
        const offset = scroll.offset
        if (scroll.visible(0, 1 / PART, 0.01)) {
            screen_state.key = "covariant"
        } else if (scroll.visible(1 / PART, 1 / PART, 0.01)) {
            screen_state.key = "motion_metrics"
        } else {
            screen_state.key = "next"
        }

        ref.current.material.toneMapped = false

        if (!hovered) {
            const randomValue = Math.random() / 2 + 1.5
            ref.current.material.color.setScalar(randomValue)
        } else {
            gsap.to(ref.current.material.color, {
                r: 1, g: 1, b: 1, duration: 0.5, overwrite: true
            })
        }
        // project_infos.get(screen_state.key).title

    })

    return (
        <group {...props}>
            <CurvedPlane
                position={position}
                rotation={rotation}
                width={w}
                height={h}
                radius={RADIUS}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                // castShadow
                // receiveShadow
                dispose={null}
            >
            <Decal
                // debug
                ref={ref}
                position={[0, 0, RADIUS]}
                rotation={[0, Math.PI, 0]}
                scale={[w, h, 1]}
                map={texture}
            />
                
                {/* <Decal debug
                    position={[0, 0, 2]}
                    rotation={[0, Math.PI, 0]}
                    // scale={[w, h, 1]}
                >
                    <meshStandardMaterial roughness={1} transparent polygonOffset polygonOffsetFactor={-1}>
                        <RenderTexture attach="map" anisotropy={16}>
                            <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 1]} />
                            <ambientLight intensity={1} />
                            <Text ref={txt_ref}
                                position={[0.1, 0, 0]}
                                rotation={[0, Math.PI, 0]}
                                fontSize={0.05} color="red">
                                1231
                            </Text>
                        </RenderTexture>
                    </meshStandardMaterial>
                </Decal> */}
            </CurvedPlane>
        </group>
    )
}

export default function ProjectScreen({ position, rotation, w = 1, h = 1, ...props }) {
    return (
        <group {...props}>
            <ScrollControls prepend={true} damping={0.1} pages={PART}>
                <Display position={position} rotation={rotation} w={w} h={h} />
            </ScrollControls>
        </group>
    )
}

// Preload all project images
project_infos.forEach((value) => {
    useTexture.preload(value.path)
})
