import React from "react";
import "./notification-permission.css";

export function MarketingNotification({ onAllow, onDeny }) {
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
          소프트데이에서 광고성 정보 알림을
          <br />
          보내고자 합니다.
        </div>
        <div className="notification-desc">
          해당 기기로 이벤트, 할인 혜택 등을
          <br />
          푸시 알림으로 보내드리겠습니다.
          <br />
          <br />앱 푸시에 수신 동의하시겠습니까?
        </div>
      </div>
    </div>
  );
}
