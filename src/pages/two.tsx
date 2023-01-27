import Beach from "@/components/canvas/Beach/Beach";
import Ocean from "@/components/canvas/Ocean/Ocean";
import PalmTree from "@/components/canvas/Vegetation/PalmTree";
import Laptop from "@/components/canvas/Vegetation/Laptop";
import Chartest from "@/components/canvas/Vegetation/Chartest";
import Anime from "@/components/canvas/Vegetation/Anime1";
import Anime2 from "@/components/canvas/Vegetation/Anime2";
import Anime_Rigged from "@/components/canvas/Vegetation/Anime_rigged";
import Leaf from "@/components/canvas/Vegetation/Leafs_test";
import Leaf2 from "@/components/canvas/Vegetation/Leafs_test2";
import { Sky } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import { EffectComposer, Vignette, Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect'


function Effect() {
  const { gl, scene, camera, } = useThree()
  const effect = new OutlineEffect( gl, {
    defaultThickness: 0.0015,
    defaultColor: [ 0, 0, 0 ],
    defaultAlpha: 1.0,
    defaultKeepAlive: true // keeps outline material in cache even if material is removed from scene
   } );
  return useFrame((state) => {
    effect.render(scene, camera)
  }, 1)
}

const Box = dynamic(() => import("@/components/canvas/Box"), {
  ssr: false,
});

// DOM elements here
const DOM = () => {
  return (
    <>
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <h1>Birgitte Haavardsholm</h1>
    </div>
    </>
  );
};

// Canvas/R3F components here
const R3F = () => {
  const {scene, size } = useThree()
  const [objects, setObjects] = useState([])
  const originY = -4.5;
  return (
    <Suspense fallback={null}>
      <Effect/>
      {/* <gridHelper /> */}
      {/* <axesHelper /> */}
      {/* <fog attach="fog" color="white" near={100} far={1000} /> */}
      <Sky distance={10000} sunPosition={[0.0, -1.0, 100.0]} inclination={0.0} azimuth={1.0} />
      <Ocean />
      <Beach />
      <Laptop/>
      {/* <Chartest /> */}
      {/* <Anime2 scale={[0.2, 0.2, 0.2]} position={[0.0 ,0.285, 0]}/> */}
      <Anime_Rigged scale={[0.15, 0.15, 0.15]} position={[-0.2 ,0.11, originY+0.01]}/>
      <Leaf scale={[0.01, 0.01, 0.01]} position={[0.2 ,0.0, originY]}/>
      <Leaf scale={[0.01, 0.01, 0.01]} position={[0.6 ,0.0, originY + 2.0]}/>
      <Leaf scale={[0.01, 0.01, 0.01]} position={[1.0 ,0.0, originY + 1.0]}/>
      <Leaf2 scale={[0.005, 0.005, 0.005]} position={[-1.1 ,-0.2, originY -0.05]}/>
      {/* <mesh position={[0,3.0,0.0]}>
      <torusGeometry args={[1.8, 1.2, 48, 64]} />
      <meshBasicMaterial  />
      </mesh> */}
      <PalmTree pos={originY}/>
      {/* <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={1.0} />
        <Outline
          blendFunction={BlendFunction.ALPHA} // set this to BlendFunction.ALPHA for dark outlines
          patternTexture={null} // a pattern texture
          edgeStrength={5.0} // the edge strength
          pulseSpeed={0.0} // a pulse speed. A value of zero disables the pulse effect
          visibleEdgeColor={0x00000} // the color of visible edges
          hiddenEdgeColor={0x000000} // the color of hidden edges
          width={size.width} // render width
          height={size.height} // render height
          kernelSize={KernelSize.LARGE} // blur kernel size
          blur={false} // whether the outline should be blurred
          xRay={false} // indicates whether X-Ray outlines are enabled
        />
      </EffectComposer> */}
      {/* <Box route="/" /> */}

    {/* <mesh position = {[1.0, 1.0, 0.0]} receiveShadow castShadow >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh> */}
{/* '    <mesh receiveShadow castShadow position={[1, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[2, 2, 2]}>
      <planeBufferGeometry />
      <meshStandardMaterial color="green" />
    </mesh> */}

      <directionalLight castShadow position={[0.0, 8.0, 10.0]} color={0xfc6b03} intensity={2.0}/>
      {/* <directionalLight castShadow position={[0.0, -10.0, 0.0]} color={0x2082b3} intensity={2.1}/> */}
      {/* <ambientLight /> */}
    </Suspense>
  );
};

// We assume first component is DOM
// second component is Canvas/R3F
// You can even add more and just keep alternating if needed
export default function Page() {
  return (
    <>
      <DOM />
      <R3F />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Page two",
    },
  };
}
