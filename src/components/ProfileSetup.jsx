import React from "react";
import icon from "../assets/icon_arrow_left.svg";
import "./profile-setup.css";

// 1. props에 data와 onUpdate를 추가했습니다.
export const ProfileSetup = ({ onNext, onBack, data, onUpdate }) => {
  // 공통 입력 스타일 (기존 디자인 유지하면서 input 기능 추가)
  const inputStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    background: "transparent",
    paddingLeft: "15px", // 텍스트 여백
    fontSize: "16px",
    fontWeight: "500",
    outline: "none",
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

      {/* 이름 입력 */}
      <div className="label name-label">이름</div>
      <div className="input-field name-input">
        <input
          type="text"
          placeholder="이름"
          value={data.name} // 2. 상태 연결
          onChange={(e) => onUpdate("name", e.target.value)} // 3. 업데이트 함수 연결
          style={inputStyle}
        />
      </div>

      {/* 직급 입력 */}
      <div className="label job-label">직급</div>
      <div className="input-field job-input">
        <input
          type="text"
          placeholder="직급"
          value={data.rank}
          onChange={(e) => onUpdate("rank", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* 연차 입력 */}
      <div className="label year-label">연차</div>
      <div className="input-field year-input">
        <input
          type="text"
          placeholder="연차"
          value={data.careerYears}
          onChange={(e) => onUpdate("careerYears", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* 산업 분야 입력 */}
      <div className="label industry-label">산업 분야</div>
      <div className="input-field industry-input">
        <input
          type="text"
          placeholder="산업"
          value={data.industry}
          onChange={(e) => onUpdate("industry", e.target.value)}
          style={inputStyle}
        />
      </div>

      <button className="button-next" onClick={onNext}>
        <div className="button-text">다음</div>
      </button>
    </div>
  );
};
