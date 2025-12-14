import React from "react";
import "./signup-shared.css";

// value와 onChange를 props로 받아 input 태그에 전달해야 합니다.
export const InputText = ({
  className,
  text,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className={`input-text ${className}`}>
      <input
        type={type}
        className="text-wrapper-2"
        placeholder={text}
        value={value} // 추가됨: 상태값 연결
        onChange={onChange} // 추가됨: 입력 이벤트 연결
      />
    </div>
  );
};
