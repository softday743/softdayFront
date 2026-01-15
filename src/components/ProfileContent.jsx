import React, { useState, useEffect } from "react";
import "../styles/mypage/profile-content.css";
import api from "../api/axiosConfig";

export function ProfileContent({ onBack }) {
  // 선호도 데이터를 명세서 형식인 객체로 관리합니다.
  const [preferences, setPreferences] = useState({
    video: false,
    text: false,
    audio: false,
  }); 
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    { id: "video", label: "🎬 영상", top: 203 },
    { id: "text", label: "📄 텍스트", top: 268 },
    { id: "audio", label: "🎧 음성", top: 333 },
  ];

  // 1. 기존 설정 불러오기 (초기 로드)
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // 명세서에 조회가 명시되지 않았으나, 보통 저장과 같은 경로를 사용합니다.
        // 주소를 명세서에 나온 /api/auth/user-preference로 수정합니다.
        const response = await api.get("/auth/user-preference"); 
        if (response.data) {
          setPreferences({
            video: response.data.video || false,
            text: response.data.text || false,
            audio: response.data.audio || false,
          });
        }
      } catch (err) {
        console.error("불러오기 실패", err);
        // 만약 GET(조회) API가 아직 없다면 403이 뜰 수 있습니다. 
        // 이 경우 초기값은 false 유지가 안전합니다.
      }
    };
    fetchPreferences();
  }, []);

  const togglePreference = (id) => {
    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id] // true <-> false 토글
    }));
  };

  // 2. 선호도 저장 (POST 요청)
  const handleSave = async () => {
    try {
      setIsLoading(true);
      // [수정] 명세서 URL: /api/auth/user-preference, Method: POST
      // 데이터 형식: { video: true, text: false, audio: true }
      await api.post("/auth/user-preference", preferences);
      
      alert("선호도가 저장되었습니다.");
      onBack(); 
    } catch (err) {
      console.error("저장 실패", err);
      // 403 에러가 계속 난다면 백엔드 Security 설정에서 
      // 해당 URL의 접근 권한을 확인해야 합니다.
      alert("저장에 실패했습니다. 권한을 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) return;
    try {
      // 주소가 확인되지 않아 기존 로직 유지
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
      <div className="pc-back-arrow" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="pc-header-title">콘텐츠</div>

      <div className="pc-main-title">🫶 선호하는 콘텐츠를 선택해주세요.</div>

      {items.map((item) => {
        // 해당 아이디가 true인 경우 체크된 상태로 보입니다.
        const isActive = preferences[item.id];
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

      <div className="pc-submit-btn" onClick={handleSave}>
        {isLoading ? "저장 중..." : "완료"}
      </div>

      {/* Popups... */}
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