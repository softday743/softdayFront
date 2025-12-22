import React, { useEffect } from "react";
import activeIndicator from "../assets/active-indicator.svg";
import track from "../assets/track.svg";
import "./calculating.css";

export const Calculating = ({ onFinished, userName = "사용자" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
    }, 3000); // 3 seconds simulation
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="calculating-container">
      <div className="onbording-steps">
        <div className="step active" />
        <div className="step active" />
        <div className="step active" />
      </div>

      <div className="text-wrapper">
        {userName}님의 스트레스 수치를
        <br />
        계산하고 있어요
      </div>

      <div className="circular">
        <img className="track" alt="Track" src={track} />
        <img
          className="active-indicator"
          alt="Active indicator"
          src={activeIndicator}
        />
      </div>
    </div>
  );
};
