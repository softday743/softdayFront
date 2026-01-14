import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import { EyeOff } from "./EyeOff";
import { Eye } from "./Eye";
import "../styles/onboarding/signup-step3.css";
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
    
    // "8~16자, 영문 대/소문자, 숫자, 특수문자 포함"
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    
    // Note: Regex can be strict. If user struggles, simplified check:
    // This regex enforces at least one lower, one upper, one digit, one special.
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 8~16자, 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    if (!data.username || !data.email) {
      alert("가입 정보가 유실되었습니다. 처음부터 다시 진행해주세요.");
      return;
    }

    try {
      // 2. 최종 회원가입 요청 데이터 구성
      const signUpRequest = {
        username: data.username,
        email: data.email,
        password: password,
      };

      console.log("최종 전송 데이터:", signUpRequest);

      // 3. [API] 회원가입 요청 (DB 저장)
      const response = await api.post("/auth/signup", signUpRequest);

      // 4. 토큰 저장 (가입 성공 시 자동 로그인 처리)
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        // refreshToken이 있다면 저장
        if(response.data.refreshToken) {
            localStorage.setItem("refreshToken", response.data.refreshToken);
        }
      }

      alert("회원가입에 성공했습니다!");
      onNext(); // 가입 완료 화면(SignUpStep4)으로 이동
    } catch (error) {
      console.error("Signup failed", error);
      alert("회원가입 중 문제가 발생했습니다. (조건: 아이디 중복 등)");
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
