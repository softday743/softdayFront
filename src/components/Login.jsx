import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import "./login.css";
import api from "../api/axiosConfig";

export const Login = ({ onBack, onFindId, onFindPw, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const isValid = id.length > 0 && password.length > 0;

  const handleLogin = async () => {
    if (!isValid) return;

    try {
      // [API] 로그인 요청
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      // [로직] 토큰 저장
      const { accessToken, username } = response.data; // 백엔드 응답 구조에 맞게 수정
      localStorage.setItem("accessToken", accessToken);

      alert("로그인 성공!");
      if (onLogin) onLogin(username || email); // 유저 이름 부모 컴포넌트에 전달
    } catch (error) {
      console.error("Login failed", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="login-container">
      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="text-wrapper">로그인</div>

      <div className="label">이메일</div>
      <InputText
        className="input-group"
        text="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="label">비밀번호</div>
      <InputText
        className="input-group"
        text="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div
        className="keep-logged-in"
        onClick={() => setKeepLoggedIn(!keepLoggedIn)}
      >
        {keepLoggedIn ? "☑" : "▢"} 로그인 상태 유지
      </div>

      <button
        className={`button-login ${isValid ? "active" : ""}`}
        onClick={handleLogin}
        disabled={!isValid}
      >
        <div className="button-text">로그인</div>
      </button>

      <div className="find-links">
        <span onClick={onFindId} style={{ cursor: "pointer" }}>
          아이디 찾기
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;
        <span onClick={onFindPw} style={{ cursor: "pointer" }}>
          비밀번호 찾기
        </span>
      </div>
    </div>
  );
};
