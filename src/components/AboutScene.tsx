import { Box } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useMemo, useRef, useState } from "react";
import * as THREE from 'three'

const CAMERA_LOOK_AT = [0, 1.1, 0]
export default function AboutPage(controls, props) {
    const tgt_look = new THREE.Vector3(1.15, 1.1, 1.6)
    const tgt_pos = new THREE.Vector3(-0.5, 1.4, -1.2);
    const cur_look = new THREE.Vector3()
    const cur_pos = new THREE.Vector3();

    useFrame((state, delta) => {
        // Update camera position and tgt_look at based on the current time
        // Animate camera zoom manually since GSAP can't tween Three.js camera properties directly
        // if (camera.zoom !== 3) {
        //     camera.zoom += (3 - camera.zoom) * 0.05;
        //     camera.updateProjectionMatrix();
        // }
        controls.controls.current.disconnect();
        controls.controls.current.smoothTime = 0.25;
        // async function complexTransition() {
        // await controls.setPosition(1.8, 1.9, 0, true);
        // controls.controls.current.setPosition(
        //     tgt_pos.x,
        //     tgt_pos.y,
        //     tgt_pos.z, true
        // )
        // controls.controls.current.setTarget(
        //     tgt_look.x,
        //     tgt_look.y,
        //     tgt_look.z, true
        // )
        controls.controls.current.lerpLookAt(
            tgt_pos.x,
            tgt_pos.y,
            tgt_pos.z,
            tgt_look.x,
            tgt_look.y,
            tgt_look.z,
            state.camera.position.x,
            state.camera.position.y,
            state.camera.position.z,
            cur_look.x,
            cur_look.y,
            cur_look.z,
            0.,
            true
        )

        // complexTransition().then(() => {
        //     console.log('Transition completed');
        // });

        const eps = 0.1;

        const arrived = state.camera.position.distanceTo(tgt_pos) < eps;
        if (arrived) {
            controls.controls.current.smoothTime = 0.01;
            // controls.controls.current.zoomTo(4.5, true)
            controls.controls.current.smoothTime = 0.25;
            // Arrived at target position
            // You can trigger any logic here if needed
        }

    })
    return null;
}