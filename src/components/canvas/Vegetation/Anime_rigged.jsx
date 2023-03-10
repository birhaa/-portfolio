/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from "three";


export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/anime_rigged.glb')
  const { actions } = useAnimations(animations, group)
  console.log(actions.metarigAction)

  useEffect(() => { 
    actions?.metarigAction.play()
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="metarig" position={[0, 0, -0.14]}>
          <primitive object={nodes.spine} />
          <primitive object={nodes.neutral_bone} />
          <primitive object={nodes.neutral_bone_1} />
          <primitive object={nodes.neutral_bone_2} />
          <primitive object={nodes.neutral_bone_3} />
          <skinnedMesh castShadow receiveShadow name="body" geometry={nodes.body.geometry} material={materials.Material} skeleton={nodes.body.skeleton} >
            <meshToonMaterial color={0xdebe97} side={THREE.DoubleSide}/>
          </skinnedMesh>
          <skinnedMesh castShadow receiveShadow name="shoes" geometry={nodes.shoes.geometry} material={materials.Material} skeleton={nodes.shoes.skeleton} >
            <meshToonMaterial color={0x97dec9} side={THREE.DoubleSide}/>
          </skinnedMesh>
          <skinnedMesh castShadow receiveShadow name="skirt" geometry={nodes.skirt.geometry} material={materials['Material.001']} skeleton={nodes.skirt.skeleton} />
          <skinnedMesh castShadow receiveShadow name="top" geometry={nodes.top.geometry} material={materials.Material} skeleton={nodes.top.skeleton} >
            <meshToonMaterial color={0x97dec9} side={THREE.DoubleSide}/>
          </skinnedMesh>
        </group>
        <mesh name="hair" geometry={nodes.hair.geometry} material={materials.Material} position={[-0.04, -0.01, -0.12]} rotation={[Math.PI / 2, 0, 0]} >
        <meshToonMaterial color={0x87672f} side={THREE.DoubleSide}/>
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/anime_rigged.glb')
