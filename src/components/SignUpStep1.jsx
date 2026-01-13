import { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import "./signup-step1.css";
import api from "../api/axiosConfig";

export const SignUpStep1 = ({ onNext, onBack, data, setData }) => {
  const [username, setUsername] = useState(data.username || "");
  const [email, setEmail] = useState(data.email || "");
  const [name, setName] = useState(data.name || "");
  
  const [idCheckMsg, setIdCheckMsg] = useState("");
  const [isIdCheckError, setIsIdCheckError] = useState(false);

  const [emailCheckMsg, setEmailCheckMsg] = useState("");
  const [isEmailCheckError, setIsEmailCheckError] = useState(false);

  const handleCheckId = async () => {
    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }
    
    setIdCheckMsg("");
    setIsIdCheckError(false);

    try {
      const response = await api.get("/auth/check-username", { params: { username } });
      if (response.data.isDuplicate) {
        setIdCheckMsg("중복된 아이디가 있습니다.");
        setIsIdCheckError(true);
      } else {
        setIdCheckMsg("중복된 아이디가 없습니다.");
        setIsIdCheckError(false);
      }
    } catch (error) {
      console.error("Check ID error", error);
      setIdCheckMsg("중복 확인 중 오류가 발생했습니다.");
      setIsIdCheckError(true);
    }
  };

  const handleCheckEmail = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    
    setEmailCheckMsg("");
    setIsEmailCheckError(false);

    try {
      const response = await api.get("/auth/check-email", { params: { email } });
      if (response.data.isDuplicate) {
        setEmailCheckMsg("중복된 이메일이 있습니다.");
        setIsEmailCheckError(true);
      } else {
        setEmailCheckMsg("중복된 이메일이 없습니다.");
        setIsEmailCheckError(false);
      }
    } catch (error) {
      console.error("Check Email error", error);
      setEmailCheckMsg("중복 확인 중 오류가 발생했습니다.");
      setIsEmailCheckError(true);
    }
  };

  const handleNext = async () => {
    if (!username || !email) {
      alert("아이디와 이메일을 모두 입력해주세요.");
      return;
    }

    // 이미 확인된 중복 에러가 있다면 진행 불가
    if (isIdCheckError || isEmailCheckError) {
      return;
    }

    try {
      // 1. 아이디 중복 체크 (최종 확인)
      try {
        const idRes = await api.get("/auth/check-username", { params: { username } });
        if (idRes.data.isDuplicate) {
          setIdCheckMsg("중복된 아이디가 있습니다.");
          setIsIdCheckError(true);
          return;
        }
      } catch (err) {
        console.warn("ID check failed", err);
      }

      // 2. 이메일 중복 체크 (최종 확인)
      try {
        const emailRes = await api.get("/auth/check-email", { params: { email } });
        if (emailRes.data.isDuplicate) {
          setEmailCheckMsg("중복된 이메일이 있습니다.");
          setIsEmailCheckError(true);
          return;
        }
      } catch (err) {
        console.warn("Email check failed", err);
      }

      // 3. 상태 저장
      setData({ ...data, username, email, name });

      // 4. 이메일 인증번호 발송 요청
      await api.post("/auth/send-verification-code", { email });

      alert(`인증번호가 ${email}로 발송되었습니다.`);
      onNext(); 
    } catch (error) {
      console.error("Verification send failed", error);
      if (error.response && error.response.status === 409) {
        setEmailCheckMsg("중복된 이메일이 있습니다.");
        setIsEmailCheckError(true);
      } else {
        alert("인증번호 발송에 실패했습니다. 이메일 형식을 확인하거나 이미 가입된 계정인지 확인해주세요.");
      }
    }
  };

  return (
    <div className="signup-step1-container">
      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      <div className="text-wrapper">회원가입</div>

      <div
        style={{
          width: "calc(100% - 32px)",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <div className="label" style={{ marginLeft: 0 }}>
          아이디
        </div>
        <div style={{ position: "relative" }}>
          <InputText
            className="input-with-btn"
            text="아이디"
            placeholder="사용할 아이디를 입력해주세요"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIdCheckMsg("");
            }}
          />
          <button
            onClick={handleCheckId}
            style={{
              position: "absolute",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              height: "28px",
              padding: "0 10px",
              borderRadius: "14px",
              border: "none",
              background: "#F59E0B",
              color: "white",
              fontSize: "11px",
              fontWeight: "bold",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            중복확인
          </button>
        </div>
        {idCheckMsg && (
          <div
            style={{
              color: isIdCheckError ? "#ef4444" : "#10b981",
              fontSize: "12px",
              marginTop: "6px",
              marginLeft: "4px",
            }}
          >
            {idCheckMsg}
          </div>
        )}
      </div>

      <div
        style={{
          width: "calc(100% - 32px)",
          maxWidth: "400px",
          margin: "0 auto",
          marginTop: idCheckMsg ? "10px" : "20px",
        }}
      >
        <div className="label" style={{ marginLeft: 0 }}>
          이메일
        </div>
        <div style={{ position: "relative" }}>
          <InputText
            className="input-with-btn"
            text="이메일"
            placeholder="example@email.com"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailCheckMsg("");
            }}
          />
          <button
            onClick={handleCheckEmail}
            style={{
              position: "absolute",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              height: "28px",
              padding: "0 10px",
              borderRadius: "14px",
              border: "none",
              background: "#F59E0B",
              color: "white",
              fontSize: "11px",
              fontWeight: "bold",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            중복확인
          </button>
        </div>
        {emailCheckMsg && (
          <div
            style={{
              color: isEmailCheckError ? "#ef4444" : "#10b981",
              fontSize: "12px",
              marginTop: "6px",
              marginLeft: "4px",
            }}
          >
            {emailCheckMsg}
          </div>
        )}
      </div>
      <button
        className="button-next"
        onClick={handleNext}
        disabled={isIdCheckError || isEmailCheckError}
        style={{
          width: "calc(100% - 32px)",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
          opacity: (isIdCheckError || isEmailCheckError) ? 0.5 : 1,
          cursor: (isIdCheckError || isEmailCheckError) ? "not-allowed" : "pointer",
        }}
      >
        <div className="button-text">다음</div>
      </button>
    </div>
  );
};
