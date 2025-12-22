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

  const containerStyle = {
    width: "100%",
    maxWidth: "393px",
    height: "100%",
    maxHeight: "852px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
  };

  return (
    <div style={containerStyle}>
      {screen === "splash" && (
        <Splash
          onClick={() => {
            // [수정 2] 스플래시 화면이 끝나면 세션 스토리지에 '봤음' 표시를 남깁니다.
            sessionStorage.setItem("hasShownSplash", "true");

            // 이후 로그인 여부에 따라 화면 이동
            const token = localStorage.getItem("accessToken");
            if (token) {
              setScreen("home");
            } else {
              setScreen("onboarding");
            }
          }}
        />
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
          {/* [수정] Home에서도 화면 이동과 ID 설정을 동시에 할 수 있도록 함수 전달 */}
          <Home
            onNavigate={(screen, id) => {
              if (id) setSelectedPostId(id); // 게시글 ID 저장
              setScreen(screen); // 화면 전환
            }}
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
          <Community onNavigate={setScreen} />
        </MainLayout>
      )}

      {screen === "postDetail" && (
        <PostDetail onBack={() => setScreen("community")} />
      )}

      {screen === "search" && <Search onNavigate={setScreen} />}

      {screen === "createPost" && <CreatePost onNavigate={setScreen} />}
      {screen === "signup1" && (
        <SignUpStep1
          onNext={() => setScreen("signup2")}
          onBack={() => setScreen("onboarding")}
        />
      )}

      {screen === "signup2" && (
        <SignUpStep2
          onNext={() => setScreen("signup3")}
          onBack={() => setScreen("signup1")}
        />
      )}

      {screen === "signup3" && (
        <SignUpStep3
          onNext={() => setScreen("signup4")}
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
  );
}

export default App;
