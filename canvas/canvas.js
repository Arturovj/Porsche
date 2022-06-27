import { Suspense } from "react";
import styled from "styled-components";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";



import Porsche from "../components/Porsche";

export default function PorscheCanvas() {
  return (
    <div className="" >
    <Wrapper className="">
      <Canvas clasName="canvas">
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
        <ambientLight intensity={6} />
        <spotLight intensity={9} angle={20} penumbra={0.01} position={[-10,20,-5]} castShadow></spotLight>
        <directionalLight position={[-2, 5, 2]} />
        <Suspense fallback={null}>
           <Porsche /> 
        </Suspense>
      </Canvas>
    </Wrapper>
    </div>
 
  );
}

const Wrapper = styled.div`
  position: relative;
 
  canvas {
    min-height: 500px;
    height: 500px;
  }
`;
