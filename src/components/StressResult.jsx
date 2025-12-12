import React from "react";
import face from "../assets/confused-face.svg";
import "./stress-result.css";

export const StressResult = ({ onConfirm }) => {
    return (
        <div className="stress-result-container">
             <div className="onbording-steps">
                <div className="step active" />
                <div className="step active" />
                <div className="step active" />
            </div>

            <div className="confused-face">
                 <img src={face} alt="Face" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div className="result-card">
                <div className="result-text">
                    <br />
                    {/* Placeholder for dynamic content or empty as per design */}
                </div>
            </div>

            <div className="description">스트레스 상태 설명</div>

            <div className="score">2.5점</div>

            <button className="button-confirm" onClick={onConfirm}>
                <div className="button-text">확인</div>
            </button>

            <div className="title">스트레스 레벨 결과</div>
        </div>
    );
};
