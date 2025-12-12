import React from "react";
import "./profile-setup.css";

export const ProfileSetup = ({ onNext }) => {
    return (
        <div className="profile-setup-container">
             <div className="onbording-steps">
                <div className="step active" />
                <div className="step" />
                <div className="step" />
            </div>

            <div className="title">프로필 정보</div>

            <div className="label name-label">이름</div>
            <div className="input-field name-input">
                <div className="input-placeholder">이름</div>
            </div>

            <div className="label job-label">직급</div>
            <div className="input-field job-input">
                <div className="input-placeholder">직급</div>
            </div>

            <div className="label year-label">연차</div>
            <div className="input-field year-input">
                <div className="input-placeholder">연차</div>
            </div>

            <div className="label industry-label">산업 분야</div>
            <div className="input-field industry-input">
                <div className="input-placeholder">산업</div>
            </div>

            <button className="button-next" onClick={onNext}>
                <div className="button-text">다음</div>
            </button>
        </div>
    );
};
