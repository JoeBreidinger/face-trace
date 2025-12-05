import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 p0">
      <Tilt className="Tilt">
        <img
          src="brain.png"
          alt="logo"
          style={{
            width: "100px",
            height: "100px",
            glareEnable: true,
            glareColor: "rgba(255, 255, 255, 0.5)",
            glarePosition: "all",
          }}
        />
      </Tilt>
    </div>
  );
};

export default Logo;
