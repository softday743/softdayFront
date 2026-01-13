import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import { EyeOff } from "./EyeOff";
import { Eye } from "./Eye";
import "./signup-step3.css";
import api from "../api/axiosConfig";

export const SignUpStep3 = ({ onNext, onBack, data }) => {
  // setData는 여기서 안 쓰므로 생략 가능
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSignup = async () => {
    // 1. 유효성 검사 (백엔드 SignUpRequest 조건 반영)
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 백엔드 정규식: 8~16자, 영문 대/소문자, 숫자, 특수문자 필수
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "비밀번호는 8~16자이며, 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
      );
      return;
    }

    // 데이터 유실 방지 체크
    if (!data.username || !data.email) {
      alert("가입 정보가 부족합니다. 처음부터 다시 시도해주세요.");
      console.log("Missing data:", data); // 디버깅용
      return;
    }

    try {
      // 2. 최종 회원가입 요청 데이터 구성
      const signUpRequest = {
        username: data.username,
        email: data.email,
        password: password,
      };

      console.log("회원가입 요청:", signUpRequest);

      // 3. [API] 회원가입 요청 (DB 저장)
      // 백엔드 AuthController의 @PostMapping("/signup") 호출
      const response = await api.post("/auth/signup", signUpRequest);

      // 4. 토큰 저장 (로그인 처리)
      // 백엔드 AuthResponse에서 accessToken을 줍니다.
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log("토큰 저장 완료:", response.data.accessToken);
      }

      alert("회원가입에 성공했습니다!");

      // 5. 다음 단계(가입 완료 화면)로 이동
      onNext();
    } catch (error) {
      console.error("Signup failed:", error);
      // 에러 메시지가 서버에서 오면 그걸 보여주고, 아니면 기본 메시지
      const errorMessage =
        error.response?.data || "회원가입 중 문제가 발생했습니다.";
      alert(errorMessage);
    }
  };

  return (
    <div className="signup-step3-container">
      <button className="button-next" onClick={handleSignup}>
        <div className="button-text">회원가입 완료</div>
      </button>

      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="header-text">비밀번호를 입력해주세요</div>

      <div className="sub-header">
        안전한 사용을 위해 복잡한 비밀번호가 필요해요!
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="label">비밀번호</div>
      <div className="input-container">
        <InputText
          text="비밀번호"
          type={showPassword1 ? "text" : "password"}
          placeholder="8~16자 (대/소문자, 숫자, 특수문자)"
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

      {/* 비밀번호 확인 필드 */}
      <div className="input-container" style={{ marginTop: "15px" }}>
        <InputText
          text="비밀번호 확인"
          type={showPassword2 ? "text" : "password"}
          placeholder="비밀번호를 다시 입력해주세요"
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
