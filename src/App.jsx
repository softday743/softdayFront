import React, { useState } from 'react'
import { Element as Splash } from './components/Splash'
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
    backgroundColor: screen === 'splash' ? '#FFB200' : '#ffffff'
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
        />
      )}
      {screen === 'signup1' && (
        <SignUpStep1 
            onNext={() => setScreen('signup2')} 
            onBack={() => setScreen('onboarding')}
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
        />
      )}
      {screen === 'signup4' && (
        <SignUpStep4 onNext={() => setScreen('profile')} />
      )}
      {screen === 'login' && (
        <Login onBack={() => setScreen('onboarding')} />
      )}
      {screen === 'profile' && (
        <ProfileSetup onNext={() => setScreen('survey')} />
      )}
      {screen === 'survey' && (
        <StressSurvey 
            onNext={() => setScreen('calculating')} 
            onBack={() => setScreen('profile')}
        />
      )}
      {screen === 'calculating' && (
        <Calculating onFinished={() => setScreen('result')} />
      )}
      {screen === 'result' && (
        <StressResult onConfirm={() => setScreen('preference')} />
      )}
      {screen === 'preference' && (
        <ContentPreference onComplete={() => setScreen('onboarding')} />
      )}
    </div>
  )
}

export default App
