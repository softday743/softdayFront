import React, { useState, useEffect } from "react";
import "./profile.css";
import api from "../api/axiosConfig";

export function ProfileContent({ onBack }) {
  const [selectedContentTypes, setSelectedContentTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const response = await api.get("/user/me");
        const prefs = response.data.preferences || {};
        const activeTypes = [];
        if (prefs.video) activeTypes.push("video");
        if (prefs.text) activeTypes.push("text");
        if (prefs.audio) activeTypes.push("audio");
        setSelectedContentTypes(activeTypes);
      } catch (error) {
        console.error("Failed to load preferences", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrefs();
  }, []);

  const toggleContentType = (type) => {
    if (selectedContentTypes.includes(type)) {
      setSelectedContentTypes((prev) => prev.filter((t) => t !== type));
    } else {
      setSelectedContentTypes((prev) => [...prev, type]);
    }
  };

  const handleSave = async () => {
    try {
      await api.patch("/user/me", {
        preferences: {
          video: selectedContentTypes.includes("video"),
          text: selectedContentTypes.includes("text"),
          audio: selectedContentTypes.includes("audio"),
        },
      });
      alert("콘텐츠 선호도가 저장되었습니다.");
      onBack();
    } catch (error) {
      console.error("Save failed", error);
      alert("저장에 실패했습니다.");
    }
  };

  if (loading) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <div
        className="edit-back-arrow"
        onClick={onBack}
        style={{ top: "24px", position: "absolute" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className="content-pref-header-title"
        style={{ position: "relative", marginTop: "20px" }}
      >
        콘텐츠
      </div>
      <div
        className="content-pref-subtitle"
        style={{
          position: "relative",
          top: "auto",
          left: "auto",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        선호하는 콘텐츠를 선택해주세요.
      </div>

      <div
        className="content-pref-option-container"
        style={{
          position: "relative",
          top: "auto",
          left: "auto",
          marginTop: "30px",
          alignItems: "center",
        }}
      >
        {["video", "text", "audio"].map((type) => (
          <div
            key={type}
            className="content-pref-card"
            onClick={() => toggleContentType(type)}
            style={{
              background: selectedContentTypes.includes(type)
                ? "#e5e5e5"
                : "#F6F6F6",
            }}
          >
            <div className="content-pref-checkbox">
              {selectedContentTypes.includes(type) ? (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="27"
                    height="27"
                    rx="4.5"
                    fill="#222"
                    stroke="#222"
                  />
                  <path
                    d="M7 14L11 18L21 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="27"
                    height="27"
                    rx="4.5"
                    fill="#F6F6F6"
                    stroke="#CDCDCD"
                  />
                </svg>
              )}
            </div>
            <div className="content-pref-text">
              {type === "video"
                ? "🖥️ 영상"
                : type === "text"
                ? "📄 텍스트"
                : "🎧 음성"}
            </div>
          </div>
        ))}
      </div>

      <div
        className="content-pref-complete-btn active"
        onClick={handleSave}
        style={{
          position: "relative",
          top: "auto",
          left: "auto",
          margin: "60px auto 0",
        }}
      >
        <div className="content-pref-btn-text" style={{ color: "white" }}>
          완료
        </div>
      </div>
    </div>
  );
}
