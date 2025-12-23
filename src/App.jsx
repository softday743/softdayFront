import React, { useState } from "react";
import { Splash } from "./components/Splash";
import { Onboarding } from "./components/Onboarding";
import { SignUpStep1 } from "./components/SignUpStep1";
import { SignUpStep2 } from "./components/SignUpStep2";
import { SignUpStep3 } from "./components/SignUpStep3";
import { SignUpStep4 } from "./components/SignUpStep4";
import { Login } from "./components/Login";
import { ProfileSetup } from "./components/ProfileSetup";
import { StressSurvey } from "./components/StressSurvey";
import { Calculating } from "./components/Calculating";
import { StressResult } from "./components/StressResult";
import { ContentPreference } from "./components/ContentPreference";
import { SignupComplete } from "./components/SignupComplete";
import { ServiceNotification } from "./components/ServiceNotification";
import { MarketingNotification } from "./components/MarketingNotification";
import { ServiceReconfirm } from "./components/ServiceReconfirm";
import { FindIdEmail } from "./components/FindIdEmail";
import { FindIdVerify } from "./components/FindIdVerify";
import { FindIdResult } from "./components/FindIdResult";
import { FindPwInput } from "./components/FindPwInput";
import { FindPwVerify } from "./components/FindPwVerify";
import { FindPwReset } from "./components/FindPwReset";
import { FindPwComplete } from "./components/FindPwComplete";
import { Home } from "./components/Home";
import { Community } from "./components/Community";
import { PostDetail } from "./components/PostDetail";
import { StressCheckIn } from "./components/StressCheckIn";
import { Search } from "./components/Search";
import { CreatePost } from "./components/CreatePost";
import { Statistics } from "./components/Statistics";
import { Chatbot } from "./components/Chatbot";
import { Profile } from "./components/Profile";
import { Notification } from "./components/Notification";

import { MainLayout } from "./components/MainLayout";
import { StorePopup } from "./components/StorePopup";

// Landing Page Style & Assets
import "./landing.css";
import logoHeader from "./assets/logo_header.png";
import btnTryApp from "./assets/btn_try_app.png";
import badgeAppStore from "./assets/badge_appstore.png";
import badgeGooglePlay from "./assets/badge_googleplay.png";

import api from "./api/axiosConfig";

function App() {
  const [screen, setScreen] = useState(() => {
    // 'hasShownSplash' 값이 세션 스토리지에 있는지 확인
    const hasShownSplash = sessionStorage.getItem("hasShownSplash");

    if (hasShownSplash) {
      // 이미 스플래시를 본 적이 있다면(새로고침 등), 토큰 확인 후 바로 해당 화면으로 이동
      const token = localStorage.getItem("accessToken");
      return token ? "home" : "onboarding";
    }

    // 세션 스토리지에 값이 없다면(첫 진입), 스플래시 화면으로 시작
    return "splash";
  });
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userName, setUserName] = useState("");
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [showStorePopup, setShowStorePopup] = useState(false);

  // [추가] 회원가입 데이터를 단계별로 저장할 상태
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    phoneNumber: "010-0000-0000", // 기본값 또는 추가 입력 필요
  });

  // 게시글 상세 화면으로 이동하는 함수
  const goToPostDetail = (postId) => {
    setSelectedPostId(postId);
    setScreen("postDetail");
  };

  // Styles moved to landing.css

  return (
    <div className="landing-container">
      <div className="landing-left">
        <img src={logoHeader} alt="Softday Logo" className="landing-logo" />
        <h1 className="landing-title">
          바쁜 하루 속 내 마음을 돌보는 시간
          <span className="highlight">일로 지친 마음을 챙기는 소프트데이</span>
        </h1>
        <div className="landing-cta-container">
          <img
            src={btnTryApp}
            alt="앱으로 사용해보기"
            className="btn-try-app"
          />
          <div className="store-badges">
            <img
              src={badgeGooglePlay}
              alt="Google Play"
              className="store-badge"
              onClick={() => setShowStorePopup(true)}
            />
            <img
              src={badgeAppStore}
              alt="App Store"
              className="store-badge"
              onClick={() => setShowStorePopup(true)}
            />
          </div>
        </div>
      </div>

      <div className="landing-right">
        <div className="mobile-frame-wrapper">
          {screen === "splash" && (
            <Splash onClick={() => setScreen("onboarding")} />
          )}
          {screen === "onboarding" && (
            <Onboarding
              onSignUp={() => setScreen("signup1")}
              onLogin={() => setScreen("login")}
              onLookAround={() => setScreen("home")}
            />
          )}
          {screen === "home" && (
            <MainLayout active="home" onNavigate={setScreen}>
              <Home
                onNavigate={setScreen}
                userName={userName}
                hasCheckedIn={hasCheckedIn}
              />
            </MainLayout>
          )}
          {screen === "chatbot" && (
            <MainLayout active="chatbot" onNavigate={setScreen}>
              <Chatbot onNavigate={setScreen} />
            </MainLayout>
          )}
          {screen === "folder" && (
            <MainLayout active="folder" onNavigate={setScreen}>
              <Statistics hasCheckedIn={hasCheckedIn} onNavigate={setScreen} />
            </MainLayout>
          )}
          {screen === "profile" && (
            <MainLayout active="profile" onNavigate={setScreen}>
              <Profile onNavigate={setScreen} />
            </MainLayout>
          )}
          {screen === "community" && (
            <MainLayout active="community" onNavigate={setScreen}>
              <Community
                onNavigate={setScreen}
                onPostClick={goToPostDetail} // [수정] 상세 페이지 이동 함수 전달
              />
            </MainLayout>
          )}
          {screen === "postDetail" && (
            <PostDetail
              postId={selectedPostId} // [수정] 선택된 게시글 ID 전달
              onBack={() => setScreen("community")}
            />
          )}
          {screen === "search" && <Search onNavigate={setScreen} />}
          {screen === "createPost" && <CreatePost onNavigate={setScreen} />}
          {screen === "notification" && (
            <Notification onBack={() => setScreen("home")} />
          )}
          {screen === "stressCheckIn" && (
            <StressCheckIn
              onBack={() => setScreen("home")}
              onComplete={() => {
                setHasCheckedIn(true);
                setScreen("home");
              }}
            />
          )}
          {screen === "stressCheckInStats" && (
            <StressCheckIn
              onBack={() => setScreen("statistics")}
              onComplete={() => {
                setHasCheckedIn(true);
                setScreen("statistics"); // Or refresh statistics
              }}
            />
          )}
          {screen === "signup1" && (
            <SignUpStep1
              data={signupData} // [추가] 데이터 전달
              setData={setSignupData} // [추가] 상태 변경 함수 전달
              onNext={() => setScreen("signup2")}
              onBack={() => setScreen("onboarding")}
            />
          )}
          {screen === "signup2" && (
            <SignUpStep2
              data={signupData}
              onNext={() => setScreen("signup3")}
              onBack={() => setScreen("signup1")}
            />
          )}
          {screen === "signup3" && (
            <SignUpStep3
              data={signupData} // [추가]
              setData={setSignupData} // [추가]
              onNext={() => setScreen("signup4")} // 여기서 API 호출 예정
              onBack={() => setScreen("signup2")}
            />
          )}
          {screen === "signup4" && (
            <SignUpStep4
              onNext={() => setScreen("profileSetup")}
              onBack={() => setScreen("signup3")}
            />
          )}
          {screen === "login" && (
            <Login
              onBack={() => setScreen("onboarding")}
              onFindId={() => setScreen("findIdEmail")}
              onFindPw={() => setScreen("findPwInput")}
              onLogin={(id) => {
                setUserName(id);
                setScreen("home");
              }}
            />
          )}
          {screen === "profileSetup" && (
            <ProfileSetup
              onNext={() => setScreen("survey")}
              onBack={() => setScreen("signup4")}
            />
          )}
          {screen === "survey" && (
            <StressSurvey
              onNext={() => setScreen("calculating")}
              onBack={() => {
                setHasCheckedIn(true);
                setScreen("home");
              }}
            />
          )}
          {screen === "calculating" && (
            <Calculating
              onFinished={() => setScreen("result")}
              userName={userName || "사용자"}
            />
          )}
          {screen === "result" && (
            <StressResult
              onConfirm={() => {
                setHasCheckedIn(true);
                setScreen("home");
              }}
              onBack={() => setScreen("survey")}
            />
          )}
          {screen === "preference" && (
            <ContentPreference
              onComplete={() => setScreen("signupComplete")}
              onBack={() => setScreen("result")}
            />
          )}
          {screen === "signupComplete" && (
            <SignupComplete
              onNext={() => setScreen("serviceAuth")}
              userName={userName || "사용자"}
            />
          )}
          {screen === "serviceAuth" && (
            <ServiceNotification
              onAllow={() => setScreen("marketingAuth")}
              onDeny={() => setScreen("serviceReconfirm")}
            />
          )}
          {screen === "serviceReconfirm" && (
            <ServiceReconfirm
              onAllow={() => setScreen("marketingAuth")}
              onDeny={() => setScreen("marketingAuth")}
            />
          )}
          {screen === "marketingAuth" && (
            <MarketingNotification
              onAllow={() => setScreen("login")}
              onDeny={() => setScreen("login")}
            />
          )}
          {screen === "findIdEmail" && (
            <FindIdEmail
              onNext={() => setScreen("findIdVerify")}
              onBack={() => setScreen("login")}
            />
          )}
          {screen === "findIdVerify" && (
            <FindIdVerify
              onNext={() => setScreen("findIdResult")}
              onBack={() => setScreen("findIdEmail")}
            />
          )}
          {screen === "findIdResult" && (
            <FindIdResult onLogin={() => setScreen("login")} />
          )}
          {screen === "findPwInput" && (
            <FindPwInput
              onNext={() => setScreen("findPwVerify")}
              onBack={() => setScreen("login")}
              onTabId={() => setScreen("findIdEmail")}
            />
          )}
          {screen === "findPwVerify" && (
            <FindPwVerify
              onNext={() => setScreen("findPwReset")}
              onBack={() => setScreen("findPwInput")}
              onTabId={() => setScreen("findIdEmail")}
            />
          )}
          {screen === "findPwReset" && (
            <FindPwReset
              onNext={() => setScreen("findPwComplete")}
              onBack={() => setScreen("findPwVerify")}
              onTabId={() => setScreen("findIdEmail")}
            />
          )}
          {screen === "findPwComplete" && (
            <FindPwComplete
              onLogin={() => setScreen("login")}
              onTabId={() => setScreen("findIdEmail")}
            />
          )}
        </div>
      </div>
      {showStorePopup && (
        <StorePopup onClose={() => setShowStorePopup(false)} />
      )}
    </div>
  );
}

export default App;
