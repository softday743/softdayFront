import React from 'react';
import './signup-complete.css';

export function SignupComplete({ onNext }) {
  return (
    <div className="signup-complete-container" onClick={onNext}>
      <div className="welcome-text-container">
        <span className="welcome-title">00님 환영해요<br/><br/><br/><br/></span>
        <span className="welcome-subtitle">이제 소프트데이를 시작해보아요!</span>
      </div>
    </div>
  );
}
