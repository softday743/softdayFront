import React from "react";
import x1 from "./1.png";
import "./style.css";

export const Element = ({ onClick }) => {
    return (
        <div className="splash-container" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img className="img" alt="Element" src={x1} />
        </div>
    );
};
