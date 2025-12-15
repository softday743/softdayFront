import React, { useState, useEffect } from "react";
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
import { Search } from "./components/Search";
import { CreatePost } from "./components/CreatePost";
import { Folder } from "./components/Folder";
import { Chatbot } from "./components/Chatbot";
import { Profile } from "./components/Profile";
import api from "./api/axiosConfig";

import { MainLayout } from "./components/MainLayout";

function App() {
  const [screen, setScreen] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token ? "home" : "splash";
  });
  const [selectedPostId, setSelectedPostId] = useState(null);

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

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    rank: "",
    industry: "",
    careerYears: "",
    surveyAnswers: [],
    preferences: { video: false, text: false, audio: false },
    allowNotification: true,
  });

  const updateSignupData = (key, value) => {
    setSignupData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignupSubmit = async (finalPreferences) => {
    try {
      // 마지막 단계 데이터(선호 콘텐츠)까지 합치기
      const finalData = {
        ...signupData,
        preferences: finalPreferences,
      };

      console.log("회원가입 요청 데이터:", finalData);

      // 백엔드 API 호출
      const response = await api.post("/auth/signup", finalData);

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);

      alert("회원가입 완료! 환영합니다.");
      setScreen("signupComplete"); // 완료 화면으로 이동
    } catch (error) {
      console.error("Signup Failed:", error);
      alert(
        "회원가입에 실패했습니다. " +
          (error.response?.data || "오류가 발생했습니다.")
      );
    }
  };

  // [중요] Step 1에서 호출할 "인증번호 발송" 로직
  const handleSendEmail = async () => {
    if (!signupData.email) return alert("이메일을 입력해주세요.");
    try {
      // 로딩 표시 로직 추가 가능
      await api.post("/auth/send-verification-code", {
        email: signupData.email,
      });
      alert("인증번호가 이메일로 전송되었습니다.");
      setScreen("signup2"); // 다음 화면 이동
    } catch (error) {
      console.error(error);
      alert("이메일 전송 실패: " + (error.response?.data || "오류 발생"));
    }
  };

  // [중요] Step 2에서 호출할 "인증번호 확인" 로직
  const handleVerifyCode = async (code) => {
    if (!code) return alert("인증번호를 입력해주세요.");
    try {
      await api.post("/auth/verify-code", {
        email: signupData.email,
        code: code,
      });
      alert("인증 성공!");
      setScreen("signup3"); // 다음 화면 이동
    } catch (error) {
      alert("인증 실패: " + (error.response?.data || "코드를 확인해주세요."));
    }
  };

  return (
    <div style={containerStyle}>
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
          <Home onNavigate={setScreen} />
        </MainLayout>
      )}
      {screen === "chatbot" && (
        <MainLayout active="chatbot" onNavigate={setScreen}>
          <Chatbot onNavigate={setScreen} />
        </MainLayout>
      )}
      {screen === "folder" && (
        <MainLayout active="folder" onNavigate={setScreen}>
          <Folder onNavigate={setScreen} />
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
            onNavigate={(screen, id) => {
              if (id) setSelectedPostId(id);
              setScreen(screen);
            }}
          />
        </MainLayout>
      )}
      {screen === "postDetail" && (
        <PostDetail onNavigate={setScreen} postId={selectedPostId} />
      )}
      {screen === "search" && <Search onNavigate={setScreen} />}
      {screen === "createPost" && <CreatePost onNavigate={setScreen} />}

      {screen === "signup1" && (
        <SignUpStep1
          onNext={handleSendEmail} // API 호출 함수 전달
          onBack={() => setScreen("onboarding")}
          data={signupData}
          onUpdate={updateSignupData}
        />
      )}
      {screen === "signup2" && (
        <SignUpStep2
          onVerify={handleVerifyCode} // 검증 함수 전달
          onBack={() => setScreen("signup1")}
          email={signupData.email} // 이메일 주소 표시용
        />
      )}
      {screen === "signup3" && (
        <SignUpStep3
          onNext={() => setScreen("signup4")}
          onBack={() => setScreen("signup2")}
          data={signupData}
          onUpdate={updateSignupData}
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
          onLoginSuccess={() => setScreen("home")}
        />
      )}
      {screen === "profileSetup" && (
        <ProfileSetup
          onNext={() => setScreen("survey")}
          onBack={() => setScreen("signup4")}
          data={signupData}
          onUpdate={updateSignupData}
        />
      )}
      {screen === "survey" && (
        <StressSurvey
          onNext={() => setScreen("calculating")}
          onBack={() => setScreen("profileSetup")}
          onUpdate={updateSignupData}
        />
      )}
      {screen === "calculating" && (
        <Calculating onFinished={() => setScreen("result")} />
      )}
      {screen === "result" && (
        <StressResult
          onConfirm={() => setScreen("preference")}
          onBack={() => setScreen("survey")}
        />
      )}
      {screen === "preference" && (
        <ContentPreference
          onComplete={(prefs) => handleSignupSubmit(prefs)}
          onBack={() => setScreen("result")}
        />
      )}
      {screen === "signupComplete" && (
        <SignupComplete onNext={() => setScreen("serviceAuth")} />
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
          onAllow={() => setScreen("onboarding")}
          onDeny={() => setScreen("onboarding")}
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
