import React from "react";
import "./guest-login-popup.css";

export function GuestLoginPopup({ onLogin, onClose, type = "fixed" }) {
  return (
    <div className={`guest-popup-overlay ${type === "absolute" ? "internal" : ""}`} onClick={onClose}>
      <div className="guest-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="guest-popup-message">
          로그인이 필요한 서비스입니다<br/>
          로그인 하시겠어요?
        </div>
        <div className="guest-popup-buttons">
          <button className="guest-popup-btn cancel" onClick={onClose}>
            취소
          </button>
          <button className="guest-popup-btn login" onClick={onLogin}>
            로그인 하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
