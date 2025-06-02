import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Decal, Text, Image as ImageImpl, useScroll, Scroll, ContactShadows, useGLTF, Environment, Float, Html, OrbitControls, PerspectiveCamera, PivotControls, ScrollControls, useTexture, RenderTexture } from '@react-three/drei'
import { MathUtils } from 'three'
import CameraControl from '../common/CameraControl'
import { useLocation, Route, Link } from "wouter"
import { proxy, useSnapshot } from 'valtio'
import CurvedPlane from '../common/CurvedPlane'

import { useControls, folder, button } from "leva";

const screen_state = proxy({ key: "covariant" })
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



function Display({position, rotation, w, h, ...props}) {
    const ref = useRef()
    const scroll = useScroll()
    const [hovered, hover] = useState(false)
    const over = () => hover(true)
    const out = () => hover(false)
    const snap = useSnapshot(screen_state)
    const texture = useTexture(project_infos.get(snap.key).path)
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(1, 1);
    useFrame((state, delta) => {
        if (ref.current) {
            if (scroll.offset < 1/4) {
                screen_state.key = "covariant"
            }  else if (scroll.offset < 2/4){
                screen_state.key = "duoyi"
            } else if (scroll.offset < 3/4) {
                screen_state.key = "motion_metrics"
            } else {
                screen_state.key = "next"
            }
        }
        
    });
    return (
        <group {...props}>
            <CurvedPlane
            position={position}
            rotation={rotation}
            width={w}
            height={h}
            radius={2}
            dispose={null} castShadow receiveShadow >
                {/* <meshStandardMaterial color="white" /> */}
            <Decal ref={ref}
                // position-z={4.6
                    position={[0, 0, 2]}
                    rotation={[0, Math.PI, 0]}
                // texture={texture}
                // scale={[1, 1, 1]}
                scale={[w, h, 1]}
                map={texture}>

            </Decal>
            </CurvedPlane>
    </group>
    )


}



export default function ProjectScreen({position, rotation, w=1, h=1, ...props}) {
    return <group {...props}>
        {/* <CameraControl></CameraControl> */}
        <ScrollControls damping={0.1} pages={1} >
            <Scroll>
                <group>
                    <Display
                        position={position}
                        rotation={rotation}
                        w={w} h={h}
                    ></Display>
                    {/* <ProjectItem position={[0, 0, 0]} info={project_infos.get("covariant")} />
                    <ProjectItem position={[0, -1, 0]} info={project_infos.get("motion_metrics")} />
                    <ProjectItem position={[0, -2, 0]} info={project_infos.get("duoyi")} />
                <ProjectItem position={[0, -3, 0]} info={ project_infos.get("next")} /> */}
                </group>
            </Scroll>
        </ScrollControls>
    </group>
}

project_infos.forEach((value) => {
    useTexture.preload(value.path);
})

