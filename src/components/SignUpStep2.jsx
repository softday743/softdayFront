import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import line from "../assets/line_dashed.svg"; // Using simplified asset
import "./signup-step2.css";

export const SignUpStep2 = ({ onNext, onBack }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="signup-step2-container">
      <button className="button-next" onClick={onNext}>
        <div className="button-text">다음</div>
      </button>

      <div className="description">
        '이메일주소'으로 보내드린
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
              onClick={() => {
                // Handle resend logic
                setShowModal(false);
              }}
            >
              인증번호 다시 받기
            </div>

            <div
              className="modal-option"
              onClick={() => {
                // Handle email change logic
                setShowModal(false);
                onBack();
              }}
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
