import * as THREE from 'three'
import { useLocation, Link } from "wouter"
import { PerspectiveCamera, Text, CameraControls, useTexture, Html, useCursor, Decal, RenderTexture } from '@react-three/drei'
import { useState } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { useTranslation } from "react-i18next"

import handwritten_font from '/fonts/elegant_typewriter/ELEGANT TYPEWRITER Regular.ttf?url'
import handwritten_cn_font from '/fonts/Huiwenmincho-improved.ttf?url'
import lang_toggle from '../../lib/glb_const'



const GOLDEN = 1.618033988
const SIZE = 0.3;
const STARTING_HEIGHT = 0.3
const LINE_HEIGHT = 0.1;
const LIST_FONT_SIZE = 0.05;
export default function HomeNavPage({
  shift,
  setShift,
  ...props }) {
  const [location, setLocation] = useLocation()
  const [hovered, setHovered] = useState(false)
  const texture = useLoader(THREE.TextureLoader, '/textures/paper_light.jpg')
  const { t, i18n } = useTranslation();
  const [fontFamily, setFontFamily] = useState(handwritten_font);
  const [langFontFamily, setLangFontFamily] = useState(handwritten_cn_font);
  const on_click_callback = () => {
    console.log('click')
    // Ensure lang_toggle has the is_en property for TypeScript
    if (!('is_en' in lang_toggle)) {
      (lang_toggle as any).is_en = true;

      setFontFamily(handwritten_font);
    } else {
      lang_toggle.is_en = !lang_toggle.is_en;
    }

    if (lang_toggle.is_en) {
      i18n.changeLanguage("en")
      setFontFamily(handwritten_font);
      setLangFontFamily(handwritten_cn_font);
    } else {
      i18n.changeLanguage("ch")
      setFontFamily(handwritten_cn_font);
      setLangFontFamily(handwritten_font);
    }
  }


  useCursor(hovered)
  return (
    <group {...props}>
      <mesh
        // onPointerOver={(e) => setHovered(true)}
        // onPointerOut={(e) => setHovered(false)}
        receiveShadow>
        <planeGeometry args={[SIZE, SIZE * GOLDEN]} />
        <meshPhongMaterial
          roughness={1}
          map={texture} />
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
                font={langFontFamily}
                position={[0.5, -0.3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                anchorX="right"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => on_click_callback()} >
                {t("lang")}
              </Text>
              {/* <ambientLight intensity={1} /> */}
              <Text
                font={fontFamily}
                position={[0.5, -0.2, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                anchorX="right"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setShift(!shift)} >
                {t("switch")}
              </Text>
              <Text
                font={fontFamily}
                position={[0, 0.5, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                anchorX="center"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}>
                {t("welcome")}
              </Text>
              <Text
                font={fontFamily}
                anchorX="left"
                position={[-0.3, STARTING_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("/about")}>
                {t("about")}
              </Text>

              <Text
                font={fontFamily}
                position={[-.3, STARTING_HEIGHT - LINE_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                anchorX="left"
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                {t("projects")}
              </Text>

              <Text
                font={fontFamily}
                position={[-.3, STARTING_HEIGHT - LINE_HEIGHT * 2, 0]}
                fontSize={LIST_FONT_SIZE}
                anchorX="left"
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                {t("playground")}
              </Text>

              <Text
                font={fontFamily}
                position={[-.3, STARTING_HEIGHT - LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                anchorX="left"
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setLocation("~/projects")}>
                {t("credit")}
              </Text>


              <Text
                font={handwritten_font}
                position={[0, 0.8, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All work and no play made Jack a dull boy
              </Text>

              <Text
                font={handwritten_font}
                position={[0, 0.7, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All work and no play makes All a dull boy
              </Text>

              <Text
                font={handwritten_font}
                position={[-0.48, STARTING_HEIGHT + LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                AI
              </Text>
              <Text
                font={handwritten_font}
                position={[0.43, STARTING_HEIGHT + LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                dl boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.46, STARTING_HEIGHT + LINE_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.4, STARTING_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                dull boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.41, STARTING_HEIGHT - LINE_HEIGHT, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                ull boj
              </Text>
              <Text
                font={handwritten_font}
                position={[0.44, STARTING_HEIGHT - LINE_HEIGHT * 2, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                l boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0.47, STARTING_HEIGHT - LINE_HEIGHT * 3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                oy
              </Text>
              <Text
                font={handwritten_font}
                position={[-0.43, -0.2, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All play
              </Text>
              <Text
                font={handwritten_font}
                position={[-0.31, -0.3, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All work not play
              </Text>
              <Text
                font={handwritten_font}
                position={[-0.19, -0.4, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All work and play not makes
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.5, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#827f7f"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All works and no plays make Jack dull boys
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.6, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All work and no play makes John a dull boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.7, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All work and no play makes Jack a doll boy
              </Text>
              <Text
                font={handwritten_font}
                position={[0, -0.8, 0]}
                fontSize={LIST_FONT_SIZE}
                color="#5c5b5b"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                All play and no work makes Jack a dull boy
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </Decal>
        {/* <meshStandardMaterial color="white" side={THREE.DoubleSide} map={texture} /> */}
        {/* <Html
          center
          style={{ userSelect: 'none' }}
          transform
          scale={0.03}
          position={[-0.05, 0.1, 0]}

        >
          <div style={{ width: 10, height: 5 }}>
            <ul>
              <li>{`The current page is: ${location}`}</li>
              <li>
                <Link href="/home/about" >About</Link>
              </li>
              <li>
                <Link href="/projects" >Project</Link>
              </li>
              <li>
                <Link href="/credit" >Credit</Link>
              </li>
              <li>Milk</li>
            </ul>
          </div>
        </Html> */}
      </mesh>
    </group>
  )
}
