import React, { useState, useEffect } from "react";
import "./profile-edit.css";
import api from "../api/axiosConfig";

export function ProfileEdit({ onBack, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    careerYears: "",
    industry: "",
  });
  const [initialData, setInitialData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/me");
        setFormData(response.data);
        setInitialData(response.data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    const isDirty =
      initialData && JSON.stringify(formData) !== JSON.stringify(initialData);
    if (isDirty) {
      setShowPopup(true);
    } else {
      onBack();
    }
  };

  const handleSave = async () => {
    try {
      // 1. PATCH 메서드로 수정 요청
      await api.patch("/user/me", formData);
      alert("저장되었습니다.");

      // 2. 부모에게 수정 완료를 알림 (부모는 여기서 fetchProfile을 실행함)
      if (onUpdate) {
        onUpdate();
      } else {
        onBack();
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div className="profile-edit-container">
      <div
        className="pe-back-arrow"
        onClick={handleBack}
        style={{ cursor: "pointer" }}
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
      <div className="pe-header-title">프로필 정보 수정</div>

      <div className="pe-label pe-label-name">이름</div>
      <div className="pe-input-container pe-input-name">
        <input
          type="text"
          name="name"
          className="pe-input"
          value={formData.name || ""}
          onChange={handleChange}
        />
      </div>

      <div className="pe-label pe-label-job">직급</div>
      <div className="pe-input-container pe-input-job">
        <input
          type="text"
          name="rank"
          className="pe-input"
          value={formData.rank || ""}
          onChange={handleChange}
        />
      </div>

      <div className="pe-label pe-label-year">연차</div>
      <div className="pe-input-container pe-input-year">
        <input
          type="text"
          name="careerYears"
          className="pe-input"
          value={formData.careerYears || ""}
          onChange={handleChange}
        />
      </div>

      <div className="pe-label pe-label-industry">산업 분야</div>
      <div className="pe-input-container pe-input-industry">
        <input
          type="text"
          name="industry"
          className="pe-input"
          value={formData.industry || ""}
          onChange={handleChange}
        />
      </div>

      <div
        className="pe-save-btn"
        onClick={handleSave}
        style={{ cursor: "pointer" }}
      >
        저장
      </div>

      {showPopup && (
        <div className="pe-overlay">
          <div className="pe-popup">
            <div className="pe-popup-text">
              수정 사항이 저장되지 않았어요.
              <br />
              계속 진행하시겠습니까?
            </div>
            <div className="pe-popup-btn-group">
              <div className="pe-popup-btn yes" onClick={onBack}>
                예
              </div>
              <div
                className="pe-popup-btn no"
                onClick={() => setShowPopup(false)}
              >
                아니오
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
