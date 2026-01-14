import React, { useState, useEffect } from "react";
import "../styles/mypage/profile.css";
import { ProfileEdit } from "./ProfileEdit";
import { ProfileMyActivity } from "./ProfileMyActivity";
import { ProfileContent } from "./ProfileContent";
import { ProfileLiked } from "./ProfileLiked";
import { ProfileSaved } from "./ProfileSaved"; // 저장 컴포넌트 import
import { ProfileSettings } from "./ProfileSettings";
import api from "../api/axiosConfig";
import { GuestLoginPopup } from "./GuestLoginPopup";

export function Profile({ onNavigate, userName }) {
  /* ================== 1. Hooks (상태 및 효과) ================== */
  const [view, setView] = useState("main"); 
  const [formData, setFormData] = useState({
    name: "사용자",
    job: "-",
    year: "-",
    industry: "-",
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const isGuest = !userName;

  // 내 정보 조회 API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/me");
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    
    if (!isGuest) {
      fetchProfile();
    }
  }, [isGuest, view]);

  // 게스트 제한 로직
  const handleRestrictedClick = (action) => {
    if (isGuest) {
      setShowLoginPopup(true);
    } else {
      if (action) action();
    }
  };

  /* ================== 2. 조건부 렌더링 (화면 전환) ================== */
  if (view === "edit") return <ProfileEdit onBack={() => setView("main")} />;
  if (view === "myPosts") return <ProfileMyActivity onBack={() => setView("main")} />;
  if (view === "contentPreference") return <ProfileContent onBack={() => setView("main")} />;
  if (view === "liked") return <ProfileLiked onBack={() => setView("main")} />;
  // 'saved' 뷰일 때 ProfileSaved 컴포넌트 렌더링
  if (view === "saved") return <ProfileSaved onBack={() => setView("main")} />;
  if (view === "settings") return <ProfileSettings onBack={() => setView("main")} />;

  /* ================== 3. 메인 화면 (Render) ================== */
  return (
    <div className="profile-container">
      {/* 사용자 이름 섹션 */}
      <div className="profile-user-name">
        {isGuest ? "로그인이 필요해요" : `${formData.name}님`}
      </div>

      {/* 설정 아이콘 */}
      <div className="profile-settings-icon" onClick={() => handleRestrictedClick(() => setView("settings"))}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 프로필 정보 카드 */}
      <div className="profile-info-card">
        <div className="profile-card-title">프로필 정보</div>
        <div className="profile-tag-label tag-pos-1">🍦 직급</div>
        <div className="profile-tag-label tag-pos-2">🍦 연차</div>
        <div className="profile-tag-label tag-pos-3">🍦 산업 분야</div>
        <div className="profile-tag-value tag-pos-1">{isGuest ? "-" : formData.job}</div>
        <div className="profile-tag-value tag-pos-2">{isGuest ? "-" : formData.year}</div>
        <div className="profile-tag-value tag-pos-3">{isGuest ? "-" : formData.industry}</div>
        <div className="profile-edit-link" onClick={() => handleRestrictedClick(() => setView("edit"))}>
          수정하기
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      {/* 메뉴 리스트 섹션 */}
      <div className="profile-menu-container">
        <div className="profile-menu-card menu-pos-1">
          <div className="profile-menu-title">내가 쓴 글</div>
          <div className="profile-menu-more" onClick={() => handleRestrictedClick(() => setView("myPosts"))}>
            자세히 보기 <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        <div className="profile-menu-card menu-pos-2">
          <div className="profile-menu-title">콘텐츠</div>
          <div className="profile-menu-more" onClick={() => handleRestrictedClick(() => setView("contentPreference"))}>
            자세히 보기 <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        <div className="profile-menu-card menu-pos-3">
          <div className="profile-menu-title">좋아요</div>
          <div className="profile-menu-more" onClick={() => handleRestrictedClick(() => setView("liked"))}>
            자세히 보기 <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* [연결 부분] 저장 메뉴 카드 */}
        <div className="profile-menu-card menu-pos-4">
          <div className="profile-menu-title">저장</div>
          <div className="profile-menu-more" onClick={() => handleRestrictedClick(() => setView("saved"))}>
            자세히 보기 <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#DADADA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>

      {/* 게스트 로그인 유도 팝업 */}
      {showLoginPopup && (
        <GuestLoginPopup 
          type="absolute" 
          onClose={() => setShowLoginPopup(false)} 
          onLogin={() => { 
            setShowLoginPopup(false); 
            if (onNavigate) onNavigate("onboarding"); 
          }} 
        />
      )}
    </div>
  );
}