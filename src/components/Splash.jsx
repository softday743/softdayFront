import React, { useEffect } from "react";
import logo from "../assets/1.png";
import "./splash.css";

export function Splash({ onClick }) {
  useEffect(() => {
    // 2초(2000ms) 뒤에 onClick 함수를 실행하여 다음 화면으로 넘어갑니다.
    const timer = setTimeout(() => {
      onClick();
    }, 2000);

    // 컴포넌트가 사라질 때 타이머를 정리(cleanup)합니다.
    return () => clearTimeout(timer);
  }, [onClick]);

  return (
    // 여전히 클릭해서 바로 넘어가는 기능도 유지됩니다.
    <div className="splash-container" onClick={onClick}>
      <div className="splash-logo-container">
        <img src={logo} alt="Softday Logo" className="splash-logo" />
      </div>
    </div>
  );
}
