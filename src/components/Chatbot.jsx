import React, { useState } from "react";
import "./chatbot.css";
import { GuestLoginPopup } from "./GuestLoginPopup";
import x1 from "../assets/1.png";

export function Chatbot({ onNavigate, userName }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const isGuest = !userName;

  const handleRestrictedClick = () => {
    if (isGuest) {
      setShowLoginPopup(true);
    }
  };

  return (
    <div className="chatbot-container">
      {isGuest ? (
        <div className="chatbot-guest-wrapper">
          {/* Header Title */}
          <div className="guest-header-title">챗봇 이름</div>
          
          {/* Header Dots */}
          <div className="guest-header-dots">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Welcome Bubble */}
          <div className="guest-bubble">
            <p className="guest-bubble-text">
              반가워요🫶&nbsp;&nbsp;오늘 어떤 일이 있었는지 말해줄 수 있나요?☺
            </p>
          </div>

          {/* Avatar */}
          <div className="guest-avatar-container">
              <img className="guest-avatar-img" alt="Chatbot" src={x1} />
          </div>

          {/* Time Label */}
          <div className="guest-time-label">20:01</div>

          {/* Chips */}
          <div className="guest-chip chip-1" onClick={handleRestrictedClick}>
            <span className="guest-chip-text">피곤해요</span>
          </div>
          <div className="guest-chip chip-2" onClick={handleRestrictedClick}>
            <span className="guest-chip-text">운동 추천이 필요해요</span>
          </div>

          {/* Input Box */}
          <div className="guest-input-box" onClick={handleRestrictedClick}>
            <span className="guest-input-placeholder">편하게 이야기 해주세요</span>
            <div className="guest-send-icon">
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.50867 2.87993L1.22867 11.4399C-1.65133 17.1899 0.70867 19.5499 6.45867 16.6699L8.19867 15.7999C8.70867 15.5499 9.29867 15.5499 9.80867 15.7999L11.5387 16.6699C17.2887 19.5499 19.6487 17.1999 16.7687 11.4399L12.4887 2.87993C10.5687 -0.960068 7.42867 -0.960068 5.50867 2.87993ZM9.74867 6.10993V11.5099C9.74867 11.9199 9.40867 12.2599 8.99867 12.2599C8.58867 12.2599 8.24867 11.9199 8.24867 11.5099V6.10993C8.24867 5.69993 8.58867 5.35993 8.99867 5.35993C9.40867 5.35993 9.74867 5.69993 9.74867 6.10993Z" fill="#FD9800"/>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // Logged In View - Conversation List
        <>
            {/* Header: Recent Conversation */}
            <div className="chatbot-header">최근 대화 </div>

            {/* Conversastion Cards */}
            <div className="chat-card card-1" onClick={() => {/* Navigate to chat 1 */}}>
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
                <div className="card-delete">삭제</div>
            </div>

            <div className="bot-info-card">
                <div className="bot-name">챗봇 이름</div>
                <div className="bot-avatar" />
                <div className="bot-desc">챗봇 설명</div>
            </div>

            <div className="chat-card card-2" onClick={() => {}}>
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
            </div>

            <div className="chat-card card-3" onClick={() => {}}>
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
            </div>

            <div className="chat-card card-4" onClick={() => {}}>
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
            </div>

            <div 
                className="start-chat-btn" 
                onClick={() => {/* Start new chat */}}
                style={{ cursor: "pointer" }} 
            >
                <div className="start-chat-text">대화 시작하기</div>
            </div>
        </>
      )}

      {/* Popup Overlay */}
      {showLoginPopup && (
        <GuestLoginPopup
            type="absolute"
            onClose={() => setShowLoginPopup(false)}
            onLogin={() => {
                setShowLoginPopup(false);
                if (onNavigate) onNavigate("onboarding");
            }}
        />
      )}
    </div>
  );
}
