
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from "react-router-dom";
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

// Wrapper for PostDetail to handle useParams
function PostDetailRoute({ userName }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  return <PostDetail postId={postId} userName={userName} onBack={() => navigate("/community")} />;
}

// Wrapper for initial redirect logic
function IndexRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    // Check session
    const hasShownSplash = sessionStorage.getItem("hasShownSplash");
    if (hasShownSplash) {
      const token = localStorage.getItem("accessToken");
      navigate(token ? "/home" : "/onboarding", { replace: true });
    } else {
      navigate("/splash", { replace: true });
    }
  }, [navigate]);
  return null;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [showStorePopup, setShowStorePopup] = useState(false);

  // Signup data state (kept in App to persist across steps)
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    phoneNumber: "010-0000-0000",
  });

  // Helper to determine active tab for BottomNav
  const getActiveTab = (pathname) => {
    if (pathname.startsWith("/home")) return "home";
    if (pathname.startsWith("/community")) return "community";
    if (pathname.startsWith("/chatbot")) return "chatbot";
    if (pathname.startsWith("/statistics")) return "folder"; // Statistics maps to 'folder' tab
    if (pathname.startsWith("/profile")) return "profile";
    return "";
  };
  const activeTab = getActiveTab(location.pathname);

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
            onClick={() => navigate("/onboarding")}
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
          <Routes>
            <Route path="/" element={<IndexRedirect />} />
            
            <Route path="/splash" element={<Splash onClick={() => navigate("/onboarding")} />} />
            
            <Route path="/onboarding" element={
              <Onboarding
                onSignUp={() => navigate("/signup/step1")}
                onLogin={() => navigate("/login")}
                onLookAround={() => {
                   sessionStorage.setItem("hasShownSplash", "true"); // ensure we don't go back to splash
                   navigate("/home");
                }}
              />
            } />

            <Route path="/login" element={
              <Login
                onBack={() => navigate("/onboarding")}
                onFindId={() => navigate("/find-id/email")}
                onFindPw={() => navigate("/find-pw/input")}
                onLogin={(id) => {
                  setUserName(id);
                  navigate("/home");
                }}
              />
            } />

            {/* Signup Flow */}
            <Route path="/signup/step1" element={
              <SignUpStep1
                data={signupData}
                setData={setSignupData}
                onNext={() => navigate("/signup/step2")}
                onBack={() => navigate("/onboarding")}
              />
            } />
            <Route path="/signup/step2" element={
              <SignUpStep2
                data={signupData}
                onNext={() => navigate("/signup/step3")}
                onBack={() => navigate("/signup/step1")}
              />
            } />
            <Route path="/signup/step3" element={
              <SignUpStep3
                data={signupData}
                setData={setSignupData}
                onNext={() => navigate("/signup/step4")}
                onBack={() => navigate("/signup/step2")}
              />
            } />
            <Route path="/signup/step4" element={
              <SignUpStep4
                onNext={() => navigate("/profile-setup")}
                onBack={() => navigate("/signup/step3")}
              />
            } />

            <Route path="/profile-setup" element={
              <ProfileSetup
                onNext={() => navigate("/survey")}
                onBack={() => navigate("/signup/step4")}
              />
            } />

            <Route path="/survey" element={
              <StressSurvey
                onNext={(score) => navigate("/calculating", { state: { score } })}
                onBack={() => {
                  setHasCheckedIn(true);
                  navigate("/home");
                }}
              />
            } />

            <Route path="/calculating" element={
              <Calculating
                userName={userName || "사용자"}
                onFinished={(score) => navigate("/result", { state: { score } })}
              />
            } />

            <Route path="/result" element={
              <StressResult
                onConfirm={() => {
                  setHasCheckedIn(true);
                  navigate("/home");
                }}
                onBack={() => navigate("/survey")}
              />
            } />

            <Route path="/preference" element={
              <ContentPreference
                onComplete={() => navigate("/signup-complete")}
                onBack={() => navigate("/result")}
              />
            } />

            <Route path="/signup-complete" element={
              <SignupComplete
                userName={userName || "사용자"}
                onNext={() => navigate("/service-auth")}
              />
            } />

            <Route path="/service-auth" element={
              <ServiceNotification
                onAllow={() => navigate("/marketing-auth", { state: { general: true } })}
                onDeny={() => navigate("/service-reconfirm")}
              />
            } />

            <Route path="/service-reconfirm" element={
              <ServiceReconfirm
                onAllow={() => navigate("/marketing-auth", { state: { general: true } })}
                onDeny={() => navigate("/marketing-auth", { state: { general: false } })}
              />
            } />

            <Route path="/marketing-auth" element={
              <MarketingNotification
                onAllow={() => navigate("/login")}
                onDeny={() => navigate("/login")}
              />
            } />

            {/* Find ID/PW */}
            <Route path="/find-id/email" element={
              <FindIdEmail
                onNext={() => navigate("/find-id/verify")}
                onBack={() => navigate("/login")}
              />
            } />
            <Route path="/find-id/verify" element={
              <FindIdVerify
                onNext={() => navigate("/find-id/result")}
                onBack={() => navigate("/find-id/email")}
              />
            } />
            <Route path="/find-id/result" element={
              <FindIdResult onLogin={() => navigate("/login")} />
            } />

            <Route path="/find-pw/input" element={
              <FindPwInput
                onNext={() => navigate("/find-pw/verify")}
                onBack={() => navigate("/login")}
                onTabId={() => navigate("/find-id/email")}
              />
            } />
            <Route path="/find-pw/verify" element={
              <FindPwVerify
                onNext={() => navigate("/find-pw/reset")}
                onBack={() => navigate("/find-pw/input")}
                onTabId={() => navigate("/find-id/email")}
              />
            } />
            <Route path="/find-pw/reset" element={
              <FindPwReset
                onNext={() => navigate("/find-pw/complete")}
                onBack={() => navigate("/find-pw/verify")}
                onTabId={() => navigate("/find-id/email")}
              />
            } />
            <Route path="/find-pw/complete" element={
              <FindPwComplete
                onLogin={() => navigate("/login")}
                onTabId={() => navigate("/find-id/email")}
              />
            } />

            {/* Main Tabs */}
            <Route path="/home" element={
              <MainLayout active="home" onNavigate={(tab) => {
                 if(tab === 'folder') navigate('/statistics');
                 else navigate('/' + tab);
              }}>
                <Home
                  onNavigate={(path) => navigate('/' + path)}
                  userName={userName}
                  hasCheckedIn={hasCheckedIn}
                />
              </MainLayout>
            } />

            <Route path="/statistics" element={
              <MainLayout active="folder" onNavigate={(tab) => {
                 if(tab === 'folder') navigate('/statistics');
                 else navigate('/' + tab);
              }}>
                <Statistics hasCheckedIn={hasCheckedIn} userName={userName} onNavigate={(path) => navigate('/' + path)} />
              </MainLayout>
            } />

            <Route path="/chatbot" element={
              <MainLayout active="chatbot" onNavigate={(tab) => {
                 if(tab === 'folder') navigate('/statistics');
                 else navigate('/' + tab);
              }}>
                <Chatbot onNavigate={(path) => navigate('/' + path)} />
              </MainLayout>
            } />

            <Route path="/community" element={
              <MainLayout active="community" onNavigate={(tab) => {
                 if(tab === 'folder') navigate('/statistics');
                 else navigate('/' + tab);
              }}>
                <Community
                  onNavigate={(path) => navigate('/' + path)}
                  onPostClick={(id) => navigate(`/community/post/${id}`)}
                  userName={userName}
                />
              </MainLayout>
            } />
            
            <Route path="/community/post/:postId" element={<PostDetailRoute userName={userName} />} />

            <Route path="/profile" element={
              <MainLayout active="profile" onNavigate={(tab) => {
                 if(tab === 'folder') navigate('/statistics');
                 else navigate('/' + tab);
              }}>
                <Profile onNavigate={(path) => navigate('/' + path)} userName={userName} />
              </MainLayout>
            } />
            
            {/* Other Authenticated Pages */}
            <Route path="/search" element={<Search onNavigate={(path) => navigate('/' + path)} userName={userName} />} />
            <Route path="/create-post" element={<CreatePost onNavigate={(path) => {
                 if (path === 'community') navigate('/community');
                 else navigate('/' + path); // fallback
            }} />} />
            <Route path="/notification" element={<Notification onBack={() => navigate("/home")} />} />
            
            <Route path="/stress-checkin" element={
              <StressCheckIn
                onBack={() => navigate("/home")}
                onComplete={() => {
                  setHasCheckedIn(true);
                  navigate("/home");
                }}
              />
            } />
            
             <Route path="/stress-checkin-stats" element={
              <StressCheckIn
                onBack={() => navigate("/statistics")}
                onComplete={() => {
                  setHasCheckedIn(true);
                  navigate("/statistics");
                }}
              />
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </div>
      {showStorePopup && (
        <StorePopup onClose={() => setShowStorePopup(false)} />
      )}
    </div>
  );
}

export default App;
