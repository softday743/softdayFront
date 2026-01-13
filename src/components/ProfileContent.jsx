import React, { useState, useEffect } from "react";
import "./profile-content.css";
import api from "../api/axiosConfig";

export function ProfileContent({ onBack }) {
  const [preferences, setPreferences] = useState([]); 
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    { id: "video", label: "🎬 영상", top: 203 },
    { id: "text", label: "📄 텍스트", top: 268 },
    { id: "audio", label: "🎧 음성", top: 333 },
  ];

  // 기존 설정 불러오기 (초기 로드)
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get("/user/preferences"); // 서버 API 주소에 맞게 수정
        if (response.data) setPreferences(response.data.contentTypes || []);
      } catch (err) {
        console.error("불러오기 실패", err);
      }
    };
    fetchPreferences();
  }, []);

  const togglePreference = (id) => {
    setPreferences((prev) => 
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // 서버에 취향 저장 API 호출
      await api.put("/user/preferences", { contentTypes: preferences });
      onBack(); // 저장 후 프로필 메인으로 이동
    } catch (err) {
      console.error("저장 실패", err);
      alert("저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) return;
    try {
      await api.post("/user/feedback", { content: feedbackText });
      setShowFeedbackPopup(false);
      setShowThankYouPopup(true);
      setFeedbackText("");
      setTimeout(() => setShowThankYouPopup(false), 2000);
    } catch (err) {
      alert("전송에 실패했습니다.");
    }
  };

  return (
    <div className="pc-container">
      {/* Header */}
      <div className="pc-back-arrow" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="pc-header-title">콘텐츠</div>

      <div className="pc-main-title">🫶 선호하는 콘텐츠를 선택해주세요.</div>

      {/* Checklist Items */}
      {items.map((item) => {
        const isActive = preferences.includes(item.id);
        return (
          <div
            key={item.id}
            className={`pc-checklist-item ${isActive ? "active" : "inactive"}`}
            style={{ top: `${item.top}px` }}
            onClick={() => togglePreference(item.id)}
          >
            <div className="pc-checkbox">
              {isActive ? (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="5" fill="#FD9800" />
                  <path d="M20.1673 10.25L12.3757 18.0417L8.83398 14.5" stroke="#F6F6F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="0.5" y="0.5" width="27" height="27" rx="4.5" fill="#C1C1C1" stroke="#CDCDCD" />
                </svg>
              )}
            </div>
            <div className="pc-item-text">{item.label}</div>
          </div>
        );
      })}

      <div className="pc-other-link" onClick={() => setShowFeedbackPopup(true)}>다른 유형도 보고싶어요</div>

      {/* 완료 버튼 (저장 로직 연결) */}
      <div className="pc-submit-btn" onClick={handleSave}>
        {isLoading ? "저장 중..." : "완료"}
      </div>

      {/* Feedback Popups */}
      {showFeedbackPopup && (
        <div className="pc-popup-overlay">
          <div className="pc-feedback-popup">
            <div className="pc-popup-title">어떤 유형의 콘텐츠가 필요하신가요?<br />편하게 말씀해주세요.☺️</div>
            <textarea className="pc-popup-input-area" placeholder="의견을 입력해주세요" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />
            <div className="pc-popup-btn-row">
              <div className="pc-popup-cancel-btn" onClick={() => setShowFeedbackPopup(false)}>취소</div>
              <div className="pc-popup-confirm-btn" onClick={handleFeedbackSubmit}>완료</div>
            </div>
          </div>
        </div>
      )}

      {showThankYouPopup && (
        <div className="pc-popup-overlay">
          <div className="pc-thankyou-popup">소중한 의견 감사해요!🫶</div>
        </div>
      )}
    </div>
  );
}