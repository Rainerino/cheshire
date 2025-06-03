import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import CurtainSimulation from '../../lib/curtain';
import * as THREE from 'three';

type CurtainProps = {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
};

const Curtain: React.FC<CurtainProps> = ({ position, rotation }) => {
    const curtainRef = useRef<CurtainSimulation>();

    // Initialize CurtainSimulation only once
    if (!curtainRef.current) {
        curtainRef.current = new CurtainSimulation(position, rotation);
    }

    useFrame((_, delta) => {
        curtainRef.current?.update(delta);
    });

    return (
        <group>
            <primitive object={curtainRef.current?.clothMesh} />
            {/* <primitive object={curtainRef.current?.sphereMesh} /> */}
        </group>
    );
};

export default Curtain;
