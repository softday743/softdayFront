import React, { useState } from 'react'
import { Splash } from './components/Splash'
import { Onboarding } from './components/Onboarding'
import { SignUpStep1 } from './components/SignUpStep1'
import { SignUpStep2 } from './components/SignUpStep2'
import { SignUpStep3 } from './components/SignUpStep3'
import { SignUpStep4 } from './components/SignUpStep4'
import { Login } from './components/Login'
import { ProfileSetup } from './components/ProfileSetup'
import { StressSurvey } from './components/StressSurvey'
import { Calculating } from './components/Calculating'
import { StressResult } from './components/StressResult'
import { ContentPreference } from './components/ContentPreference'
import { SignupComplete } from './components/SignupComplete'
import { ServiceNotification } from './components/ServiceNotification'
import { MarketingNotification } from './components/MarketingNotification'
import { ServiceReconfirm } from './components/ServiceReconfirm'
import { FindIdEmail } from './components/FindIdEmail'
import { FindIdVerify } from './components/FindIdVerify'
import { FindIdResult } from './components/FindIdResult'
import { FindPwInput } from './components/FindPwInput'
import { FindPwVerify } from './components/FindPwVerify'
import { FindPwReset } from './components/FindPwReset'
import { FindPwComplete } from './components/FindPwComplete'
import { Home } from './components/Home'
import { Community } from './components/Community'
import { PostDetail } from './components/PostDetail'
import { Search } from './components/Search'
import { CreatePost } from './components/CreatePost'
import { Folder } from './components/Folder'
import { Chatbot } from './components/Chatbot'
import { Profile } from './components/Profile'
import api from './api/axiosConfig';

function App() {
  const [screen, setScreen] = useState('splash');

  const containerStyle = {
    width: '100%',
    maxWidth: '393px',
    height: '100%',
    maxHeight: '852px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff'
  };

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    industry: '',
    careerYears: '',
    surveyAnswer: [],
    preferences: { video: false, text: false, audio: false },
    allowNotification: true
  });

  const updateSignupData = (key, value) => {
    setSignupData(prev => ({ ...prev, [key]: value }));
  }

  const handleSignupSubmit = async (finalPreferences) => {
    try {
      // 마지막 단계 데이터(선호 콘텐츠)까지 합치기
      const finalData = {
        ...signupData,
        preferences: finalPreferences
      };

      console.log("회원가입 요청 데이터:", finalData);

      // 백엔드 API 호출
      const response = await api.post('/auth/signup', finalData);
      
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      alert("회원가입 완료! 환영합니다.");
      setScreen('signupComplete'); // 완료 화면으로 이동

    } catch (error) {
      console.error("Signup Failed:", error);
      alert("회원가입에 실패했습니다. " + (error.response?.data || "오류가 발생했습니다."));
    }
  };

  return (
    <div style={containerStyle}>
      {screen === 'splash' && (
        <Splash onClick={() => setScreen('onboarding')} />
      )}
      {screen === 'onboarding' && (
        <Onboarding 
            onSignUp={() => setScreen('signup1')} 
            onLogin={() => setScreen('login')}
            onLookAround={() => setScreen('home')}
        />
      )}
      {screen === 'home' && (
        <Home onNavigate={setScreen} />
      )}
      {screen === 'chatbot' && (
        <Chatbot onNavigate={setScreen} />
      )}
      {screen === 'folder' && (
        <Folder onNavigate={setScreen} />
      )}
      {screen === 'profile' && (
        <Profile onNavigate={setScreen} />
      )}
      {screen === 'community' && (
        <Community onNavigate={setScreen} />
      )}
      {screen === 'postDetail' && (
        <PostDetail onNavigate={setScreen} />
      )}
      {screen === 'search' && (
        <Search onNavigate={setScreen} />
      )}
      {screen === 'createPost' && (
        <CreatePost onNavigate={setScreen} />
      )}
      {screen === 'signup1' && (
        <SignUpStep1
          onNext={() => setScreen('signup2')} 
          onBack={() => setScreen('onboarding')}
          data={signupData}
          onUpdate={updateSignupData}
        />
      )}
      {screen === 'signup2' && (
        <SignUpStep2 
            onNext={() => setScreen('signup3')} 
            onBack={() => setScreen('signup1')}
        />
      )}
      {screen === 'signup3' && (
        <SignUpStep3
          onNext={() => setScreen('signup4')} 
          onBack={() => setScreen('signup2')}
          data={signupData}
          onUpdate={updateSignupData}
        />
      )}
      {screen === 'signup4' && (
        <SignUpStep4 onNext={() => setScreen('profileSetup')} />
      )}
      {screen === 'login' && (
        <Login 
            onBack={() => setScreen('onboarding')} 
            onFindId={() => setScreen('findIdEmail')}
            onFindPw={() => setScreen('findPwInput')}
        />
      )}
      {screen === 'profileSetup' && (
        <ProfileSetup
          onNext={() => setScreen('survey')}
          data={signupData}
          onUpdate={updateSignupData}
        />
      )}
      {screen === 'survey' && (
        <StressSurvey 
            onNext={() => setScreen('calculating')} 
          onBack={() => setScreen('profileSetup')}
          onUpdate={updateSignupData}
        />
      )}
      {screen === 'calculating' && (
        <Calculating onFinished={() => setScreen('result')} />
      )}
      {screen === 'result' && (
        <StressResult onConfirm={() => setScreen('preference')} />
      )}
      {screen === 'preference' && (
        <ContentPreference 
            onComplete={(prefs) => handleSignupSubmit(prefs)} 
        />
      )}
      {screen === 'signupComplete' && (
        <SignupComplete onNext={() => setScreen('serviceAuth')} />
      )}
      {screen === 'serviceAuth' && (
        <ServiceNotification 
          onAllow={() => setScreen('marketingAuth')}
          onDeny={() => setScreen('serviceReconfirm')}
        />
      )}
      {screen === 'serviceReconfirm' && (
        <ServiceReconfirm 
          onAllow={() => setScreen('marketingAuth')}
          onDeny={() => setScreen('marketingAuth')}
        />
      )}
      {screen === 'marketingAuth' && (
        <MarketingNotification 
          onAllow={() => setScreen('onboarding')}
          onDeny={() => setScreen('onboarding')}
        />
      )}
      {screen === 'findIdEmail' && (
        <FindIdEmail 
            onNext={() => setScreen('findIdVerify')} 
            onBack={() => setScreen('login')} 
        />
      )}
      {screen === 'findIdVerify' && (
        <FindIdVerify 
            onNext={() => setScreen('findIdResult')} 
            onBack={() => setScreen('findIdEmail')} 
        />
      )}
      {screen === 'findIdResult' && (
        <FindIdResult onLogin={() => setScreen('login')} />
      )}
      {screen === 'findPwInput' && (
        <FindPwInput 
            onNext={() => setScreen('findPwVerify')} 
            onBack={() => setScreen('login')} 
            onTabId={() => setScreen('findIdEmail')}
        />
      )}
      {screen === 'findPwVerify' && (
        <FindPwVerify 
            onNext={() => setScreen('findPwReset')} 
            onBack={() => setScreen('findPwInput')} 
            onTabId={() => setScreen('findIdEmail')}
        />
      )}
      {screen === 'findPwReset' && (
        <FindPwReset 
            onNext={() => setScreen('findPwComplete')} 
            onBack={() => setScreen('findPwVerify')} 
            onTabId={() => setScreen('findIdEmail')}
        />
      )}
      {screen === 'findPwComplete' && (
        <FindPwComplete 
            onLogin={() => setScreen('login')} 
            onTabId={() => setScreen('findIdEmail')}
        />
      )}
    </div>
  )
}

export default App
