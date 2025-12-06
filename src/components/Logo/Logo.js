import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 mb0 p2">
      <Tilt
        className="Tilt br-100"
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        glareEnable={true}
        glareColor="rgba(245, 243, 243, 0.81)"
        glarePosition="all"
        glareMaxOpacity={0.45}
        glareBorderRadius="100%"
      >
        <img src="brain.png" alt="logo" />
      </Tilt>
    </div>
  );
};

export default Logo;
