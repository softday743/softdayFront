import React from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import "./signup-step1.css";

export const SignUpStep1 = ({ onNext, onBack, data, onUpdate }) => {
  return (
    <div className="signup-step1-container">
      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="text-wrapper">회원가입</div>

      <div className="label">아이디</div>
      <InputText
        className="input-group"
        text="아이디를 입력해주세요"
        value={data.username}
        onChange={(e) => onUpdate("username", e.target.value)}
      />

      <div className="label">이메일</div>
      <InputText
        className="input-group"
        text="이메일(example@gmail.com)"
        value={data.email}
        onChange={(e) => onUpdate("email", e.target.value)}
      />

      {/* 버튼 클릭 시 onNext(handleSendEmail) 실행 */}
      <button className="button-next" onClick={onNext}>
        <div className="button-text">인증번호 받기</div>
      </button>
    </div>
  );
};
