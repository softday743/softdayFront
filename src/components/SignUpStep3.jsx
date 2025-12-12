import React from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import { EyeOff } from "./EyeOff";
import "./signup-step3.css";

export const SignUpStep3 = ({ onNext, onBack }) => {
    return (
        <div className="signup-step3-container">
            <button className="button-next" onClick={onNext}>
                <div className="button-text">회원가입</div>
            </button>

            <div className="arrow-left" onClick={onBack} style={{ cursor: 'pointer' }}>
                <img className="icon" alt="Back" src={icon} />
            </div>

            <div className="header-text">비밀번호를 입력해주세요</div>

            <div className="sub-header">회원가입 마지막 절차예요!</div>

            <div className="label">비밀번호</div>
            <div className="input-container">
                <InputText className="input-group" text="비밀번호" type="password" />
                <EyeOff className="eye-off-icon" />
            </div>

            <div className="input-container" style={{ marginTop: '15px' }}>
                <InputText className="input-group" text="비밀번호 입력" type="password" />
                <EyeOff className="eye-off-icon" />
            </div>
        </div>
    );
};
