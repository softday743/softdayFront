import React from 'react';
import './notification-permission.css';

export function ServiceNotification({ onAllow, onDeny }) {
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
          소프트데이에서 알림을<br/>보내고자 합니다.
        </div>
        <div className="notification-desc">
          서비스 이용에 필요한 안내 사항을<br/>푸시 알림으로 보내드리겠습니다.<br/><br/>앱 푸시에 수신 동의하시겠습니까?
        </div>
      </div>
    </div>
  );
}
