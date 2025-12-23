import { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import "./signup-step1.css";
import api from "../api/axiosConfig";

export const SignUpStep1 = ({ onNext, onBack, data, setData }) => {
  // data: 부모(App.jsx)에서 내려준 signupData
  const [username, setUsername] = useState(data.username || "");
  const [email, setEmail] = useState(data.email || "");
  const [name, setName] = useState(data.name || ""); // 이름 필드 추가 (필요 시)

  const handleNext = async () => {
    if (!username || !email) {
      alert("아이디와 이메일을 모두 입력해주세요.");
      return;
    }

    try {
      // 1. 상태 저장 (다음 단계로 데이터 넘기기 위해)
      setData({ ...data, username, email, name });

      // 2. 이메일 인증번호 발송 요청
      await api.post("/auth/send-verification-code", { email });

      alert(`인증번호가 ${email}로 발송되었습니다.`);
      onNext(); // Step2(인증번호 입력)로 이동
    } catch (error) {
      console.error("Verification send failed", error);
      alert("인증번호 발송에 실패했습니다. 이메일을 확인해주세요.");
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

      <div className="label">아이디</div>
      <InputText
        text="아이디"
        placeholder="사용할 아이디를 입력해주세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <div className="label">이메일</div>
      <InputText
        text="이메일"
        placeholder="example@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="button-next" onClick={handleNext}>
        <div className="button-text">다음</div>
      </button>
    </div>
  );
};
