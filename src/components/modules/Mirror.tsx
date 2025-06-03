import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';

export default function Mirror(props) {
    return (
        <mesh {...props}>
            <planeGeometry args={[1, 1.3]} />
            <MeshReflectorMaterial
                resolution={2048}
                mixStrength={10}
                mirror={1}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
            />
        </mesh>
    );
    
} 
