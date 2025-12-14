import React, { useState } from "react";
import api from "../api/axiosConfig"; // [중요] 이 줄이 꼭 있어야 합니다!
import "./create-post.css";

export function CreatePost({ onNavigate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("직장 생활");
  // 백엔드는 false가 기본값이므로 초기값을 false로 하거나, 사용자가 선택하도록 함
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleComplete = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      // 백엔드 API 호출
      await api.post("/board", {
        title: title,
        content: content,
        category: category,
        // 백엔드 PostCreateRequest에는 isAnonymous 필드가 없을 수 있으니 확인 필요
        // 만약 게시글 자체도 익명 옵션이 있다면 백엔드 DTO에도 추가해야 함.
        // 현재 백엔드 로직상 게시글 생성 시 익명 여부를 저장하는 로직이 없다면
        // 이 값은 무시되거나 에러가 날 수 있음.
        // (이전 가이드에서는 댓글에만 익명을 추가했음. 게시글에도 필요하다면 백엔드 수정 필요)
      });

      alert("게시글이 등록되었습니다.");
      onNavigate("community"); // 목록 화면으로 이동
    } catch (error) {
      console.error(error);
      alert(
        "글쓰기 실패: " +
          (error.response?.data?.message || "오류가 발생했습니다.")
      );
    }
  };

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

      {/* Category Selection */}
      <div className="cp-category-row">
        <div className="cp-category-label">카테고리</div>
        <div className="cp-category-options">
          {["직장 생활", "인간관계", "취미/여가"].map((cat) => (
            <div
              key={cat}
              className={`cp-cat-option ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Title Input */}
      <div className="cp-input-group title-group">
        <input
          type="text"
          className="cp-title-input"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Content Input */}
      <div className="cp-input-group content-group">
        <textarea
          className="cp-content-input"
          placeholder="내용 작성 공간&#13;&#10;내용 작성 시 주의 사항"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
        />
        <div className="cp-char-count">{content.length}/500자</div>
      </div>

      {/* Bottom Bar (Anonymous) */}
      <div className="cp-bottom-toolbar">
        <div
          className="cp-anon-toggle"
          onClick={() => setIsAnonymous(!isAnonymous)}
        >
          <div
            className="cp-check-box"
            style={{
              background: isAnonymous ? "#27272a" : "#e5e5e5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isAnonymous && (
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.3332 4L5.99984 11.3333L2.6665 8"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="cp-anon-label">익명</div>
        </div>
      </div>
    </div>
  );
}
