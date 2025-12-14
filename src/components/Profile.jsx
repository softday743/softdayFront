import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig"; // API 호출을 위해 import
import "./profile.css";
import { ProfileEdit } from "./ProfileEdit";
import { ProfileMyActivity } from "./ProfileMyActivity";
import { ProfileContent } from "./ProfileContent";
import { ProfileLiked } from "./ProfileLiked";
import { ProfileSaved } from "./ProfileSaved";
import { ProfileSettings } from "./ProfileSettings";

export function Profile({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState("main"); // 화면 전환용 상태
  const [formData, setFormData] = useState({
    // 프로필 데이터 상태
    name: "",
    year: "",
    job: "",
    industry: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
        try {
          // 백엔드에서 사용자 정보 가져오기
          const response = await api.get("/user/me");
          const data = response.data;

          setFormData({
            name: data.name || "사용자", // 백엔드 응답 구조에 맞춰 수정 필요
            year: data.careerYears || "",
            job: data.rank || "",
            industry: data.industry || "",
          });
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    fetchProfile();
  }, []);

  // 화면 전환 로직 (하위 컴포넌트가 구현되어 있어야 작동함)
  if (view === "edit") return <ProfileEdit onBack={() => setView("main")} />;
  if (view === "myPosts")
    return <ProfileMyActivity onBack={() => setView("main")} />;
  if (view === "contentPreference")
    return <ProfileContent onBack={() => setView("main")} />;
  if (view === "liked") return <ProfileLiked onBack={() => setView("main")} />;
  if (view === "saved") return <ProfileSaved onBack={() => setView("main")} />;
  if (view === "settings")
    return <ProfileSettings onBack={() => setView("main")} />;

  return (
    <div className="profile-container w-full h-full relative bg-white overflow-hidden">
      {/* Background Content (Recent Conversations - blurred) */}
      <div className="profile-content-blur">
        <div className="recent-chat-title">최근 대화 </div>

        {/* Chat Card 1 (Active/Expanded) */}
        <div className="chat-card-expanded">
          <div className="chat-date">12월 9일(화)</div>
          <div className="chat-status">업무과다, 수면 부족 상태</div>
          <div className="chat-score">3.5점</div>
          <div className="chat-icon-wrapper">
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="55" height="55" fill="url(#pattern0_3_594)" />
              <defs>
                <pattern
                  id="pattern0_3_594"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_3_594" transform="scale(0.0138889)" />
                </pattern>
                <image
                  id="image0_3_594"
                  width="72"
                  height="72"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
        </div>

        {/* User Name */}
        <div className="profile-greeting">{formData.name}님</div>

        {/* Settings Icon */}
        <div className="settings-icon" onClick={() => setView("settings")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0002 15.5C13.9332 15.5 15.5002 13.933 15.5002 12C15.5002 10.067 13.9332 8.5 12.0002 8.5C10.0672 8.5 8.50024 10.067 8.50024 12C8.50024 13.933 10.0672 15.5 12.0002 15.5Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.4 15C19.6366 14.5442 19.9822 14.1643 20.4079 13.8924C20.8336 13.6205 21.3263 13.4646 21.8443 13.4377C21.8967 13.4357 21.949 13.4299 22.0007 13.4206L22.0911 12.9157C22.1158 12.7782 22.1281 12.6391 22.1281 12C22.1281 11.3609 22.1158 11.2217 22.0911 11.0843L22.0007 10.5794C21.949 10.5701 21.8967 10.5642 21.8443 10.5623C21.3263 10.5353 20.8336 10.3794 20.4079 10.1076C19.9822 9.83569 19.6366 9.45571 19.4 8.99997C19.2319 8.67926 19.1444 8.32684 19.1444 7.9696C19.1444 7.61235 19.2319 7.25994 19.4 6.93922L19.4925 6.46788C19.4526 6.34005 19.4074 6.21366 19.3571 6.08906L19.006 5.21639C18.966 5.11674 18.9224 5.01825 18.8754 4.9211C18.5771 4.30155 18.156 3.75053 17.6385 3.30312C17.121 2.8557 16.5181 2.52157 15.8679 2.32185C15.3675 2.16912 14.8354 2.1388 14.3216 2.23377L13.8242 2.32567C13.6826 2.35183 13.5385 2.36502 13.394 2.36502C12.875 2.36502 12.3667 2.21325 11.9365 1.92985C11.5063 1.64644 11.1746 1.24479 10.9856 0.77884L10.7937 0.306024C10.6728 0.23961 10.548 0.177699 10.4194 0.120612L9.51908 1.94726C9.41626 1.90159 9.31174 1.86153 9.20572 1.82736C8.53326 1.60959 7.81057 1.56455 7.11322 1.69695C6.41586 1.82936 5.76951 2.13437 5.24151 2.58046C4.71352 3.02656 4.3232 3.59737 4.11145 4.23351C3.94851 4.72314 3.91617 5.23933 4.01755 5.7324L4.11581 6.20817C4.14321 6.34091 4.1571 6.47605 4.1571 6.61159C4.1571 7.13529 4.00416 7.64795 3.71836 8.08207C3.43256 8.51619 3.02758 8.85108 2.55767 9.04166L2.08051 9.23518C2.01353 9.35624 1.95109 9.48008 1.89354 9.60655L1.5173 10.4331C1.47432 10.5276 1.43673 10.6234 1.40474 10.7204C1.20176 11.3734 1.15783 12.0673 1.27756 12.7381C1.3973 13.4089 1.67694 14.0351 2.08992 14.5583C2.40767 14.961 2.80802 15.2951 3.26787 15.5414C3.71261 15.7533 4.18434 15.8643 4.65866 15.8643C4.8028 15.8643 4.94676 15.8504 5.08945 15.8225L5.56845 15.7291C6.06456 15.6325 6.57724 15.6793 7.04279 15.8633C7.50833 16.0474 7.90623 16.3607 8.18667 16.7645L8.47146 17.1747C8.53982 17.2941 8.60197 17.4165 8.65768 17.5418L9.02102 18.3582C9.06253 18.4514 9.09882 18.5457 9.12971 18.641C9.32559 19.2706 9.36709 19.9392 9.24996 20.5855C9.13283 21.2319 8.86088 21.8349 8.46011 22.3385C7.94056 22.9912 7.23419 23.4682 6.42589 23.6841L12.0002 23.6841C12.0002 23.6841 23 23.6841 23 12C23 6.47715 18.5228 2 13 2L13.8242 2.32567"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Profile Info Card */}
        <div className="info-card" onClick={() => setView("edit")}>
          <div className="card-title">프로필 정보</div>
          <div className="info-details">
            {formData.year ? formData.year : ""}
            <br />
            {formData.job ? formData.job : ""}
            <br />
            {formData.industry ? formData.industry : ""}
          </div>
          <div className="edit-text-btn">수정하기</div>
          <div className="edit-arrow-icon">
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

        {/* Grid Cards */}
        <div
          className="grid-card card-mypost"
          onClick={() => setView("myPosts")}
        >
          <div className="grid-card-title">내가 쓴 글</div>
          <div className="more-text-btn">자세히 보기</div>
          <div className="more-arrow-icon">
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

        <div
          className="grid-card card-content"
          onClick={() => setView("contentPreference")}
        >
          <div className="grid-card-title">콘텐츠</div>
          <div className="more-text-btn">자세히 보기</div>
          <div className="more-arrow-icon">
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

        <div className="grid-card card-like" onClick={() => setView("liked")}>
          <div className="grid-card-title">좋아요</div>
          <div className="more-text-btn">자세히 보기</div>
          <div className="more-arrow-icon">
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

        <div className="grid-card card-save" onClick={() => setView("saved")}>
          <div className="grid-card-title">저장</div>
          <div className="more-text-btn">자세히 보기</div>
          <div className="more-arrow-icon">
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
      </div>

      {!isLoggedIn && (
        <>
          {/* Backdrop Blur Overlay */}
          <div className="profile-overlay" />

          {/* Login Inducement Banner */}
          <div className="login-banner z-20">
            <div className="banner-title">더 많은게 궁금하다면?👀</div>
            <div className="banner-desc">
              로그인으로 소프트데이의
              <br />
              모든 기능을 누려보세요!
            </div>
            <div className="login-btn" onClick={() => onNavigate("login")}>
              <div className="login-btn-text">로그인하러 가기</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
