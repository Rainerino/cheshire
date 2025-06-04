import { Box } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useMemo, useRef, useState } from "react";
import * as THREE from 'three'
import CameraControls from 'camera-controls'
CameraControls.install({ THREE })
extend({ CameraControls })

const CAMERA_LOOK_AT = [0, 1.1, 0]
export default function AboutPage(props) {
    const tgt_look = new THREE.Vector3(1.15, 1.1, 1.6)
    const tgt_pos = new THREE.Vector3(-0.5, 1.4, -1.2);
    const cur_look = new THREE.Vector3()
    const cur_pos = new THREE.Vector3();
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const controls = useMemo(() => {
        return new CameraControls(camera, gl.domElement);
    }, [camera, gl.domElement]);

    useFrame((state, delta) => {
        // Update camera position and tgt_look at based on the current time
        // Animate camera zoom manually since GSAP can't tween Three.js camera properties directly
        // if (camera.zoom !== 3) {
        //     camera.zoom += (3 - camera.zoom) * 0.05;
        //     camera.updateProjectionMatrix();
        // }
        // controls.zoomTo(1, false);
        controls.getPosition(cur_pos, false)
        controls.getTarget(cur_look, false);
        console.log(cur_pos)
        controls.smoothTime = 1;
        // controls.setLookAt(
        //     tgt_pos.x,
        //     tgt_pos.y,
        //     tgt_pos.z,
        //     tgt_look.x,
        //     tgt_look.y,
        //     tgt_look.z,
        //     true);

        controls.lerpLookAt(
            tgt_pos.x,
            tgt_pos.y,
            tgt_pos.z,
            tgt_look.x,
            tgt_look.y,
            tgt_look.z,
            cur_pos.x,
            cur_pos.y,
            cur_pos.z,
            cur_look.x,
            cur_look.y,
            cur_look.z,
            0.0, 
            true
        )
        
        const eps = 0.1;

        const arrived = cur_pos.distanceTo(tgt_pos) < eps;
        if (arrived) {
            controls.smoothTime = 0.01;
            controls.zoomTo(4.5, true)
            controls.smoothTime = 0.25;
            // Arrived at target position
            // You can trigger any logic here if needed
        }

        
        controls.update(delta)

        // gsap.to(camera.position, {
        //     duration: 1,
        //     x: tgt_look.x,
        //     y: tgt_look.y,
        //     z: tgt_look.z,
        //     onUpdate: () => {
        //         state.camera.lookAt(tgt_look)
        //     }
        // })
        // gsap.to(state.camera.position, {
        //     duration: 3,
        //     x: -0.6,
        //     y: 1.2,
        //     z: -1.1, 
        //     ease: 'power2.out',
        //     onComplete: () => {
        //         gsap.to(state.camera, {
        //             duration: 0.5,
        //             zoom: 3,
        //             ease: 'power2.out',
        //             onUpdate: () => {
        //                 // state.camera.updateProjectionMatrix();
        //             },
        //         });
        //     }
        // });




    })
    return null;
}