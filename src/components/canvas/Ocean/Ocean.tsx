import * as THREE from "three";
import { A11y } from "@react-three/a11y";
import { useEffect, useRef } from "react";
import { Edges, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import vertex from "./shaders/ocean.vert";
import fragment from "./shaders/ocean.frag";


// https://catlikecoding.com/unity/tutorials/flow/waves/
// https://github.com/claytercek/Breezy/blob/master/src/subjects/Water.js

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.2, 0.025),
  },
  vertex,
  fragment
);

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
ColorShiftMaterial.key = THREE.MathUtils.generateUUID();

extend({ ColorShiftMaterial });



const Ocean = () => {
  const mesh = useRef(null);
  const mesh2 = useRef(null);
  const [colorMap] = useTexture([
    'water.jpeg'
  ])

  useEffect(()=>{
    mesh.current.rotation.x = -Math.PI/2.0;
    mesh.current.material.side = THREE.DoubleSide;
    mesh.current.material.uniforms.texture1 = {value : colorMap};

    mesh2.current.rotation.x = -Math.PI/2.0;
    mesh2.current.position.y -= 0.5;
  },[mesh, mesh2])

  useFrame((state, delta) => {

    if (mesh.current.material) {
      mesh.current.material.uniforms.time.value +=
        Math.sin(delta / 2) * Math.cos(delta / 2);
    }
  });

  return (
    <>
      <A11y
        role="image"
        description={`Ocean animation`}
      >
        <mesh
          ref={mesh}
        >
          <planeBufferGeometry args={[10, 10, 100, 100]} />
          {/* @ts-ignore */}
          <colorShiftMaterial key={ColorShiftMaterial.key} time={0}/>
        </mesh>
      </A11y>
      <A11y
        role="image"
        description={`Ocean`}
      >
        <mesh
        ref={mesh2}
        >
          <planeBufferGeometry args={[100, 100, 1, 1]} />
          {/* @ts-ignore */}
          <meshLambertMaterial color={new THREE.Color( 0xa1f9ff )}/>
        </mesh>
      </A11y>
      <ambientLight />
    </>
  );
};
export default Ocean;
