import React from "react";
import x2 from "../assets/2.png";
import { Button } from "./Button";

import "./onboarding.css";

export const Onboarding = ({ onSignUp, onLogin, onLookAround }) => {
    return (
        <div className="onboarding-container">
            <div className="onboarding-inner">
                <img className="img" alt="Onboarding" src={x2} />

                <div className="button-group">
                    <div onClick={onSignUp}>
                        <Button className="button-instance" text="회원가입" />
                    </div>
                    <div onClick={onLogin}>
                        <Button className="design-component-instance-node" text="로그인" />
                    </div>
                    <div onClick={onLookAround}>
                        <Button className="button-2" text="둘러보기" />
                    </div>
                </div>
            </div>
        </div>
    );
};
