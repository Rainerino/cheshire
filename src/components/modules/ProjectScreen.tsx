import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Decal, Text, Image as ImageImpl, useScroll, Scroll, ContactShadows, useGLTF, Environment, Float, Html, OrbitControls, PerspectiveCamera, PivotControls, ScrollControls, useTexture, RenderTexture } from '@react-three/drei'
import { MathUtils } from 'three'
import CameraControl from '../common/CameraControl'
import { useLocation, Route, Link } from "wouter"
import { proxy, useSnapshot } from 'valtio'
import CurvedPlane from '../common/CurvedPlane'

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



function Display({position, info, ...props}) {
    const ref = useRef()
    const scroll = useScroll()
    const [hovered, hover] = useState(false)
    const over = () => hover(true)
    const out = () => hover(false)
    const og_position_y = position[1]
    const snap = useSnapshot(screen_state)
    const texture = useTexture(project_infos.get(snap.key).path)
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
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
                width={1}
                height={1}
                radius={4.6}
                dispose={null} castShadow receiveShadow >
                <meshStandardMaterial color="white" />
            <Decal debug ref={ref}
                position={[0, 0, 4.6]}
                rotation={[0, 0, 0]}
                // scale={[1, 1, 1]}
                map={texture}>
                <Text fontSize={0.1} color="black" position={[-0.3, 0.3, 4.61]}>
                    {project_infos.get(screen_state.key).title}
                </Text>
            </Decal>
        </CurvedPlane>
    </group>
    )


}



export default function ProjectScreen(props) {
    return <group>
        <ScrollControls damping={0.1} pages={1} >
            <Scroll>
                <group>
                    <Display position={[0, 0, 0]}></Display>
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