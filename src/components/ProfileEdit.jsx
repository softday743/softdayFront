import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"; // [중요] api import 확인
import "./profile.css";

export function ProfileEdit({ onBack }) {
  // 1. State 선언을 최상단으로 이동 & 초기값은 빈 문자열로 설정
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    year: "",
    industry: "",
  });
  const [loading, setLoading] = useState(false);

  // 2. 화면이 켜지자마자 백엔드에서 정보 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/me");
        const data = response.data;

        // 가져온 데이터로 상태 업데이트
        setFormData({
          name: data.name || "",
          job: data.rank || "", // 백엔드: rank -> 프론트: job
          year: data.careerYears || "", // 백엔드: careerYears -> 프론트: year
          industry: data.industry || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // 유효성 검사
    if (
      !formData.name ||
      !formData.job ||
      !formData.year ||
      !formData.industry
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        rank: formData.job, // 프론트: job -> 백엔드: rank
        careerYears: formData.year, // 프론트: year -> 백엔드: careerYears
        industry: formData.industry,
      };

      await api.patch("/user/me", payload);

      alert("저장되었습니다.");
      onBack();
    } catch (error) {
      console.error("Profile update failed: ", error);
      alert("저장에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="edit-header-title">프로필 정보 수정</div>
      <div
        className="edit-back-arrow"
        onClick={onBack}
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

      <div className="edit-label label-name">이름</div>
      <div className="edit-input-wrapper input-name">
        <input
          type="text"
          className="edit-input"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      <div className="edit-label label-job">직급</div>
      <div className="edit-input-wrapper input-job">
        <input
          type="text"
          className="edit-input"
          value={formData.job}
          onChange={(e) => handleInputChange("job", e.target.value)}
        />
      </div>

      <div className="edit-label label-year">연차</div>
      <div className="edit-input-wrapper input-year">
        <input
          type="text"
          className="edit-input"
          value={formData.year}
          onChange={(e) => handleInputChange("year", e.target.value)}
        />
      </div>

      <div className="edit-label label-industry">산업 분야</div>
      <div className="edit-input-wrapper input-industry">
        <input
          type="text"
          className="edit-input"
          value={formData.industry}
          onChange={(e) => handleInputChange("industry", e.target.value)}
        />
      </div>

      {/* 로딩 중일 때 클릭 방지 및 텍스트 변경 */}
      <div
        className="edit-save-btn"
        onClick={!loading ? handleSave : null}
        style={{
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "default" : "pointer",
        }}
      >
        <div className="edit-save-text">{loading ? "저장 중..." : "저장"}</div>
      </div>
    </div>
  );
}
