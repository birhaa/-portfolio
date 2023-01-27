import * as THREE from "three";
import SimplexNoise from 'simplex-noise';
import { A11y } from "@react-three/a11y";
import { useEffect, useRef, useState } from "react";


// https://github.com/claytercek/Breezy/blob/master/src/subjects/Water.js


const Beach = () => {
  const mesh = useRef(null);
  const [isInit, init] = useState(false)

  const peak = 0.1;
  const smoothing = 5.0;
  const simplex = new SimplexNoise('2');


  useEffect(()=>{
    if(!isInit){
      mesh.current.material.side = THREE.DoubleSide;

      const vertices = mesh.current.geometry.attributes.position.array;
      for (let i = 0; i <= vertices.length; i += 3) {
        vertices[i+2] = peak * simplex.noise2D(
            vertices[i] / smoothing,
            vertices[i+1] / smoothing);
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
      mesh.current.geometry.computeVertexNormals();

      mesh.current.rotateY(Math.PI/2.0);
      mesh.current.rotateX(Math.PI*7.0/16.0);
      init(true)
    }

  },[mesh, isInit])

  return (
    <>
      <A11y
        role="image"
        description={`Beach mesh`}
      >
        <mesh
          ref={mesh}
          receiveShadow
        >
          <planeBufferGeometry args={[10, 10, 100, 100]}  />
          <meshToonMaterial color={0xffcaad}/>
        </mesh>
      </A11y>
    </>
  );
};
export default Beach;
