import React, { useState, useEffect } from "react";
import "./post-detail.css";

export function PostDetail({ onBack }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportStep, setReportStep] = useState("none"); // 'none' | 'category' | 'confirm' | 'complete'
  const [blockStep, setBlockStep] = useState("none"); // 'none' | 'confirm' | 'complete'
  const [selectedReason, setSelectedReason] = useState("");

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (reportStep !== "none" || blockStep !== "none") {
      setReportStep("none");
      setBlockStep("none");
    }
  };

  const handleReportStart = () => {
    setReportStep("category");
    setMenuOpen(false);
  };

  const handleCategorySelect = (reason) => {
    setSelectedReason(reason);
    setReportStep("confirm");
  };

  const handleConfirmReport = () => {
    setReportStep("complete");
    setTimeout(() => setReportStep("none"), 2000);
  };

  const handleCancelReport = () => {
    setReportStep("none");
  };

  const handleBlockStart = () => {
    setBlockStep("confirm");
    setMenuOpen(false);
  };

  const handleConfirmBlock = () => {
    setBlockStep("complete");
    setTimeout(() => setBlockStep("none"), 2000);
  };

  const handleCancelBlock = () => {
    setBlockStep("none");
  };

  const isOverlayVisible =
    reportStep === "confirm" ||
    reportStep === "complete" ||
    blockStep === "confirm" ||
    blockStep === "complete";

  return (
    <div className="post-detail-container">
      {isOverlayVisible && <div className="pd-overlay" />}

      <div className="pd-scroll-area">
        {/* Header */}
        <div className="pd-back-arrow" onClick={onBack}>
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

        <div className="pd-header-title">카테고리</div>

        <div className="pd-menu-dots" onClick={handleMenuClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </div>

        {menuOpen && (
          <div className="pd-menu-dropdown">
            <div className="pd-menu-item" onClick={handleReportStart}>
              신고
            </div>
            <div className="pd-menu-item" onClick={handleBlockStart}>
              차단
            </div>
          </div>
        )}

        {reportStep === "category" && (
          <div className="pd-reason-list">
            <div
              className="pd-reason-item"
              onClick={() => handleCategorySelect("스팸/부적절한 홍보")}
            >
              스팸/부적절한 홍보
            </div>
            <div
              className="pd-reason-item"
              onClick={() => handleCategorySelect("욕설/비하 발언")}
            >
              욕설/비하 발언
            </div>
            <div
              className="pd-reason-item"
              onClick={() => handleCategorySelect("음란물/유해 정보")}
            >
              음란물/유해 정보
            </div>
            <div
              className="pd-reason-item"
              onClick={() => handleCategorySelect("개인정보 노출")}
            >
              개인정보 노출
            </div>
            <div
              className="pd-reason-item"
              onClick={() => handleCategorySelect("기타")}
            >
              기타
            </div>
          </div>
        )}

        {reportStep === "confirm" && (
          <div className="pd-confirm-popup">
            <div className="pd-confirm-title">신고 이유</div>
            <div className="pd-confirm-desc">
              신고 이유 상세 조건 안내
              <br />
              정말 신고하시겠습니까?
            </div>
            <div className="pd-confirm-actions">
              <div className="pd-confirm-btn" onClick={handleCancelReport}>
                취소
              </div>
              <div
                className="pd-confirm-btn"
                onClick={handleConfirmReport}
                style={{ background: "#fef3c7", border: "1px solid #fcd34d" }}
              >
                확인
              </div>
            </div>
          </div>
        )}

        {reportStep === "complete" && (
          <div className="pd-complete-popup">
            <div className="pd-complete-text">신고가 완료되었어요.</div>
          </div>
        )}

        {blockStep === "confirm" && (
          <div className="pd-confirm-popup">
            <div className="pd-confirm-title">차단 안내</div>
            <div className="pd-confirm-desc">
              차단 안내 사항
              <br />
              정말 차단하시겠습니까?
            </div>
            <div className="pd-confirm-actions">
              <div className="pd-confirm-btn" onClick={handleCancelBlock}>
                취소
              </div>
              <div
                className="pd-confirm-btn"
                onClick={handleConfirmBlock}
                style={{ background: "#fef3c7", border: "1px solid #fcd34d" }}
              >
                확인
              </div>
            </div>
          </div>
        )}

        {blockStep === "complete" && (
          <div className="pd-complete-popup" style={{ width: "220px" }}>
            <div className="pd-complete-text">차단이 완료되었어요.</div>
          </div>
        )}

        {/* Static Post UI */}
        <div className="pd-title">제목</div>
        <div className="pd-content">내용</div>
      </div>

      {/* Bottom Input */}
      <div className="pd-comment-input-container">
        <div className="pd-anonymous-text">익명</div>
        <input
          type="text"
          className="pd-input-placeholder"
          placeholder="댓글을 달아주세요"
        />
        <div className="pd-submit-btn">
          <div className="pd-submit-text">댓글</div>
        </div>
      </div>
    </div>
  );
}
