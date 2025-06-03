import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  PerspectiveCamera,
  useScroll,
  ScrollControls
} from '@react-three/drei'
import * as THREE from 'three'

import { RedcareBase } from '../components/models/RedcareBase'
import { RedcareStation } from '../components/models/RedcareStation'
import ToteScene from './Tote'
import { ABB1300 } from '../components/models/ABB1300'
import PointLightWShadow from '../components/common/PointLightWShadow'
import "./Covariant.css"
import CameraControl from '../components/common/CameraControl'

const CAMERA_POSITION = [
  [-0.3, 4.33, 1.76],
  [-0.3, 2.3, 2.3],
  [-2.63, 3.05, 3.65],
  [-2.07, 5.07, 2.11]
]
const CAMERA_LOOK_AT = [
  [-0.3, 0, 2.7],
  [-0.3, 0, 2.7],
  [1, 0.5, 1],
  [0, 0.5, 2.11],
]

const STATION_OFFSET = new THREE.Vector3(-0.9, 0, 1.8)
const STATION_ROTATION = new THREE.Euler(0, -Math.PI, 0)
const TOTE_OFFSET = new THREE.Vector3(0.556, 0.867, 0.725).add(STATION_OFFSET)

function CameraMovement() {
  const { camera } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    if (!scroll) return
    const t = Math.max(0, Math.min(1, scroll.offset))

    const posA = new THREE.Vector3().fromArray(CAMERA_POSITION[0])
    const posB = new THREE.Vector3().fromArray(CAMERA_POSITION[1])
    const posC = new THREE.Vector3().fromArray(CAMERA_POSITION[2])
    const posD = new THREE.Vector3().fromArray(CAMERA_POSITION[3])

    const tgtA = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[0])
    const tgtB = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[1])
    const tgtC = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[2])
    const tgtD = new THREE.Vector3().fromArray(CAMERA_LOOK_AT[3])

    const targetPosition = new THREE.Vector3()
    const targetLookAt = new THREE.Vector3()

    if (t < 1 / 3) {
      const localT = t * 3
      targetPosition.lerpVectors(posA, posB, localT)
      targetLookAt.lerpVectors(tgtA, tgtB, localT)
    } else if (t < 2 / 3) {
      const localT = (t - 1 / 3) * 3
      targetPosition.lerpVectors(posB, posC, localT)
      targetLookAt.lerpVectors(tgtB, tgtC, localT)
    } else {
      const localT = (t - 2 / 3) * 3
      targetPosition.lerpVectors(posC, posD, localT)
      targetLookAt.lerpVectors(tgtC, tgtD, localT)
    }

    camera.position.lerp(targetPosition, 0.1)
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    currentLookAt.lerp(targetLookAt, 1)
    camera.lookAt(currentLookAt)
  })
}

const CURRENT_TARGET = 0

function CovariantPage() {
  return (
    <group>
      <ScrollControls pages={3}>
          {/* <CameraControl /> */}
          <CameraMovement />
          <PerspectiveCamera
            makeDefault
            position={CAMERA_POSITION[CURRENT_TARGET]}
            fov={30}
          />
          <PointLightWShadow
            position={new THREE.Vector3(-0.35, 2.4, 2.5)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={2}
            decay={1}
            near={0.2}
            far={10}
          />
          <PointLightWShadow
            position={new THREE.Vector3(0, 2.3, 1.7)}
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            intensity={0.5}
            decay={1}
            near={0.2}
            far={10}
          />
          <RedcareBase
            position={STATION_OFFSET}
            rotation={STATION_ROTATION}
          />
          <RedcareStation
            position={STATION_OFFSET}
            rotation={STATION_ROTATION}
          />
          <ToteScene
            position={TOTE_OFFSET}
            rotation={STATION_ROTATION}
          />
          {/* <ABB1300
            position={STATION_OFFSET}
            rotation={STATION_ROTATION}
          /> */}
        </ScrollControls>
    </group>
  )
}

export default CovariantPage
