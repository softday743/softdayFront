import React, { useState, useEffect } from "react";
import "../styles/mypage/profile-edit.css";
import { userApi } from "../api/axiosConfig"; // userApi 사용

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
        const response = await userApi.getUserProfile();
        setFormData(response.data);
        setInitialData(response.data);
      } catch (error) {
        console.error("프로필 로딩 실패:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    const isDirty = initialData && JSON.stringify(formData) !== JSON.stringify(initialData);
    if (isDirty) {
      setShowPopup(true);
    } else {
      onBack();
    }
  };

  const handleSave = async () => {
    try {
      const requestData = {
        name: formData.name || "",
        rank: formData.rank || "",
        industry: formData.industry || "",
        careerYears: String(formData.careerYears),
        allowNotification: formData.allowNotification ?? false,
        preferences: {
          video: formData.preferences?.video ?? false,
          text: formData.preferences?.text ?? false,
          audio: formData.preferences?.audio ?? false,
        },
      };

      const response = await userApi.updateUserProfile(requestData);

      if (response.status === 200) {
        alert("성공적으로 저장되었습니다.");
        if (onUpdate) onUpdate();
        onBack();
      }
    } catch (error) {
      // 403 발생 시 서버의 응답 내용을 더 자세히 출력합니다.
      console.error("수정 실패 상세 정보:", error.response?.data || error.message);
      
      if (error.response?.status === 403) {
        alert("접근 권한이 없거나 세션이 만료되었습니다. 다시 로그인해 주세요.");
      } else {
        alert("저장 중 오류가 발생했습니다. 입력값을 확인해 주세요.");
      }
    }
  };

  return (
    <div className="profile-edit-container">
      <div className="pe-back-arrow" onClick={handleBack} style={{ cursor: "pointer" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="pe-header-title">프로필 정보 수정</div>

      <div className="pe-label pe-label-name">이름</div>
      <div className="pe-input-container pe-input-name">
        <input type="text" name="name" className="pe-input" value={formData.name || ""} onChange={handleChange} />
      </div>

      <div className="pe-label pe-label-job">직급</div>
      <div className="pe-input-container pe-input-job">
        <input type="text" name="rank" className="pe-input" value={formData.rank || ""} onChange={handleChange} />
      </div>

      <div className="pe-label pe-label-year">연차</div>
      <div className="pe-input-container pe-input-year">
        <input type="text" name="careerYears" className="pe-input" value={formData.careerYears || ""} onChange={handleChange} />
      </div>

      <div className="pe-label pe-label-industry">산업 분야</div>
      <div className="pe-input-container pe-input-industry">
        <input type="text" name="industry" className="pe-input" value={formData.industry || ""} onChange={handleChange} />
      </div>

      <div className="pe-save-btn" onClick={handleSave} style={{ cursor: "pointer" }}>저장</div>

      {showPopup && (
        <div className="pe-overlay">
          <div className="pe-popup">
            <div className="pe-popup-text">수정 사항이 저장되지 않았어요.<br />계속 진행하시겠습니까?</div>
            <div className="pe-popup-btn-group">
              <div className="pe-popup-btn yes" onClick={onBack}>예</div>
              <div className="pe-popup-btn no" onClick={() => setShowPopup(false)}>아니오</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}