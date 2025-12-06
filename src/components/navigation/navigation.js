import React from "react";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
      }}
    >
      <div onClick={() => window.location.reload()} className="pointer">
        <Logo />
      </div>
      <p
        onClick={() => onRouteChange("signin")}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
