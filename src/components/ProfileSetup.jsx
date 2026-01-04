import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import "./profile-setup.css";
import api from "../api/axiosConfig";

const RANK_OPTIONS = [
  "인턴",
  "사원",
  "대리",
  "과장",
  "차장",
  "부장",
  "임원(이사, 상무, 전무, 부사장, 사장)",
  "기타(직접입력)",
];

const CAREER_OPTIONS = [
  "1년 미만",
  "1–2년",
  "3–5년",
  "6–9년",
  "10–14년",
  "15년 이상",
];

const INDUSTRY_OPTIONS = [
  "IT/소프트웨어·플랫폼",
  "미디어·콘텐츠",
  "광고·마케팅·에이전시",
  "금융·보험·핀테크",
  "제조",
  "유통·커머스·리테일",
  "물류·모빌리티",
  "헬스케어·바이오·의료",
  "교육",
  "공공·기관·비영리",
  "건설·부동산",
  "에너지·환경",
  "서비스(여행/숙박/식음료 등)",
  "전문서비스(법률·회계·컨설팅)",
  "기타(직접입력)",
];

export const ProfileSetup = ({ onNext, onBack }) => {
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [customRank, setCustomRank] = useState("");
  const [careerYears, setCareerYears] = useState("");
  const [industry, setIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");

  const handleSubmit = async () => {
    const finalRank = rank === "기타(직접입력)" ? customRank : rank;
    const finalIndustry = industry === "기타(직접입력)" ? customIndustry : industry;

    if (!name || !finalRank || !careerYears || !finalIndustry) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    try {
      await api.patch("/auth/me", {
        name,
        rank: finalRank,
        industry: finalIndustry,
        careerYears,
      });
      onNext();
    } catch (error) {
      console.error("Profile setup failed", error);
      alert("프로필 정보 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="profile-setup-container">
      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="onbording-steps">
        <div className="step active" />
        <div className="step" />
        <div className="step" />
      </div>

      <div className="title">프로필 정보</div>

      <div className="profile-form-wrapper">
        <div className="form-group">
          <div className="label">이름</div>
          <input
            className="input-field"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div className="label">직급</div>
          <select
            className="input-field select-field"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            style={{ color: rank ? "#000000" : "#acacac" }}
          >
            <option value="" disabled>
              직급 선택
            </option>
            {RANK_OPTIONS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#000" }}>
                {opt}
              </option>
            ))}
          </select>
          {rank === "기타(직접입력)" && (
            <input
              className="input-field"
              placeholder="직급 직접 입력"
              value={customRank}
              onChange={(e) => setCustomRank(e.target.value)}
              style={{ marginTop: "8px" }}
            />
          )}
        </div>

        <div className="form-group">
          <div className="label">연차</div>
          <select
            className="input-field select-field"
            value={careerYears}
            onChange={(e) => setCareerYears(e.target.value)}
            style={{ color: careerYears ? "#000000" : "#acacac" }}
          >
            <option value="" disabled>
              연차 선택
            </option>
            {CAREER_OPTIONS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#000" }}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <div className="label">산업 분야</div>
          <select
            className="input-field select-field"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            style={{ color: industry ? "#000000" : "#acacac" }}
          >
            <option value="" disabled>
              산업 분야 선택
            </option>
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#000" }}>
                {opt}
              </option>
            ))}
          </select>
          {industry === "기타(직접입력)" && (
            <input
              className="input-field"
              placeholder="산업 분야 직접 입력"
              value={customIndustry}
              onChange={(e) => setCustomIndustry(e.target.value)}
              style={{ marginTop: "8px" }}
            />
          )}
        </div>
      </div>

      <button className="button-next" onClick={handleSubmit}>
        <div className="button-text">다음</div>
      </button>
    </div>
  );
};
