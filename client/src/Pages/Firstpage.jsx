import React from "react";
import Section1 from "../Components/Firstpage/Section1";
import Section2 from "../Components/Firstpage/Section2";
import Section3 from "../Components/Firstpage/Section3";
import DotGrid from "../Utils/Dotgrid";

const Firstpage = () => {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "fixed" }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#000000"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div>
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </>
  );
};

export default Firstpage;
