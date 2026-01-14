import React, { useState } from "react";
import "../styles/community/create-post.css";
import api from "../api/axiosConfig";

export function CreatePost({ onNavigate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("직장 생활");
  const [isAnonymous, setIsAnonymous] = useState(true);

  // Max length constant
  const MAX_LENGTH = 500;

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_LENGTH) {
      setContent(text);
    }
  };

  const handleComplete = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // Map display category to backend ENUM/Code
    let categoryCode = "WORK";
    if (category === "인간관계") categoryCode = "RELATIONSHIP";
    else if (category === "취미/여가") categoryCode = "HOBBY";

    const requestBody = {
      title: title,
      content: content,
      category: categoryCode,
      anonymous: isAnonymous,
    };

    try {
      await api.post("/board", requestBody);
      onNavigate("community");
    } catch (error) {
      console.error("Post creation failed:", error);
      alert("게시글 작성에 실패했습니다.");
    }
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
        {/* Category Selection */}
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

        {/* Title Input */}
        <div className="cp-title-wrapper">
          <input
            type="text"
            className="cp-title-input"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content Input */}
        <div className="cp-content-wrapper">
          <textarea
            className="cp-content-input"
            placeholder="내용 작성 공간&#13;&#10;내용 작성 시 주의 사항"
            value={content}
            onChange={handleContentChange}
            // maxLength is handled by onChange logic for better UX control
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

        {/* Error Message if limit reached */}
        {isLimitReached && (
          <div className="cp-error-msg">500이내로 입력해주세요.</div>
        )}
      </div>

      {/* Bottom Toolbar (Anonymous) */}
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
