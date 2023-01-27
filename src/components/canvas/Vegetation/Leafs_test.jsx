/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { Edges, useGLTF } from '@react-three/drei'
import * as THREE from "three";


export default function Leaf({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/leafs_test.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Howea_f__A001_1.geometry} material={materials.Material__0} >
          <meshToonMaterial color={0x917060} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Howea_f__A001_2.geometry} material={materials.Material__1} >
        <meshToonMaterial color={0x6fb089} side={THREE.DoubleSide} />
        <Edges scale={1.0} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/leafs_test.glb')
