import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { useFrame, useLoader, useThree } from '@react-three/fiber' 
import { Physics, usePlane, useBox } from '@react-three/cannon'
import CurtainSimulation from '../../lib/curtain';
import * as THREE from 'three';

type CurtainProps = {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
  };

  
function Curtain({position, rotation}: CurtainProps) {
    const [curtain, setCurtain] = useState(new CurtainSimulation(position, rotation));

    useFrame((state, delta, xrFrame) => {
        curtain.update(delta);
    });
    
    return (
        <group>
            <primitive object={curtain.clothMesh} />
            {/* <primitive object={curtain.sphereMesh} /> */}
        </group>
    )
}


export default Curtain
