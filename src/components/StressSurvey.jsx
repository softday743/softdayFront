import React, { useState } from "react";
import icon from "../assets/icon_arrow_left.svg";
import face from "../assets/confused-emoji.png";
import "./stress-survey.css";

export const StressSurvey = ({ onNext, onBack }) => {
    const [qIndex, setQIndex] = useState(1);
    const [answers, setAnswers] = useState({});
    
    const questions = [
        "일 또는 여가 활동을 하는데\n흥미나 즐거움을 느끼지 못함",
        "기분이 가라앉거나 우울하거나\n희망이 없다고 느낌",
        "잠들기 어렵거나 계속 잠자기 어렵거나 또는 너무 많이 잠",
        "피곤하다고 느끼거나\n기운이 거의 없음",
        "식욕이 줄었거나\n또는 너무 많이 먹음"
    ];

    const currentQ = questions[qIndex - 1];

    const handleNext = (answer) => {
        // Update answer state immediately for visual feedback
        setAnswers({ ...answers, [qIndex]: answer });
        
        // On Q5, just save the answer and show complete button
        if (qIndex === 5) {
            return; // Don't advance, wait for complete button click
        }
        
        // Delay transition to next question to show color change
        setTimeout(() => {
            if (qIndex < 5) {
                setQIndex(qIndex + 1);
            }
        }, 300); // 300ms delay to show the color change
    };

    const handleBack = () => {
        if (qIndex > 1) {
            setQIndex(qIndex - 1);
        } else {
            onBack();
        }
    };

    return (
        <div className="stress-survey-container">
             <div className="onbording-steps">
                <div className="step active" />
                <div className="step active" />
                <div className="step" style={{ backgroundColor: qIndex === 5 ? '#f59e0b' : '#fed7aa' }} />
            </div>

            <p className="question-text">
                Q{qIndex}. {currentQ.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </p>

            <div 
                className={`button-choice yes ${answers[qIndex] === 'yes' ? 'selected' : ''}`}
                onClick={() => handleNext('yes')}
            >
                <div className="text-wrapper">예</div>
            </div>

            <div 
                className={`button-choice no ${answers[qIndex] === 'no' ? 'selected' : ''}`}
                onClick={() => handleNext('no')}
            >
                <div className="text-wrapper">아니오</div>
            </div>

            <div className="confused-face">
                <img src={face} alt="Face" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div className="arrow-left" onClick={handleBack} style={{ cursor: 'pointer' }}>
                <img className="icon" alt="Back" src={icon} />
            </div>
            
            {qIndex === 5 && (
                <button className="button-complete" onClick={onNext}>
                     <div className="text-wrapper-complete">완료</div>
                </button>
            )}

            <div className="footer-text">스트레스 레벨 설문</div>
        </div>
    );
};
