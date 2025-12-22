import React from "react";
import icon from "../assets/icon_arrow_left.svg";
import "./signup-step4.css";

export const SignUpStep4 = ({ onNext, onBack }) => {
    return (
        <div className="signup-step4-container">
            <div className="arrow-left" onClick={onBack} style={{ cursor: 'pointer' }}>
                <img className="icon" alt="Back" src={icon} />
            </div>

            <div className="message-container">
                <div className="title">
                    회원가입 완료되었어요🎉
                </div>
                <div className="subtitle">
                    소프트데이를 시작하기 전<br />딱 세가지만 먼저 진행할게요!
                </div>
            </div>
            
            <button className="button-next" onClick={onNext}>
                <div className="button-text">다음</div>
            </button>
        </div>
    );
};
