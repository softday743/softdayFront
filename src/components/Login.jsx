import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import api from "../api/axiosConfig"; // [추가] API 호출을 위한 axios 인스턴스
import "./login.css";

// onLoginSuccess prop 추가
export const Login = ({ onBack, onFindId, onFindPw, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("아이디(이메일)와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 백엔드 로그인 API 호출
      const response = await api.post("/auth/login", {
        email: email, // 백엔드는 email 필드를 요구함
        password: password,
      });

      // 토큰 저장 (로그인 유지)
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);

      // 성공 알림 및 화면 이동
      // alert("로그인되었습니다."); // 필요 시 주석 해제
      onLoginSuccess();
    } catch (error) {
      console.error("Login failed", error);
      const errorMsg =
        error.response?.status === 401
          ? "아이디 또는 비밀번호가 올바르지 않습니다."
          : "로그인에 실패했습니다. 다시 시도해주세요.";
      alert(errorMsg);
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

      <div className="label">아이디</div>
      {/* 이메일 입력 연결 */}
      <InputText
        className="input-group"
        text="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="label">비밀번호</div>
      {/* 비밀번호 입력 연결 */}
      <InputText
        className="input-group"
        text="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="keep-logged-in">▢ 로그인 상태 유지</div>

      {/* 로그인 버튼에 함수 연결 */}
      <button className="button-login" onClick={handleLogin}>
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
