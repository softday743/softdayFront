import React from "react";
import icon from "../assets/icon_arrow_left.svg";
import line from "../assets/line_dashed.svg"; // Using simplified asset
import "./signup-step2.css";

export const SignUpStep2 = ({ onNext, onBack }) => {
    return (
        <div className="signup-step2-container">
            <button className="button-next" onClick={onNext}>
                <div className="button-text">다음</div>
            </button>

            <div className="description">
                ‘이메일주소’으로 보내드린
                <br />
                인증번호를 입력해주세요.
            </div>

            <div className="resend-text">이메일을 받지 못했나요?</div>

            {/* Placeholder for verification input lines */}
            <div className="verification-lines">
                 {/* Repeated lines for visual match */}
                 <img className="line-item" alt="Line" src={line} />
                 <img className="line-item" alt="Line" src={line} />
                 <img className="line-item" alt="Line" src={line} />
                 <img className="line-item" alt="Line" src={line} />
                 <img className="line-item" alt="Line" src={line} />
            </div>

            <div className="header-text">인증번호를 입력해주세요</div>

            <div className="arrow-left" onClick={onBack} style={{ cursor: 'pointer' }}>
                <img className="icon" alt="Back" src={icon} />
            </div>
        </div>
    );
};
