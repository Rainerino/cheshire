import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useLocation } from "wouter";
import { useCursor, Decal, useScroll, Scroll, useTexture, ScrollControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { proxy, useSnapshot } from 'valtio'
import CurvedPlane from '../common/CurvedPlane'
import gsap from 'gsap'
import { Router, Route, Link } from "wouter";

const screen_state = proxy({ key: "covariant" })

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
            "/images/Covariant.jpg", '/projects/covariant')],
    ["motion_metrics",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Motion Metrics',
            "/images/MotionMetrics.jpg",
            '/projects//motion_metrics')],
    ["duoyi",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'DuoYi',
            "/images/DuoYi.jpg",
            '/projects//duoyi')],
    ["next",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Next',
            "/images/Next.jpg",
            '/projects//next')],
])

function Display({ position, rotation, w, h, ...props }) {
    const ref = useRef()
    const scroll = useScroll()
    const [hovered, setHovered] = useState(false)
    const snap = useSnapshot(screen_state)
    const [location, setLocation] = useLocation();
    const texture = useTexture(project_infos.get(snap.key).path)
    useCursor(hovered)
    const handleClick = () => {
        const url = project_infos.get(screen_state.key).url
        setLocation(url);
    }
    useFrame(() => {
        if (!ref.current) return

        // Update screen_state.key based on scroll offset
        const offset = scroll.offset
        if (offset < 0.25) screen_state.key = "covariant"
        else if (offset < 0.5) screen_state.key = "duoyi"
        else if (offset < 0.75) screen_state.key = "motion_metrics"
        else screen_state.key = "next"

        ref.current.material.toneMapped = false

        if (!hovered) {
            const randomValue = Math.random() / 2 + 1.5
            ref.current.material.color.setScalar(randomValue)
        } else {
            gsap.to(ref.current.material.color, {
                r: 1, g: 1, b: 1, duration: 0.5, overwrite: true
            })
        }
    })

    return (
        <group {...props}>
            <CurvedPlane
                position={position}
                rotation={rotation}
                width={w}
                height={h}
                radius={2}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                castShadow
                receiveShadow
                dispose={null}
            >
                <Decal
                    ref={ref}
                    position={[0, 0, 2]}
                    rotation={[0, Math.PI, 0]}
                    scale={[w, h, 1]}
                    map={texture}
                />
            </CurvedPlane>
        </group>
    )
}

export default function ProjectScreen({ position, rotation, w = 1, h = 1, ...props }) {
    return (
        <group {...props}>
            <ScrollControls damping={0.1} pages={1}>
                <Scroll>
                    <Display position={position} rotation={rotation} w={w} h={h} />
                </Scroll>
            </ScrollControls>
        </group>
    )
}

// Preload all project images
project_infos.forEach((value) => {
    useTexture.preload(value.path)
})
