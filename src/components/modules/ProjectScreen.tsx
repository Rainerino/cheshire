import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useScroll, Scroll, ContactShadows, useGLTF, Environment, Float, Html, OrbitControls, PerspectiveCamera, PivotControls, ScrollControls } from '@react-three/drei'
import { MathUtils } from 'three'
import CameraControl from '../common/CameraControl'
import { useLocation, Route, Link } from "wouter"
import { proxy, useSnapshot } from 'valtio'

class ProjectInfo {
    constructor(color, title, path, url) {
        this.color = color
        this.title = title
        this.path = path
        this.url = url
    }
}

const project_infos = new Map();
project_infos.set("covariant", new ProjectInfo(new THREE.Color(0x2185d0), 'Covariant', "/images/Covariant.jpg", '/covariant'));
project_infos.set("motion_metrics", new ProjectInfo(new THREE.Color(0x2185d0), 'Motion Metrics', "/images/MotionMetrics.jpg", '/motion_metrics'));
project_infos.set("duoyi", new ProjectInfo(new THREE.Color(0x2185d0), 'DuoYi', "/images/DuoYi.jpg", '/duoyi'));
project_infos.set("next", new ProjectInfo(new THREE.Color(0x2185d0), 'Next', "/images/Next.jpg", '/next'));

// Each item would have: url to go to, title (project name), picture path, background color
function ProjectItems({ ...props}) {
    const ref = useRef(project_infos.get("covariant"))
    const scroll = useScroll()
    const [hovered, hover] = useState(false)
    const over = () => hover(true)
    const out = () => hover(false)

    useFrame((state, delta) => {
        console.log(ref.current.path)
        console.log(scroll.offset)
        const s = scroll.offset;
        if (s < 1 / 4) {
            ref.current = project_infos.get("covariant");
        } else if (s < 2 / 4) {
            ref.current = project_infos.get("motion_metrics");
        } else if (s < 3 / 4) {
            ref.current = project_infos.get("duoyi");
        } else {
            ref.current = project_infos.get("next");
        }
    });
    return <group {...props}>
        <mesh>
            <planeGeometry args={[5, 5]} />
            <Html
                // occlude="true"
                transform
                position={[0, 0, 0.01]}
                style={{ userSelect: 'none' }}>
                <div
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{ width: '500px', height: "500px", position: 'relative' }}
                >
            <img src={ref.current.path}
                style={{ width: '100%', display: 'block' }}
                onPointerOver={over} onPointerOut={out} />
            <div
                style={{
                position: 'absolute',
                top: 8,
                left: 8,
                color: 'white',
                background: 'rgba(0,0,0,0.5)',
                padding: '4px 8px',
                borderRadius: 4,
                fontWeight: 'bold',
                fontSize: '1rem',
                pointerEvents: 'none'
                }}
            >
                {ref.current.title}
                    </div>
                    </div>
        </Html>
        </mesh>
    </group>
}


export default function ProjectScreen(props) {
    return <group>
        <ScrollControls damping={0.1} pages={3} >
            <Scroll>
                <ProjectItems />
            </Scroll>
        </ScrollControls>
    </group>
}