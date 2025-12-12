import React from "react";
import "./signup-step4.css";

export const SignUpStep4 = ({ onNext }) => {
    return (
        <div className="signup-step4-container">
            <div className="message-container">
                <div className="title">
                    회원가입 완료되었어요🎉
                </div>
                <div className="subtitle">
                    소프트데이를 시작하기 전<br />딱 세가지만 먼저 진행할게요!
                </div>
            </div>
            
            <button className="button-next" onClick={onNext} style={{
                position: 'absolute',
                bottom: '48px',
                all: 'unset',
                backgroundColor: '#c8c8c8',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '56px',
                width: '330px',
                cursor: 'pointer'
            }}>
                <div style={{ color: '#000000', fontSize: '16px', fontWeight: '600' }}>다음</div>
            </button>
        </div>
    );
};
