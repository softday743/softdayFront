import React from "react";
import "../styles/onboarding/find-id.css";

export function FindIdResult({ onLogin, id = "id1234" }) {
  return (
    <div className="find-id-container">
      {/* Header (with login button?) - Reusing header but hiding standard back button */}
      <div className="find-id-header">
        {/* Back button removed as per flow? Or kept? Mockup shows standard header-like structure but also a weird "Go to Login" button. 
                I'll keep the back button behaviorally pointing to login as well if user clicks arrow */}
        <div className="find-id-back-btn" onClick={onLogin}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="find-id-title">아이디 찾기</div>
      </div>

      {/* Tabs */}
      <div className="find-id-tabs">
        <div className="find-id-tab tab-active">
          <div className="find-id-tab-text">아이디</div>
          <div className="find-id-tab-indicator"></div>
        </div>
        <div className="find-id-tab tab-inactive">
          <div className="find-id-tab-text">비밀번호</div>
          <div className="find-id-tab-indicator"></div>
        </div>
      </div>

      <div className="find-id-main-title">아이디를 찾았어요!</div>

      <div className="find-id-subtext" style={{ top: "238px" }}>
        아래 아이디로 로그인해주세요.
      </div>

      <div className="find-id-label" style={{ top: "299px" }}>
        아이디
      </div>

      <div className="find-id-result-box">
        <div className="find-id-result-text">아이디 정보 abcd****</div>
      </div>

      {/* The "Go to Login" button from the bottom of mockup or top? 
                Mockup code said "top-[58px]". Let's check visually. 
                If it's at top 58px, it overlaps the header title? 
                Actually the mockup has "아이디 찾기" title at top 63px. 
                "로그인 하러 가기" button at top 58px.
                They are conflicting space. 
                I will put the "Login" button towards the bottom or prominent spot as per usual UX, 
                OR follow the "top: 58px" relative to... something?
                Ah, wait. The mockup "아이디 찾기 완료" block has `relative`. 
                It has `left-[40px] top-[58px]`. 
                This is likely a mistake in the mockup code provided or it's meant to be a Toast/Banner?
                "로그인 하러 가기" is usually the main CTA.
                I will place it clearly at the bottom or below the result box to be safe and usable.
            */}
      <div
        className="find-id-action-btn btn-amber"
        style={{
          top: "500px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
        }}
        onClick={onLogin}
      >
        <div>로그인 하러 가기</div>
      </div>
    </div>
  );
}
