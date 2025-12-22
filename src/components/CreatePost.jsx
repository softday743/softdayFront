import React, { useState } from "react";
import "./create-post.css";

export function CreatePost({ onNavigate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("직장 생활");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const MAX_LENGTH = 500;

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_LENGTH) {
      setContent(text);
    }
  };

  const handleComplete = () => {
    if (!title.trim() || !content.trim()) return;
    // incoming 코드 기준: API 호출 없음
    onNavigate("community");
  };

  const isLimitReached = content.length >= MAX_LENGTH;

  return (
    <div className="create-post-container">
      {/* Header */}
      <div className="cp-screen-header">
        <div className="cp-cancel-btn" onClick={() => onNavigate("community")}>
          취소
        </div>
        <div className="cp-screen-title">글쓰기</div>
        <div className="cp-complete-btn" onClick={handleComplete}>
          완료
        </div>
      </div>

      <div className="cp-input-area">
        {/* Category */}
        <div className="cp-category-row">
          <div className="cp-category-label">카테고리</div>
          <div className="cp-category-options">
            <div
              className={`cp-cat-option ${
                category === "직장 생활" ? "active" : ""
              }`}
              onClick={() => setCategory("직장 생활")}
            >
              🖥️ 직장 생활
            </div>
            <div
              className={`cp-cat-option ${
                category === "인간관계" ? "active" : ""
              }`}
              onClick={() => setCategory("인간관계")}
            >
              👥 인간관계
            </div>
            <div
              className={`cp-cat-option ${
                category === "취미/여가" ? "active" : ""
              }`}
              onClick={() => setCategory("취미/여가")}
            >
              💭 취미/여가
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="cp-title-wrapper">
          <input
            type="text"
            className="cp-title-input"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="cp-content-wrapper">
          <textarea
            className="cp-content-input"
            placeholder="내용 작성 공간&#13;&#10;내용 작성 시 주의 사항"
            value={content}
            onChange={handleContentChange}
          />
          <div className="cp-char-count-wrapper">
            <span
              className={`cp-char-current ${
                isLimitReached ? "text-red-500" : ""
              }`}
            >
              {content.length}
            </span>
            <span className="cp-char-limit">/{MAX_LENGTH}자</span>
          </div>
        </div>

        {isLimitReached && (
          <div className="cp-error-msg">500이내로 입력해주세요.</div>
        )}
      </div>

      {/* Anonymous */}
      <div
        className="cp-bottom-toolbar"
        onClick={() => setIsAnonymous(!isAnonymous)}
      >
        <div className={`cp-check-box ${!isAnonymous ? "unchecked" : ""}`}>
          {isAnonymous && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3337 4L6.00033 11.3333L2.66699 8"
                stroke="#F5F5F5"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className={`cp-anon-label ${!isAnonymous ? "unchecked" : ""}`}>
          익명
        </div>
      </div>
    </div>
  );
}
