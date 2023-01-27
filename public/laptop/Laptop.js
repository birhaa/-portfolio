/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: codyseibert (https://sketchfab.com/codyseibert)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/laptop-9a960986f0cc49f99a0afdfb486ec859
title: Laptop
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Laptop({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-0.36, 0.57, 0]} rotation={[0, 1.56, -Math.PI]} scale={[-0.03, 0.03, 0.03]}>
          <mesh geometry={nodes.computer_0.geometry} material={materials.Material} />
        </group>
        <group position={[-1.18, 0.38, 1.87]} />
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')