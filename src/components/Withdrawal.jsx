import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { clearTokens, userApi } from '../api/axiosConfig';
import '../styles/mypage/Withdrawal.css';
import iconArrowLeft from '../assets/icon_arrow_left.svg';

const Withdrawal = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: 사유선택, 2: 비밀번호인증, 3: 완료
  const [reasons, setReasons] = useState([]);
  const [etcReason, setEtcReason] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const reasonOptions = [
    "원하는 기능(콘텐츠)이 부족해요",
    "사용 방법이 어렵거나 불편해요",
    "앱 오류 문제가 있어요",
    "알림이 너무 많아요",
    "커뮤니티 분위기가 불편해요",
    "비슷한(더 나은) 서비스를 사용 중이에요",
    "이용 빈도가 낮아졌어요",
    "기타"
  ];

  const handleReasonChange = (reason) => {
    if (reasons.includes(reason)) {
      setReasons(reasons.filter(r => r !== reason));
    } else {
      setReasons([...reasons, reason]);
    }
  };

  const handleNextStep = () => {
    if (reasons.length > 0) setStep(2);
  };

  const handleWithdraw = async () => {
    try {
      const payload = {
        password: password,
        reasons: reasons,
        etcReason: reasons.includes("기타") ? etcReason : ""
      };
      await userApi.withdraw(payload);
      clearTokens(); // 토큰 삭제
      setStep(3); // 완료 화면으로
    } catch (err) {
      setError(true); // 비밀번호 틀림 에러 표시
    }
  };

  return (
    <div className="withdrawal-page">
      {/* 헤더 */}
      <header className="withdrawal-header">
        <img src={iconArrowLeft} alt="back" onClick={() => navigate(-1)} />
        <h1>회원탈퇴</h1>
      </header>

      {/* 1단계: 사유 선택 */}
      {step === 1 && (
        <div className="step-container">
          <h2 className="step-title">탈퇴하는 이유가 무엇인가요?</h2>
          <div className="reason-list">
            {reasonOptions.map((reason, idx) => (
              <label key={idx} className="reason-item">
                <input 
                  type="checkbox" 
                  checked={reasons.includes(reason)}
                  onChange={() => handleReasonChange(reason)}
                />
                <span className="checkbox-custom"></span>
                {reason}
              </label>
            ))}
          </div>
          
          {reasons.includes("기타") && (
            <textarea 
              className="etc-textarea"
              placeholder="기타 사유를 입력해주세요."
              value={etcReason}
              onChange={(e) => setEtcReason(e.target.value)}
            />
          )}

          <button 
            className={`next-btn ${reasons.length > 0 ? 'active' : ''}`}
            onClick={handleNextStep}
            disabled={reasons.length === 0}
          >
            다음
          </button>
        </div>
      )}

      {/* 2단계: 비밀번호 인증 */}
      {step === 2 && (
        <div className="step-container">
          <h2 className="step-title">00님의 계정이 삭제돼요.<br/>비밀번호를 인증해주세요.</h2>
          <div className="input-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              className={`pw-input ${error ? 'error' : ''}`}
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError(false);}}
            />
            {error && <p className="error-msg">비밀번호가 틀렸어요. 다시 입력해주세요.</p>}
          </div>
          <button className="confirm-btn active" onClick={handleWithdraw}>확인</button>
        </div>
      )}

      {/* 3단계: 탈퇴 완료 */}
      {step === 3 && (
        <div className="step-container complete">
          <h2 className="step-title">탈퇴가 완료되었어요.<br/>그동안 이용해주셔서 감사합니다.</h2>
          {/* 필요시 홈으로 이동 버튼 추가 */}
        </div>
      )}
    </div>
  );
};

export default Withdrawal;