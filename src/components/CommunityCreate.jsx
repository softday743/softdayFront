import React, { useState } from "react";
import api from "../api/axiosConfig";
import "./CommunityCreate.css"; // 아래 CSS 코드 참고

export function CommunityCreate({ onNavigate }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "WORK", // 백엔드 Enum 타입에 맞춰 기본값 설정 (WORK, RELATIONSHIP, HOBBY 등)
    isAnonymous: false,
  });

  const categories = [
    { id: "직장 생활", name: "직장 생활", icon: "💻" },
    { id: "인간관계", name: "인간관계", icon: "👥" },
    { id: "취미/여가", name: "취미/여가", icon: "💭" },
  ];

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 500) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      // 백엔드 PostCreateRequest 구조에 맞춰 전송
      await api.post("/board", {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        isAnonymous: formData.isAnonymous,
      });

      alert("게시글이 등록되었습니다.");
      onNavigate("community"); // 등록 후 커뮤니티 목록으로 이동
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="cc-container">
      {/* 헤더 영역 */}
      <div className="cc-header">
        <div className="cc-cancel" onClick={() => onNavigate("community")}>취소</div>
        <div className="cc-header-title">글쓰기</div>
        <div className="cc-done" onClick={handleSubmit}>완료</div>
      </div>

      {/* 카테고리 선택 */}
      <div className="cc-category-section">
        <span className="cc-label">카테고리</span>
        <div className="cc-category-list">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`cc-category-item ${formData.category === cat.id ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, category: cat.id })}
            >
              <span className="cc-cat-icon">{cat.icon}</span>
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* 제목 입력 */}
      <div className="cc-input-group">
        <input
          type="text"
          name="title"
          className="cc-title-input"
          placeholder="제목"
          value={formData.title}
          onChange={handleTextChange}
        />
      </div>

      {/* 내용 입력 영역 */}
      <div className="cc-content-group">
        <div className="cc-char-count">{formData.content.length}/500자</div>
        <textarea
          name="content"
          className="cc-content-input"
          placeholder="안전하고 편안한 커뮤니티를 위해 아래 내용을 지켜주세요.&#10;&#10;존중: 비난/조롱/혐오/싸움 유도는 금지이며 자극적인 표현은 피해주세요.&#10;개인정보 금지: 연락처, 실명, 주소 등 본인 및 타인의 신상은 노출 금지예요."
          value={formData.content}
          onChange={handleTextChange}
        />
        {formData.content.length >= 500 && (
          <p className="cc-limit-warning">500이내로 입력해주세요.</p>
        )}
      </div>

      {/* 익명 체크 (선택 사항) */}
      <div className="cc-anonymous-section" onClick={() => setFormData(prev => ({...prev, isAnonymous: !prev.isAnonymous}))}>
        <div className={`cc-checkbox ${formData.isAnonymous ? "checked" : ""}`}>
          {formData.isAnonymous && "✓"}
        </div>
        <span>익명</span>
      </div>
    </div>
  );
}