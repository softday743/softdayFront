import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import "./login.css";

export const Login = ({ onBack, onFindId, onFindPw, onLogin }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const isValid = id.length > 0 && password.length > 0;

  const handleLogin = () => {
    if (isValid && onLogin) {
      // Test account: test / test123
      // For demo purposes, accept any valid input
      onLogin(id); // Pass the user ID
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
      <InputText
        className="input-group"
        text="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
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
