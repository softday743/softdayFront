import React, { useState, useEffect } from "react";
import "./profile.css";
import api from "../api/axiosConfig";

export function ProfileLiked({ onBack }) {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiked = async () => {
      try {
        const response = await api.get("/user/liked-posts");
        setLikedPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch liked posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLiked();
  }, []);

  return (
    <div className="profile-container">
      <div
        className="edit-back-arrow"
        onClick={onBack}
        style={{ top: "24px", position: "absolute" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className="liked-header-title"
        style={{ position: "relative", marginTop: "20px" }}
      >
        좋아요
      </div>

      <div
        className="liked-list-container"
        style={{
          position: "relative",
          top: "auto",
          marginTop: "40px",
          paddingBottom: "100px",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : likedPosts.length > 0 ? (
          likedPosts.map((post) => (
            <div key={post.id} className="liked-card">
              <div className="liked-card-cat-badge">{post.category}</div>
              <div className="liked-card-title">{post.title}</div>
              <div className="liked-card-time">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="liked-card-footer">
                <span style={{ fontSize: "12px", color: "#a3a3a3" }}>
                  좋아요 {post.likeCount}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div
            className="liked-empty-text"
            style={{ position: "static", marginTop: "50px" }}
          >
            좋아요한 게시글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
