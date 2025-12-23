import React from "react";
import "./notification-permission.css";

export function ServiceReconfirm({ onAllow, onDeny }) {
  return (
    <div className="notification-container">
      <div className="notification-modal">
        <div className="notification-btn deny" onClick={onDeny}>
          <div className="notification-btn-text">허용 안 함</div>
        </div>
        <div className="notification-btn allow" onClick={onAllow}>
          <div className="notification-btn-text">허용</div>
        </div>
        <div className="notification-title">
          미동의 시 서비스 사용이 어렵습니다.
        </div>
        <div className="notification-desc reconfirm">
          앱 푸시에 수신 동의해주세요
        </div>
      </div>
    </div>
  );
}
