import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Background() {
  const { scene } = useThree();

  useEffect(() => {
    // scene.background = new THREE.Color(#f0f0f0);
    return () => {
      scene.background = new THREE.Color('#f0f0f0');
    };
  }, [scene]);

  return (
    <>
      {/* Your scene content here */}
    </>
  );
}

export default Background;