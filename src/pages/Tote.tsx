import { RedcareTote } from "../components/models/RedcareTote";
import { CapBottle } from "../components/sku/CapBottle";



export default  function ToteScene(props) {
    const POSITION_LIMITS = {
        width: 0.5,   // x: -1 to 1
        height: 0.5,  // y: 0 to 2
        length: 0.1,  // z: -1 to 1
    };
    function randomPosition() {
        return [
            Math.random() * POSITION_LIMITS.width - POSITION_LIMITS.width / 2,   // x
            Math.random() * POSITION_LIMITS.height,                              // y
            Math.random() * POSITION_LIMITS.length - POSITION_LIMITS.length / 2, // z
        ];
    }
    function randomRotation() {
        return [
            Math.random() * 2 * Math.PI, // x
            Math.random() * 2 * Math.PI, // y
            Math.random() * 2 * Math.PI  // z
        ];
    }
    return <group {...props}>
        {/* <CameraControl /> */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <AccumulativeShadows temporal frames={100} scale={10}>
            <RandomizedLight amount={8} position={[5, 5, 0]} />
        </AccumulativeShadows> */}
        {/* <PointLightWShadow
            position={new THREE.Vector3(0, 2.4, 0)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={2}
            decay={1}
            near={0.2}
            far={10}
        /> */}
        {/* <CameraControl /> */}
        <RedcareTote />
        <CapBottle
            position={randomPosition()}
            rotation={randomRotation()}
        />
        {/* <BaseSKU
            position={randomPosition()}
            rotation={randomRotation()}
            mesh_path='/models/sku/cap_bottle.glb'
        /> */}
        {/* <BaseSKU
            position={randomPosition()}
            rotation={randomRotation()}
            mesh_path='/models/sku/coffee.glb'
        />
        <BaseSKU
            position={randomPosition()}
            rotation={randomRotation()}
            mesh_path='/models/sku/lotion.glb'
        /> */}
        {/* <Coffee position={randomPosition()} />
        <InkBox position={randomPosition()} />
        <Mustard position={randomPosition()} /> */}
    </group>

}


