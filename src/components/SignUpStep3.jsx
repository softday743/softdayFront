import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import { EyeOff } from "./EyeOff";
import { Eye } from "./Eye";
import "./signup-step3.css";
import api from "../api/axiosConfig";

export const SignUpStep3 = ({ onNext, onBack, data, setData }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleNext = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // [API] 회원가입 요청
      // data에는 Step1, Step2에서 입력받은 username, email 등이 들어있어야 함
      const requestData = {
        ...data,
        password: password,
      };

      await api.post("/auth/signup", requestData);

      alert("회원가입이 완료되었습니다!");
      onNext(); // 성공 시 다음 단계(완료 화면)로 이동
    } catch (error) {
      console.error("Signup failed", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-step3-container">
      <button className="button-next" onClick={handleNext}>
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
          className="input-group"
          text="비밀번호"
          type={showPassword1 ? "text" : "password"}
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
          className="input-group"
          text="비밀번호 확인"
          type={showPassword2 ? "text" : "password"}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
