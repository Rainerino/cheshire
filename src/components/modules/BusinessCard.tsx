import * as THREE from 'three'
import { useLocation, Link } from "wouter"
import { PerspectiveCamera, Text, CameraControls, useTexture, Html, useCursor, Decal, RenderTexture } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useTranslation } from "react-i18next"

import handwritten_font from '/fonts/caviar-dreams/CaviarDreams.ttf?url'
import handwritten_cn_font from '/fonts/HanyiSentyTang.ttf?url'
import lang_toggle from '../../lib/glb_const'



const GOLDEN = 1.618033988
const SIZE = 0.08;
const CH_SCALE = 1.05;
const FONT_SIZE = 0.1
export default function BusinessCard({ ...props }) {
    const texture = useLoader(THREE.TextureLoader, '/textures/paper_light.jpg')
    const { t, i18n } = useTranslation();
    const [fontFamily, setFontFamily] = useState(handwritten_cn_font);
    const [fontSize, setFontSize] = useState(FONT_SIZE);

    return (
        <group {...props}>
            <mesh
                // onPointerOver={(e) => setHovered(true)}
                // onPointerOut={(e) => setHovered(false)}
                receiveShadow>
                <planeGeometry args={[SIZE * GOLDEN, SIZE]} />
                <meshPhongMaterial
                    roughness={1}
                    map={texture}
                />
                <Decal
                    receiveShadow
                    // debug
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={[SIZE, SIZE * GOLDEN, SIZE]}
                >
                    {/* ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789! */}
                    <meshStandardMaterial
                        roughness={1}
                        transparent
                        polygonOffset
                        polygonOffsetFactor={-1}>
                        <RenderTexture attach="map" anisotropy={64}>
                            <PerspectiveCamera makeDefault manual aspect={1 / GOLDEN} position={[0, 0, 2]} />
                            {/* <ambientLight intensity={1} /> */}
                            <Text
                                font={fontFamily}
                                position={[0, 0.2, 0]}
                                fontSize={fontSize * (1 + GOLDEN)}
                                color="black"
                                anchorX="center"
                                 >
                                {t("name")}
                            </Text>
                            <Text
                                // font={fontFamily}
                                position={[0, 0.05, 0]}
                                fontSize={fontSize}
                                color="black"
                                anchorX="center"
                                 >
                                ----------------------------------
                            </Text>
                            <Text
                                font={fontFamily}
                                position={[0, -0.1, 0]}
                                fontSize={fontSize}
                                color="black"
                                anchorX="center"
                                 >
                                {t("title")}
                            </Text>
                            <Text
                                font={fontFamily}
                                position={[0, -0.25, 0]}
                                fontSize={fontSize}
                                color="black"
                                anchorX="center"
                                 >
                                albertyanyy@gmail.com
                            </Text>
                        </RenderTexture>
                    </meshStandardMaterial>
                </Decal>
            </mesh>
        </group>
    )
}
