import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// 중요: api 대신 boardApi를 가져옵니다.
import { boardApi } from "../api/axiosConfig"; 
import "../styles/mypage/profile-edit-community.css"

export function ProfileEditCommunity() {
  const location = useLocation();
  const navigate = useNavigate();
  // ProfileMyActivity에서 보낸 post 데이터를 받아옴
  const post = location.state?.post;

  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    category: post?.category || "직장 생활",
    anonymous: true
  });

  const categories = [
    { name: "직장 생활", icon: "💻" },
    { name: "인간관계", icon: "👥" },
    { name: "취미/여가", icon: "💭" },
  ];

  const MAX_LENGTH = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "content" && value.length > MAX_LENGTH) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 완료 버튼 클릭 시 실행되는 함수
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      // 수정된 부분: boardApi의 updatePost 함수를 사용합니다.
      // 첫 번째 인자는 ID, 두 번째 인자는 수정할 데이터 객체입니다.
      await boardApi.updatePost(post.id, {
        title: formData.title,
        content: formData.content,
        category: formData.category
      });
      
      alert("게시글이 수정되었습니다.");
      navigate(-1); // 이전 화면(활동 내역)으로 돌아가기
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다. 본인 글인지 확인해주세요.");
    }
  };

  if (!post) return <div style={{padding: '20px'}}>수정할 데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="pec-container">
      {/* Header */}
      <div className="pec-header">
        <span className="pec-cancel" onClick={() => navigate(-1)}>취소</span>
        <span className="pec-title">수정하기</span>
        <span className="pec-complete" onClick={handleSave}>완료</span>
      </div>

      {/* Category Section */}
      <div className="pec-category-section">
        <div className="pec-label">카테고리</div>
        <div className="pec-category-list">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className={`pec-cat-item ${formData.category === cat.name ? 'active' : ''}`}
              onClick={() => setFormData({...formData, category: cat.name})}
            >
              <span className="pec-cat-icon">{cat.icon}</span>
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="pec-input-area">
        <input 
          name="title"
          className="pec-title-input" 
          placeholder="제목" 
          value={formData.title}
          onChange={handleChange}
        />
        <div className="pec-content-box">
          <textarea 
            name="content"
            className="pec-textarea" 
            placeholder="내용을 입력하세요."
            value={formData.content}
            onChange={handleChange}
          />
          <div className="pec-char-limit">
            <span className={formData.content.length >= MAX_LENGTH ? "danger" : ""}>
              {formData.content.length}
            </span>/{MAX_LENGTH}자
          </div>
        </div>
      </div>

      {/* Warning & Anonymous */}
      <div className="pec-footer-info">
        <p className="pec-warning">안전하고 편안한 커뮤니티를 위해 아래 내용을 지켜주세요...</p>
        <div className="pec-anon-check">
           <input 
            type="checkbox" 
            checked={formData.anonymous} 
            onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
           />
           <label>익명</label>
        </div>
      </div>
    </div>
  );
}