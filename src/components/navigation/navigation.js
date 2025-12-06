import React from "react";
import Logo from "../Logo/Logo";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
      }}
    >
      <div onClick={() => onRouteChange("home")} className="pointer">
        <Logo />
      </div>
      <p
        onClick={() => onRouteChange("signout")}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  ) : (
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
      <div className="right-align" style={{ display: "flex", gap: "1rem" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </div>
    </nav>
  );
};

export default Navigation;
