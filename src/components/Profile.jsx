import React, { useState } from "react";
import "./profile.css";
import { ProfileEdit } from "./ProfileEdit";
import { ProfileMyActivity } from "./ProfileMyActivity";
import { ProfileContent } from "./ProfileContent";
import { ProfileLiked } from "./ProfileLiked";
import { ProfileSaved } from "./ProfileSaved";
import { ProfileSettings } from "./ProfileSettings";

export function Profile({ onNavigate }) {
  const [view, setView] = useState("main");
  // 'main' | 'edit' | 'myPosts' | 'contentPreference' | 'liked' | 'saved' | 'settings'

  // Dummy data (incoming 코드 기준)
  const [formData] = useState({
    name: "00",
    job: "대리",
    year: "3년차",
    industry: "마케팅",
  });

  /* ================== View Routing ================== */
  if (view === "edit") return <ProfileEdit onBack={() => setView("main")} />;
  if (view === "myPosts")
    return <ProfileMyActivity onBack={() => setView("main")} />;
  if (view === "contentPreference")
    return <ProfileContent onBack={() => setView("main")} />;
  if (view === "liked") return <ProfileLiked onBack={() => setView("main")} />;
  if (view === "saved") return <ProfileSaved onBack={() => setView("main")} />;
  if (view === "settings")
    return <ProfileSettings onBack={() => setView("main")} />;

  /* ================== Render: Profile Main ================== */
  return (
    <div className="profile-container">
      {/* User Name */}
      <div className="profile-user-name">{formData.name}님</div>

      {/* Settings Icon */}
      <div
        className="profile-settings-icon"
        onClick={() => setView("settings")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#656565"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005..."
            stroke="#656565"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Profile Info Card */}
      <div className="profile-info-card">
        <div className="profile-card-title">프로필 정보</div>

        {/* Labels */}
        <div className="profile-tag-label tag-pos-1">🍦 직급</div>
        <div className="profile-tag-label tag-pos-2">🍦 연차</div>
        <div className="profile-tag-label tag-pos-3">🍦 산업 분야</div>

        {/* Values */}
        <div className="profile-tag-value tag-pos-1">{formData.job}</div>
        <div className="profile-tag-value tag-pos-2">{formData.year}</div>
        <div className="profile-tag-value tag-pos-3">{formData.industry}</div>

        <div className="profile-edit-link" onClick={() => setView("edit")}>
          수정하기
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 13.5L11.25 9L6.75 4.5"
              stroke="#DADADA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="profile-menu-card menu-pos-1">
        <div className="profile-menu-title">내가 쓴 글</div>
        <div className="profile-menu-more" onClick={() => setView("myPosts")}>
          자세히 보기
        </div>
      </div>

      <div className="profile-menu-card menu-pos-2">
        <div className="profile-menu-title">콘텐츠</div>
        <div
          className="profile-menu-more"
          onClick={() => setView("contentPreference")}
        >
          자세히 보기
        </div>
      </div>

      <div className="profile-menu-card menu-pos-3">
        <div className="profile-menu-title">좋아요</div>
        <div className="profile-menu-more" onClick={() => setView("liked")}>
          자세히 보기
        </div>
      </div>

      <div className="profile-menu-card menu-pos-4">
        <div className="profile-menu-title">저장</div>
        <div className="profile-menu-more" onClick={() => setView("saved")}>
          자세히 보기
        </div>
      </div>
    </div>
  );
}
