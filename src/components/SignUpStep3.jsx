import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import { EyeOff } from "./EyeOff";
import { Eye } from "./Eye";
import "./signup-step3.css";
import api from "../api/axiosConfig";

export const SignUpStep3 = ({ onNext, onBack, data, setData }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSignup = async () => {
    // 1. 유효성 검사
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (password.length < 4) {
      alert("비밀번호는 4자리 이상이어야 합니다.");
      return;
    }

    if (!data.username || !data.email) {
      alert("가입 정보가 유실되었습니다. 처음부터 다시 진행해주세요.");
      return;
    }

    try {
      // 2. 최종 회원가입 요청 데이터 구성
      // data: App.jsx에서 관리하는 signupData (Step1, Step2의 정보 포함)
      const signUpRequest = {
        username: data.username,
        email: data.email,
        name: data.name,
        password: password,
        // [필수] 백엔드 DB 제약조건(nullable=false)을 만족시키기 위한 기본값
        rank: "미정",
        // [선택] null이어도 되지만 명시적으로 보냄
        industry: "미정",
        careerYears: "신입",
      };

      console.log("최종 전송 데이터:", signUpRequest);

      // 3. [API] 회원가입 요청 (DB 저장)
      const response = await api.post("/auth/signup", signUpRequest);

      // 4. 토큰 저장 (가입 성공 시 자동 로그인 처리)
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      alert("회원가입에 성공했습니다!");
      onNext(); // 가입 완료 화면(SignUpStep4)으로 이동
    } catch (error) {
      console.error("Signup failed", error);
      alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="signup-step3-container">
      <button className="button-next" onClick={handleSignup}>
        <div className="button-text">회원가입</div>
      </button>

      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="header-text">비밀번호를 입력해주세요</div>

      <div className="sub-header">회원가입 마지막 절차예요!</div>

      <div className="label">비밀번호</div>
      <div className="input-container">
        <InputText
          text="비밀번호"
          // [수정] 눈 아이콘 상태에 따라 type 변경
          type={showPassword1 ? "text" : "password"}
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="eye-off-icon"
          onClick={() => setShowPassword1(!showPassword1)}
          style={{ cursor: "pointer" }}
        >
          {showPassword1 ? <Eye /> : <EyeOff />}
        </div>
      </div>

      <div className="input-container" style={{ marginTop: "15px" }}>
        <InputText
          text="비밀번호 확인"
          // [수정] 눈 아이콘 상태에 따라 type 변경
          type={showPassword2 ? "text" : "password"}
          placeholder="비밀번호 재입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          className="eye-off-icon"
          onClick={() => setShowPassword2(!showPassword2)}
          style={{ cursor: "pointer" }}
        >
          {showPassword2 ? <Eye /> : <EyeOff />}
        </div>
      </div>
    </div>
  );
};
