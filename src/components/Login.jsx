import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import "./login.css";
import api from "../api/axiosConfig";

export const Login = ({ onBack, onFindId, onFindPw, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const isValid = email.length > 0 && password.length > 0;

  const handleLogin = async () => {
    if (!isValid) return;

    // Test Credential Check
    if (email === "test@test.com" && password === "1234") {
      localStorage.setItem("accessToken", "dummy-test-token");
      alert("테스트 계정으로 로그인되었습니다.");
      if (onLogin) onLogin("테스트유저");
      return;
    }

    try {
      // [API] 로그인 요청
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      // [로직] 토큰 및 유저 정보 추출
      // 백엔드 응답: { accessToken, refreshToken, username, tokenType }
      const { accessToken, refreshToken, username } = response.data;

      // 로그인 유지 여부에 따라 저장소 선택
      if (keepLoggedIn) {
        // [로그인 유지 O] -> LocalStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        // 중복 방지를 위해 SessionStorage 클리어
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      } else {
        // [로그인 유지 X] -> SessionStorage (브라우저 종료 시 삭제됨)
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);

        // 중복 방지를 위해 LocalStorage 클리어
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      alert("로그인 성공!");
      if (onLogin) onLogin(username || email);
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
