import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi, clearTokens } from "../api/axiosConfig";
import "../styles/mypage/profile-withdraw.css";

export function ProfileWithdraw({ onBack }) {
  const navigate = useNavigate();
  
  const [step, setStep] = useState("confirm"); // confirm -> reason -> password -> done
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reasonsList = [
    "원하는 기능(콘텐츠)이 부족해요",
    "사용 방법이 어렵거나 불편해요",
    "앱 오류 문제가 있어요",
    "알림이 너무 많아요",
    "커뮤니티 분위기가 불편해요",
    "비슷한(더 나은) 서비스를 사용 중이에요.",
    "이용 빈도가 낮아졌어요",
    "기타"
  ];

  const handleReasonChange = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleWithdraw = async () => {
    try {
      const withdrawData = {
        reasons: selectedReasons.includes("기타") 
          ? [...selectedReasons.filter(r => r !== "기타"), otherReason] 
          : selectedReasons,
        password: password
      };

      await userApi.withdraw(withdrawData);
      clearTokens();
      setStep("done");
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMsg("비밀번호가 틀렸어요. 다시 입력해주세요.");
      } else {
        setErrorMsg("탈퇴 처리 중 오류가 발생했습니다.");
      }
    }
  };

  if (step === "confirm") {
    return (
      <div className="pw-modal-overlay">
        <div className="pw-confirm-modal">
          <p>정말 회원 탈퇴를 진행하시겠어요?</p>
          <p className="pw-modal-subtext">탈퇴 후에는 계정에<br/>다시 로그인할 수 없어요.</p>
          <div className="pw-modal-btns">
            <button className="pw-modal-no" onClick={onBack}>아니오</button>
            <button className="pw-modal-yes" onClick={() => setStep("reason")}>예</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="pw-container">
        <div className="pw-header">
          <div className="pw-back" onClick={() => navigate("/")}>←</div>
          <div className="pw-title">회원탈퇴</div>
        </div>
        <div className="pw-done-content">
          <h2>탈퇴가 완료되었어요.</h2>
          <p>그동안 이용해주셔서 감사합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pw-container">
      <div className="pw-header">
        <div className="pw-back" onClick={onBack}>←</div>
        <div className="pw-title">회원탈퇴</div>
      </div>

      <div className="pw-body">
        {step === "reason" && (
          <>
            <h3 className="pw-question">탈퇴하는 이유가 무엇인가요?</h3>
            <p className="pw-guide">탈퇴 이유를 1개 이상 선택해주세요.</p>
            
            <div className="pw-reasons-list">
              {reasonsList.map((reason, idx) => (
                <label key={idx} className="pw-reason-item">
                  <input 
                    type="checkbox" 
                    checked={selectedReasons.includes(reason)}
                    onChange={() => handleReasonChange(reason)}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            {selectedReasons.includes("기타") && (
              <textarea 
                className="pw-textarea"
                placeholder="기타 사유를 입력해주세요."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            )}

            <button 
              className={`pw-next-btn ${selectedReasons.length > 0 ? "active" : ""}`}
              disabled={selectedReasons.length === 0}
              onClick={() => setStep("password")}
            >
              다음
            </button>
          </>
        )}

        {step === "password" && (
          <>
            <h3 className="pw-question">계정이 삭제돼요.<br/>비밀번호를 인증해주세요.</h3>
            
            <div className="pw-input-group">
              <label>비밀번호</label>
              <div className="pw-password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호 입력"
                  className={errorMsg ? "error" : ""}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if(errorMsg) setErrorMsg(""); 
                  }}
                />
                <button 
                  type="button"
                  className="pw-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errorMsg && <p className="pw-error-text">{errorMsg}</p>}
            </div>

            <button 
              className={`pw-next-btn ${password ? "active" : ""}`}
              disabled={!password}
              onClick={handleWithdraw}
            >
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
}