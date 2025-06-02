import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, SpotLight, EffectComposer, Autofocus, Select } from '@react-three/drei'
import * as THREE from 'three'
import { OldTV } from '../components/models/TV'
import { CouchTable } from '../components/models/CouchTable'
import { DoubleCouch } from '../components/models/DoubleCouch'
import { SingleCouch } from '../components/models/SingleCouch'
import ProjectScreen from '../components/modules/ProjectScreen'
import './Landing.css'
import gsap from 'gsap'

const CAMERA_START_POSITION = [0, 2.3, 8]
const CAMERA_FINISH_POSITION = [0, 1.7, 6]
const CAMERA_LOOK_AT = [0, -0.3, -6]
const EPS = 0.01

const isCameraAtPosition = (pos: THREE.Vector3, target: number[]) =>
    Math.abs(pos.x - target[0]) < EPS &&
    Math.abs(pos.y - target[1]) < EPS &&
    Math.abs(pos.z - target[2]) < EPS

function ProjectNavPage() {
    const { camera } = useThree()

    useFrame(() => {
        if (isCameraAtPosition(camera.position, CAMERA_START_POSITION)) {
            gsap.to(camera.position, {
                x: CAMERA_FINISH_POSITION[0],
                y: CAMERA_FINISH_POSITION[1],
                z: CAMERA_FINISH_POSITION[2],
                duration: 1.5,
                ease: 'power2.out',
            })
        }
    })

    return (
        <group>
            <OrbitControls
                target={new THREE.Vector3().fromArray(CAMERA_LOOK_AT)}
                enableDamping
                dampingFactor={0.03}
                enablePan={false}
                enableRotate={false}
                enableZoom={false}
            />
            <PerspectiveCamera
                makeDefault
                position={new THREE.Vector3().fromArray(CAMERA_START_POSITION)}
                fov={15}
            />
            <ambientLight intensity={0.1} />
            <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[20, 100]} />
                <meshPhongMaterial color="#202020" />
            </mesh>
            <EffectComposer multisampling={8} autoClear={false}>
                <Autofocus
                    mouse
                    smoothTime={0.15}
                    focusRange={0.00025}
                    bokehScale={8}
                    resolutionScale={0.5}
                    resolutionX={2048}
                    resolutionY={2048}
                />
            </EffectComposer>
            <fog attach="fog" args={['#202020', 5, 20]} />
            <Select enabled={false}>
                <SpotLight
                    castShadow
                    shadow-bias={-0.0001}
                    shadow-mapSize={[2048, 2048]}
                    position={[0, 5, -5]}
                    distance={70}
                    penumbra={0.4}
                    radiusTop={0.4}
                    radiusBottom={40}
                    angle={0.45}
                    attenuation={20}
                    anglePower={5}
                    intensity={300}
                    opacity={0.2}
                />
                <OldTV rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
                <DoubleCouch position={[-1.4, 0, 2]} rotation={[0, 0, 0]} />
                <SingleCouch position={[0.5, 0, 1.6]} rotation={[0, -Math.PI / 2, 0]} />
                <SingleCouch position={[0.5, 0, 0.1]} rotation={[0, -Math.PI / 2, 0]} />
                <CouchTable position={[0.75, 0, 1.3]} rotation={[0, -Math.PI / 2, 0]} />
            </Select>
            <ProjectScreen
                position={[-0.07, 0.885, -0.04]}
                rotation={[0, 0, 0]}
                w={0.51}
                h={0.4}
            />
        </group>
    )
}

export default ProjectNavPage
