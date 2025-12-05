import React from "react";
import Logo from "../Logo/Logo";

const Navigation = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
      }}
    >
      <Logo />
      <p
        className="f3 link dim black underline pa3 pointer"
        style={{ marginLeft: "auto" }}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
