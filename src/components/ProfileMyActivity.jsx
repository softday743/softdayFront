import React, { useState, useEffect } from "react";
import "./profile.css";
import api from "../api/axiosConfig";

export function ProfileMyActivity({ onBack }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [myPosts, setMyPosts] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivity();
  }, [activeTab]);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      if (activeTab === "posts") {
        const response = await api.get("/user/posts");
        setMyPosts(response.data);
      } else {
        const response = await api.get("/user/comments");
        setMyComments(response.data);
      }
    } catch (error) {
      console.error("Activity fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

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
        className="edit-header-title"
        style={{ position: "relative", marginTop: "20px" }}
      >
        내가 쓴 글
      </div>

      <div
        className="mypost-tab-container"
        style={{ position: "relative", top: "auto", marginTop: "20px" }}
      >
        <div
          className={`mypost-tab ${
            activeTab === "posts" ? "active" : "inactive"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          게시글
          {activeTab === "posts" && (
            <div className="mypost-tab-indicator"></div>
          )}
        </div>
        <div
          className={`mypost-tab ${
            activeTab === "comments" ? "active" : "inactive"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          댓글
          {activeTab === "comments" && (
            <div className="mypost-tab-indicator"></div>
          )}
        </div>
      </div>

      <div
        className="mypost-list-container"
        style={{
          position: "relative",
          top: "auto",
          height: "auto",
          marginTop: "20px",
          paddingBottom: "100px",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            Loading...
          </div>
        ) : activeTab === "posts" ? (
          myPosts.length > 0 ? (
            myPosts.map((post) => (
              <div key={post.id} className="mypost-card">
                <div className="mypost-card-category-wrapper">
                  <div className="mypost-card-category">{post.category}</div>
                </div>
                <div className="mypost-card-title">{post.title}</div>
                <div className="mypost-card-time">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="mypost-card-footer">
                  <span style={{ fontSize: "12px", color: "#a3a3a3" }}>
                    좋아요 {post.likeCount}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#a3a3a3",
                      marginLeft: "10px",
                    }}
                  >
                    조회 {post.viewCount}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div
              className="mypost-empty-text"
              style={{ position: "static", marginTop: "50px" }}
            >
              작성된 게시글이 없습니다.
            </div>
          )
        ) : myComments.length > 0 ? (
          myComments.map((comment) => (
            <div key={comment.id} className="mypost-comment-card">
              <div className="comment-content">{comment.content}</div>
              <div
                className="comment-time"
                style={{ fontSize: "12px", color: "#a3a3a3" }}
              >
                원글: {comment.postTitle} |{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div
            className="mypost-empty-text"
            style={{ position: "static", marginTop: "50px" }}
          >
            작성된 댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
