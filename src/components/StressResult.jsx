import React from "react";
import { useLocation } from "react-router-dom";
import icon from "../assets/icon_arrow_left.svg";
import "./stress-result.css";

const RESULT_DATA = {
  1: { emoji: "😍", text: "현재 스트레스 신호가 거의 없어요." },
  2: { emoji: "😊", text: "가벼운 스트레스 신호가 보여요." },
  3: { emoji: "😐", text: "스트레스가 일상에 영향을 주기 시작했을 수 있어요." },
  4: { emoji: "😔", text: "스트레스가 꽤 높은 상태예요." },
  5: { emoji: "😢", text: "스트레스가 매우 높은 상태로 보여요." },
};

export const StressResult = ({ onConfirm, onBack }) => {
  const location = useLocation();
  const score = location.state?.score || 1;
  const data = RESULT_DATA[score] || RESULT_DATA[1];

  return (
    <div className="stress-result-container">
      <div className="onbording-steps">
        <div className="step active" />
        <div className="step active" />
        <div className="step active" />
      </div>

      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="confused-face" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span style={{ fontSize: "70px" }}>{data.emoji}</span>
      </div>

      <div className="result-card">
        <div className="score">{score}점</div>
        <div className="description">
          {data.text}
        </div>
      </div>

      <button className="button-confirm" onClick={onConfirm}>
        <div className="button-text">확인</div>
      </button>

      <div className="title">스트레스 레벨 결과</div>
    </div>
  );
};
