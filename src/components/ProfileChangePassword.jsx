import React, { useState, useEffect } from "react";
import { authApi } from "../api/axiosConfig";
import icon from "../assets/icon_arrow_left.svg";
import "../styles/mypage/profile-change-password.css";

export function ProfileChangePassword({ onBack }) {
  const [view, setView] = useState("verify");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(179);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    let interval;
    if (isCodeSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  const handleSendCode = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      setErrors({});
      setShowToast(false);
      await authApi.sendVerificationCode(email);
      setIsCodeSent(true);
      setTimer(179);
      alert(`인증번호가 ${email}로 발송되었습니다.`);
    } catch (error) {
      setErrors({ email: "존재하지 않는 이메일이에요." });
    }
  };

  const handleVerifyUser = async () => {
    if (!username || !email || !code) {
      alert("아이디, 이메일, 인증번호를 모두 입력해주세요.");
      return;
    }

    // 디버깅: 전송 직전 데이터 로그 확인
    console.log("전송 데이터:", { username, email, code });

    try {
      setErrors({});
      setShowToast(false);

      const response = await authApi.verifyResetUser(username, email, code);
      console.log("Verification response:", response);

      if (response.status === 200 || response.data?.message) {
        setView("reset");
      }
    } catch (error) {
      console.error("Verification failed", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error message:", error.message);

      // 에러 메시지 표시
      if (error.response?.data?.message || error.response?.data) {
        alert(
          error.response?.data?.message ||
            error.response?.data ||
            "검증에 실패했습니다."
        );
      } else {
        alert("검증에 실패했습니다. 입력값을 확인해주세요.");
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrors({ passwordMatch: "비밀번호가 일치하지 않습니다." });
      return;
    }

    try {
      await authApi.resetPassword(username, newPassword);
      setView("complete");
    } catch (error) {
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  if (view === "complete") {
    return (
      <div className="pcp-container">
        <header className="pcp-header">
          <div
            className="pcp-back-btn"
            onClick={onBack}
            style={{ cursor: "pointer" }}
          >
            <img src={icon} alt="Back" style={{ width: "24px" }} />
          </div>
          <h1 className="pcp-title">비밀번호 변경</h1>
        </header>
        <div className="pcp-complete-content">
          <p className="pcp-complete-text">비밀번호가 재설정 되었어요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pcp-container">
      <header className="pcp-header">
        <div
          className="pcp-back-btn"
          onClick={onBack}
          style={{ cursor: "pointer" }}
        >
          <img src={icon} alt="Back" style={{ width: "24px" }} />
        </div>
        <h1 className="pcp-title">비밀번호 변경</h1>
      </header>

      <main className="pcp-main">
        {view === "verify" ? (
          <>
            <h2 className="pcp-main-guide">
              비밀번호를 변경하기 위해
              <br />
              아이디와 이메일을 인증해주세요.
            </h2>
            <div className="pcp-form">
              <div className="pcp-input-group">
                <label>아이디</label>
                <input
                  type="text"
                  placeholder="아이디"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setShowToast(false);
                  }}
                />
              </div>

              <div className="pcp-input-group">
                <label>이메일</label>
                <div className="pcp-input-with-btn">
                  <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    className={errors.email ? "pcp-input-error" : ""}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowToast(false);
                    }}
                  />
                  <button onClick={handleSendCode} className="pcp-mini-btn">
                    {isCodeSent ? "다시 받기" : "인증번호"}
                  </button>
                </div>
                {errors.email && (
                  <span className="pcp-error-text">{errors.email}</span>
                )}
              </div>

              {isCodeSent && (
                <div className="pcp-input-group">
                  <label>인증번호</label>
                  <div className="pcp-input-with-btn">
                    <div className="pcp-code-input-wrapper">
                      <input
                        type="text"
                        placeholder="인증번호 입력"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <span className="pcp-timer">
                        남은 시간 {formatTime(timer)}
                      </span>
                    </div>
                    <button
                      onClick={handleVerifyUser}
                      className={`pcp-mini-btn pcp-confirm-btn ${
                        code ? "active" : ""
                      }`}
                    >
                      인증확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="pcp-main-guide">비밀번호를 재설정해주세요.</h2>
            <div className="pcp-form">
              <div className="pcp-input-group">
                <label>비밀번호</label>
                <div className="pcp-pw-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    placeholder="비밀번호 입력"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    className="pcp-pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁️
                  </button>
                </div>
                <span className="pcp-guide-text">
                  8~16자의 영문 대소문자, 숫자 및 특수문자 사용 필요
                </span>
              </div>

              <div className="pcp-input-group">
                <div className="pcp-pw-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="비밀번호 확인"
                    className={errors.passwordMatch ? "pcp-input-error" : ""}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="pcp-pw-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    👁️
                  </button>
                </div>
                {errors.passwordMatch && (
                  <span className="pcp-error-text">{errors.passwordMatch}</span>
                )}
              </div>

              <button
                className={`pcp-full-btn ${
                  newPassword && confirmPassword ? "active" : ""
                }`}
                onClick={handleResetPassword}
              >
                변경
              </button>
            </div>
          </>
        )}

        {showToast && (
          <div className="pcp-toast">계정 정보가 일치하지 않아요</div>
        )}
      </main>
    </div>
  );
}
