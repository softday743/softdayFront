import React from "react";
import "./signup-shared.css";

export const InputText = ({ className, text, type = "text" }) => {
    return (
        <div className={`input-text ${className}`}>
            <input type={type} className="text-wrapper-2" placeholder={text} />
        </div>
    );
};
