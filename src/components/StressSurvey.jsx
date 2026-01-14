import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import imgQ1 from "../assets/stress_q1.png";
import imgQ2 from "../assets/stress_q2.png";
import imgQ3 from "../assets/stress_q3.png";
import imgQ4 from "../assets/stress_q4.png";
import imgQ5 from "../assets/stress_q5.png";
import introImg from "../assets/stress_intro.png";
import "../styles/home/stress-survey.css";
import api from "../api/axiosConfig";

const QUESTION_IMAGES = {
  1: imgQ1,
  2: imgQ2,
  3: imgQ3,
  4: imgQ4,
  5: imgQ5,
};

export const StressSurvey = ({ onNext, onBack }) => {
  const [qIndex, setQIndex] = useState(0); // 0 = Intro
  const [answers, setAnswers] = useState({});

  const questions = [
    "잠들기 어렵거나 자주 깨는\n날이 있었나요?",
    "평소보다 더 불안하거나\n예민해진 느낌이 있었나요?",
    "집중이 잘 안 되거나\n실수가 늘었다고 느꼈나요?",
    "해야 할 일이 쌓여서\n시작하기가 어려웠나요?",
    "스트레스가 몸으로 나타난 적이 있었나요?\n(예: 두통, 복통, 가슴 답답함 등)",
  ];

  const currentQ = questions[qIndex - 1];
  const currentImg = QUESTION_IMAGES[qIndex];

  const handleComplete = async () => {
    if (Object.keys(answers).length < 5) {
      alert("모든 문항에 답변해주세요.");
      return;
    }

    const payload = [1, 2, 3, 4, 5].map((i) =>
      (answers[i] || "NO").toUpperCase()
    );

    try {
      const response = await api.post("/auth/initial-survey", payload);
      const score = response.data.stressScore;
      onNext(score);
    } catch (error) {
      console.error("Survey save failed", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleNext = (answer) => {
    setAnswers({ ...answers, [qIndex]: answer });

    if (qIndex === 5) {
      return;
    }

    setTimeout(() => {
      if (qIndex < 5) {
        setQIndex(qIndex + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (qIndex > 1) {
      setQIndex(qIndex - 1);
    } else if (qIndex === 1) {
      setQIndex(0); // Go back to intro from Q1
    } else {
      onBack(); // Exit from Intro
    }
  };

  return (
    <div className="stress-survey-container">
      <div className="onbording-steps">
        <div className="step active" />
        <div className="step active" />
        <div
          className="step"
          style={{ backgroundColor: qIndex === 5 ? "#f59e0b" : "#fed7aa" }}
        />
      </div>

      <div
        className="arrow-left"
        onClick={handleBack}
        style={{ cursor: "pointer" }}
      >
        <img className="icon" alt="Back" src={icon} />
      </div>

      {qIndex === 0 ? (
        // Intro Screen
        <>
          <div className="confused-face" style={{ top: "160px" }}>
            <img
              src={introImg}
              alt="Intro"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <p
            className="question-text"
            style={{ top: "240px", whiteSpace: "pre-wrap", lineHeight: "1.5" }}
          >
            최근 7일을 떠올려 주세요.
            <br />
            3일 이상 해당되면 ‘예’를 선택해요
          </p>
          <button className="button-complete" onClick={() => setQIndex(1)}>
            <div className="text-wrapper-complete">확인</div>
          </button>
        </>
      ) : (
        // Question Screen
        <>
          <p className="question-text">
            Q{qIndex}.{" "}
            {currentQ.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>

          <div
            className={`button-choice yes ${
              answers[qIndex] === "yes" ? "selected" : ""
            }`}
            onClick={() => handleNext("yes")}
          >
            <div className="text-wrapper">예</div>
          </div>

          <div
            className={`button-choice no ${
              answers[qIndex] === "no" ? "selected" : ""
            }`}
            onClick={() => handleNext("no")}
          >
            <div className="text-wrapper">아니오</div>
          </div>

          <div className="confused-face">
            <img
              src={currentImg}
              alt={`Question ${qIndex} Image`}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          {qIndex === 5 && (
            <button className="button-complete" onClick={handleComplete}>
              <div className="text-wrapper-complete">완료</div>
            </button>
          )}
        </>
      )}

      <div className="footer-text">스트레스 레벨 설문</div>
    </div>
  );
};
