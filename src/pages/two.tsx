import Beach from "@/components/canvas/Beach/Beach";
import Ocean from "@/components/canvas/Ocean/Ocean";
import { Sky } from "@react-three/drei";
import dynamic from "next/dynamic";
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
    <div>
       <p>full stack ~ creative developer - consultant </p>
    </div>
    </>
  );
};

// Canvas/R3F components here
const R3F = () => {
  return (
    <>
      <gridHelper />
      <axesHelper />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <Ocean />
      <Beach />
      {/* <Box route="/" /> */}
    </>
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
