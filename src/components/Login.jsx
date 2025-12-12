import React from "react";
import icon from "../assets/icon_arrow_left.svg";
import { InputText } from "./InputText";
import "./login.css";

export const Login = ({ onBack }) => {
    return (
        <div className="login-container">
            <div className="arrow-left" onClick={onBack} style={{ cursor: 'pointer' }}>
                <img className="icon" alt="Back" src={icon} />
            </div>

            <div className="text-wrapper">로그인</div>

            <div className="label">아이디</div>
            <InputText className="input-group" text="아이디" />

            <div className="label">비밀번호</div>
            <InputText className="input-group" text="비밀번호" type="password" />

            <div className="keep-logged-in">▢ 로그인 상태 유지</div>

            <button className="button-login">
                <div className="button-text">로그인</div>
            </button>

            <div className="find-links">
                아이디 찾기&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 찾기
            </div>
        </div>
    );
};
