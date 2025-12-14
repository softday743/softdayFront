import React, { useState } from "react"; // useState 추가 (비밀번호 확인용)
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import { EyeOff } from "./EyeOff";
import "./signup-step3.css";

// 1. props에 data, onUpdate 추가
export const SignUpStep3 = ({ onNext, onBack, data, onUpdate }) => {
  const [confirmPw, setConfirmPw] = useState(""); // 비밀번호 확인용 로컬 상태

  const handleNext = () => {
    if (!data.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    // (선택사항) 비밀번호 확인 로직이 필요하다면 아래 주석 해제
    /*
        if (data.password !== confirmPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        */
    onNext();
  };

  return (
    <div className="signup-step3-container">
      {/* 다음 버튼에 handleNext 연결 */}
      <button className="button-next" onClick={handleNext}>
        <div className="button-text">회원가입</div>
      </button>

      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="header-text">비밀번호를 입력해주세요</div>

      <div className="sub-header">회원가입 마지막 절차예요!</div>

      <div className="label">비밀번호</div>
      <div className="input-container">
        {/* 2. 비밀번호 상태 연결 (data.password) */}
        <InputText
          className="input-group"
          text="비밀번호"
          type="password"
          value={data.password}
          onChange={(e) => onUpdate("password", e.target.value)}
        />
        <EyeOff className="eye-off-icon" />
      </div>

      <div className="input-container" style={{ marginTop: "15px" }}>
        {/* 3. 비밀번호 확인 입력 연결 */}
        <InputText
          className="input-group"
          text="비밀번호 확인"
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
        />
        <EyeOff className="eye-off-icon" />
      </div>
    </div>
  );
};
