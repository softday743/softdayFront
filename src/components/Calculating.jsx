import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import activeIndicator from "../assets/active-indicator.svg";
import track from "../assets/track.svg";
import "../styles/home/calculating.css";

export const Calculating = ({ onFinished, userName = "사용자" }) => {
  const location = useLocation();
  const score = location.state?.score;

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished(score);
    }, 3000); // 3 seconds simulation
    return () => clearTimeout(timer);
  }, [onFinished, score]);

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
