import {MeshReflectorMaterial} from '@react-three/drei';

export default function Mirror(props) {
    return (
        <mesh {...props}>
            <planeGeometry args={[0.8, 1.1]}/>
            <MeshReflectorMaterial
                resolution={2048}  //2048
                mixStrength={5}
                mirror={1}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
            />
        </mesh>
    );

} 
