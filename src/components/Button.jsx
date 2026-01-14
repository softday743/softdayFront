import React from "react";
import "../styles/button.css";

export const Button = ({ className, text = "Button" }) => {
  return (
    <div className={`button ${className}`}>
      <div className="text-wrapper">{text}</div>
    </div>
  );
};
