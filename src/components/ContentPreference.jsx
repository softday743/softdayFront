import React, { useState } from "react";
import iconArrow from "../assets/icon_arrow_left.svg";
import iconVideo from "../assets/icon-video-new.png";
import iconText from "../assets/icon-text-new.png";
import iconAudio from "../assets/icon-audio-new.png";
import "./content-preference.css";

export const ContentPreference = ({ onComplete, onBack }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelection = (type) => {
    if (selected.includes(type)) {
      setSelected(selected.filter((item) => item !== type));
    } else {
      setSelected([...selected, type]);
    }
  };

  return (
    <div className="content-preference-container">
      <div className="onbording-steps">
        <div className="step active" />
        <div className="step active" />
        <div className="step active" />
      </div>

      <p className="question-text">
        마지막 질문!
        <br />
        선호하는 콘텐츠 타입은 무엇인가요?
      </p>

      <div
        className={`checklist-item ${
          selected.includes("video") ? "selected" : ""
        }`}
        onClick={() => toggleSelection("video")}
      >
        <div
          className={`checkbox ${selected.includes("video") ? "checked" : ""}`}
        >
          {selected.includes("video") && (
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <path
                d="M14.1673 4.25L6.37565 12.0417L2.83398 8.5"
                stroke="#F6F6F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="icon-wrapper">
          <img src={iconVideo} alt="Video" />
        </div>
        <div className="label">영상</div>
      </div>

      <div
        className={`checklist-item ${
          selected.includes("text") ? "selected" : ""
        }`}
        onClick={() => toggleSelection("text")}
        style={{ top: "412px" }}
      >
        <div
          className={`checkbox ${selected.includes("text") ? "checked" : ""}`}
        >
          {selected.includes("text") && (
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <path
                d="M14.1673 4.25L6.37565 12.0417L2.83398 8.5"
                stroke="#F6F6F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="icon-wrapper">
          <img src={iconText} alt="Text" />
        </div>
        <div className="label">텍스트</div>
      </div>

      <div
        className={`checklist-item ${
          selected.includes("audio") ? "selected" : ""
        }`}
        onClick={() => toggleSelection("audio")}
        style={{ top: "477px" }}
      >
        <div
          className={`checkbox ${selected.includes("audio") ? "checked" : ""}`}
        >
          {selected.includes("audio") && (
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <path
                d="M14.1673 4.25L6.37565 12.0417L2.83398 8.5"
                stroke="#F6F6F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="icon-wrapper">
          <img src={iconAudio} alt="Audio" />
        </div>
        <div className="label">음성</div>
      </div>

      {selected.length > 0 && (
        <button className="button-complete" onClick={onComplete}>
          <div className="button-text">완료</div>
        </button>
      )}

      <div
        className="arrow-left"
        onClick={onBack}
        style={{ cursor: "pointer" }}
      >
        {/* Navigation back not strictly defined in flow but good to have ui element */}
        <img className="icon" alt="Back" src={iconArrow} />
      </div>

      <div className="title">선호 콘텐츠</div>
    </div>
  );
};
