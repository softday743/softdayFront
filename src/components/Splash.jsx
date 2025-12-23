import React from "react";
import logo from "../assets/1.png";
import "./splash.css";

export function Splash({ onClick }) {
  return (
    <div className="splash-container" onClick={onClick}>
      <div className="splash-logo-container">
        <img src={logo} alt="Softday Logo" className="splash-logo" />
      </div>
    </div>
  );
}
