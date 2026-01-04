import React, { useState } from "react";
import "./statistics.css";
import { GuestLoginPopup } from "./GuestLoginPopup"; // Keep just in case, but using custom UI here
import welcomeEmoji from "../assets/welcome-emoji.png"; // Or just the emoji text as per HTML

export function Statistics({ hasCheckedIn, onNavigate, userName }) {
  const isGuest = !userName;

  const handleGuestLogin = () => {
    if (onNavigate) onNavigate("onboarding");
  };

  return (
    <div className="statistics-container">
      {/* Header */}
      <div className="stat-header-wrapper">
        <div className="stat-header-title">
          {isGuest ? (
            <>
              오늘의 기분을 기록하고<br />
              데이터로 확인해보아요 👀
            </>
          ) : (
            hasCheckedIn
              ? "오전 9시에 스트레스가 가장 높아요"
              : "오늘의 스트레스를 확인해보세요"
          )}
        </div>
        {!isGuest && (
            <div className="stat-header-sub">
                {hasCheckedIn
                ? "✅ 오늘의 기분이 기록되었어요"
                : "✅ 아직 오늘의 기록이 없어요"}
            </div>
        )}
      </div>

      {/* Date Selector (Top Right) */}
      <div className="stat-date-controls">
        <div className="date-toggle-btn">일간</div>
      </div>

      {/* Mood Card */}
      {isGuest ? (
        <div className="stat-mood-card guest">
             <div className="stat-card-date">12월 9일(화)</div>
             <div className="stat-mood-display guest-emoji">☺️</div>
             <div className="guest-mood-link">오늘의 기분을 기록해 볼까요?</div>
        </div>
      ) : !hasCheckedIn ? (
        <div
          className="stat-mood-card"
          onClick={() => onNavigate && onNavigate("stressCheckInStats")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            오늘의 기분을 기록해 볼까요?
          </div>
          <div style={{ fontSize: "40px" }}>☺️</div>
        </div>
      ) : (
        <div className="stat-mood-card">
          <div className="stat-mood-date">12월 9일(화)</div>
          <div className="stat-mood-emoji">😐</div>
          <div className="stat-mood-score">3점</div>
          <div className="stat-mood-reason">업무과다, 수면 부족</div>
        </div>
      )}

      {/* Body Content */}
      <div className="stat-body-content">
          {/* Always render structure, blurred if guest */}
          
          <div className="stat-section-title">스트레스 지수 추이 그래프</div>
          <div className="stat-graph-card">
                <div className="graph-info-box my-score">🔍 내 점수</div>
                {!isGuest && <div className="graph-value-box my-score-val">3점</div>}
                
                <div className="graph-info-box avg-score">🔍 평균 점수</div>
                {!isGuest && <div className="graph-value-box avg-score-val">2점</div>}
          </div>

          <div className="stat-section-title">스트레스 원인 분석</div>
           {/* Placeholder for Analysis Card */}
           <div className="stat-analysis-card">
              {/* Dummy content for guest visual foundation */}
              <div className="analysis-chart-placeholder"></div> 
           </div>

           <div className="stat-section-title">시간대별 스트레스 분포</div>
           <div className="stat-time-card">
              <div className="time-chart-placeholder"></div>
           </div>

           {/* Guest Overlay */}
           {isGuest && (
               <>
                 <div className="guest-blur-overlay"></div>
                 <div className="guest-login-card">
                    <div className="guest-login-title">
                        로그인으로 소프트데이의<br/>모든 기능을 누려보세요! 🙌
                    </div>
                    <div className="guest-login-subtitle">
                        나의 기분을 데이터로 보고싶다면? 📊
                    </div>
                    <div className="guest-login-btn" onClick={handleGuestLogin}>
                        로그인하러 가기
                    </div>
                 </div>
               </>
           )}
      </div>
    </div>
  );
}
