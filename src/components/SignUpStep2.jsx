import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import line from "../assets/line_dashed.svg"; // Using simplified asset
import "../styles/onboarding/signup-step2.css";
import { InputText } from "./InputText";
import api from "../api/axiosConfig";

export const SignUpStep2 = ({ onNext, onBack, data }) => {
  const [showModal, setShowModal] = useState(false);

  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (!code) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      // 인증번호 검증 요청
      await api.post("/auth/verify-code", {
        email: data.email,
        code: code,
      });

      alert("이메일 인증이 완료되었습니다.");
      onNext(); // Step3(비밀번호 설정)로 이동
    } catch (error) {
      console.error("Verification failed", error);
      alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  // [API] 인증번호 재전송
  const handleResend = async () => {
    try {
      await api.post("/auth/send-verification-code", { email: data.email });
      alert("인증번호가 재전송되었습니다.");
      setShowModal(false);
    } catch (error) {
      console.error("Resend failed", error);
      alert("인증번호 재전송에 실패했습니다.");
    }
  };

  return (
    <div className="signup-step2-container">
      <button className="button-next" onClick={handleVerify}>
        <div className="button-text">다음</div>
      </button>

      <div className="description">
        '{data.email}'으로 보내드린
        <br />
        인증번호를 입력해주세요.
      </div>

      <div
        className="resend-text"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        이메일을 받지 못했나요?
      </div>

      {/* Placeholder for verification input lines */}
      <div className="verification-lines">
        <input
          type="text"
          maxLength="6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="인증번호 6자리"
          style={{
            fontSize: "24px",
            letterSpacing: "5px",
            textAlign: "center",
            border: "none",
            borderBottom: "2px solid #E5E5E5",
            width: "200px",
            padding: "10px",
            outline: "none",
            backgroundColor: "transparent",
          }}
        />
      </div>

      <div className="header-text">인증번호를 입력해주세요</div>

      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="email-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="email-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">이메일을 받지 못했나요?</div>
            <div
              className="modal-option"
              onClick={handleResend}
              style={{ cursor: "pointer" }}
            >
              인증번호 다시 받기
            </div>
            <div
              className="modal-option"
              onClick={() => {
                setShowModal(false);
                onBack(); // 1단계로 돌아가기
              }}
              style={{ cursor: "pointer" }}
            >
              이메일 주소 변경하기
            </div>
            <button
              className="modal-button-close"
              onClick={() => setShowModal(false)}
            >
              <div className="modal-button-text">다음</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
