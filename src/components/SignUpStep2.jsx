import React, { useState } from "react"; // useState 포함
import icon from "../assets/icon_arrow_left.svg"; // [중요] 이 줄이 있어야 에러가 안 납니다!
import "./signup-step2.css";

export const SignUpStep2 = ({ onVerify, onBack, email }) => {
  const [code, setCode] = useState("");

  return (
    <div className="signup-step2-container">
      <div className="header-text">인증번호를 입력해주세요</div>

      <div className="description">
        ‘{email}’으로 보내드린
        <br />
        인증번호를 입력해주세요.
      </div>

      {/* 인증번호 입력 필드 */}
      <input
        style={{
          position: "absolute",
          top: "310px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          fontSize: "24px",
          letterSpacing: "10px",
          textAlign: "center",
          border: "none",
          borderBottom: "2px solid #ccc",
          outline: "none",
          background: "transparent",
        }}
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
      />

      <button className="button-next" onClick={() => onVerify(code)}>
        <div className="button-text">다음</div>
      </button>

      <div
        className="resend-text"
        style={{ cursor: "pointer" }}
        onClick={onBack}
      >
        이메일을 다시 입력하시겠습니까?
      </div>

      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        {/* 여기서 icon 변수를 사용하므로 상단 import 필수 */}
        <img className="icon" alt="Back" src={icon} />
      </div>
    </div>
  );
};
