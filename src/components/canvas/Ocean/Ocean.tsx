import * as THREE from "three";
import { A11y } from "@react-three/a11y";
import { useEffect, useRef } from "react";
import { Edges, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";

import vertex from "./shaders/ocean.vert";
import fragment from "./shaders/ocean.frag";
import { MeshToonMaterial, Vector2 } from "three";

// THREE.ShaderLib.phong.fragmentShader


// https://catlikecoding.com/unity/tutorials/flow/waves/
// https://github.com/claytercek/Breezy/blob/master/src/subjects/Water.js

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: 0xa1f9ff,
    depthBuffer: null,
    cameraNear: 0.1,
    cameraFar: 1000.0,
    screenSize: new THREE.Vector2(0.0,0.0)
  },
  vertex,
  fragment
);

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
ColorShiftMaterial.key = THREE.MathUtils.generateUUID();

extend({ ColorShiftMaterial });


const Ocean = ({ ...props }) => {
  const mesh = useRef(null);
  const mesh2 = useRef(null);
  const [colorMap] = useTexture([
    'water.jpeg'
  ])
  const dpr = useThree((state) => state.viewport.dpr)
  const { width, height } = useThree((state) => state.size)

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
        mesh.current.material.uniforms.cameraNear.value = 0.1;
        mesh.current.material.uniforms.cameraFar.value = 1000.0;
        mesh.current.material.uniforms.screenSize.value = new THREE.Vector2(width*dpr, height*dpr);
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
          userData={{ depthWrite: false }}
        >
          {/* <Edges /> */}
          <planeBufferGeometry args={[10, 10, 100, 100]} />
          {/* @ts-ignore */}
          <colorShiftMaterial key={ColorShiftMaterial.key} time={0} opacity={0.5} transparent depthBuffer={props.depthBuffer} />
        </mesh>
      </A11y>
      <A11y
        role="image"
        description={`Ocean`}
      >
        <mesh
        ref={mesh2}
        userData={{ depthWrite: false }}
        >
          <planeBufferGeometry args={[100, 100, 1, 1]} />
          {/* @ts-ignore */}
          <meshToonMaterial color={0x73d5d9} opacity={0.5} transparent  />
        </mesh>
      </A11y>
      <ambientLight />
    </>
  );
};
export default Ocean;
