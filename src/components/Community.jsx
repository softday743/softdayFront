import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "./community.css";

export function Community({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("전체");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/board?size=100");
        setPosts(response.data.content);
      } catch (error) {
        console.error("게시글 로딩 실패", error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts =
    activeTab === "전체"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  return (
    <div className="community-container">
      <div className="community-header">
        {["전체", "직장 생활", "인간관계", "취미/여가"].map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="community-post-list">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="community-post-card"
            onClick={() => onNavigate("postDetail", post.id)}
          >
            <div className="cp-title">{post.title}</div>
            <div className="cp-content">{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
