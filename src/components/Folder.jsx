import React from "react";
import "./folder.css";

export function Folder({ onNavigate }) {
  return (
    <div className="folder-container">
      <div className="folder-scroll-area">
        {/* Daily/Weekly Toggle (Top Right) */}
        <div className="time-toggle-btn">
          <div className="toggle-text">일간</div>
        </div>

        {/* Today's Mood Section */}
        <div className="section-label" style={{ top: "93px" }}>
          오늘의 내 기분은?
        </div>
        <div className="folder-card check-in-card" style={{ top: "131px" }}>
          <div className="date-text">12월 9일(화)</div>
          <div className="check-in-title">스트레스 체크인 하기</div>
          <div className="check-in-icon">
            <svg width="59" height="59" viewBox="0 0 59 59" fill="none">
              <circle cx="29.5" cy="29.5" r="29.5" fill="#D9D9D9" />
            </svg>
            <div className="icon-question">?</div>
          </div>
        </div>

        {/* Stress Index Trend */}
        <div className="section-label" style={{ top: "240px" }}>
          스트레스 지수 추이 그래프
        </div>
        <div className="folder-card index-card" style={{ top: "278px" }}>
          <div className="score-group left">
            <div className="score-label">내 점수</div>
            <div className="score-value">3.5점</div>
          </div>
          <div className="score-group right">
            <div className="score-label">평균</div>
            <div className="score-value">3점</div>
          </div>
        </div>

        {/* Stress Cause Analysis */}
        <div className="section-label" style={{ top: "375px" }}>
          스트레스 원인 분석
        </div>
        <div className="folder-card cause-card" style={{ top: "410px" }}>
          <div className="cause-title">업무 과다가 가장 많았어요</div>

          {/* Pie Chart Visual Mockup */}
          <div className="chart-area">
            <div className="pie-slice slice-1"></div> {/* Sky */}
            <div className="pie-slice slice-2"></div> {/* Indigo */}
            <div className="pie-slice slice-3"></div> {/* Pink */}
            <div className="pie-label label-1">35%</div>
            <div className="pie-label label-2">50%</div>
            <div className="pie-label label-3">15%</div>
            <div className="legend-area">
              <div className="legend-item">
                <div className="legend-color color-1"></div>
                <div className="legend-text">Content</div>
              </div>
              <div className="legend-item">
                <div className="legend-color color-2"></div>
                <div className="legend-text">Content</div>
              </div>
              <div className="legend-item">
                <div className="legend-color color-3"></div>
                <div className="legend-text">Content</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stress Distribution By Time */}
        <div className="section-label" style={{ top: "635px" }}>
          시간대별 스트레스 분포
        </div>
        <div className="folder-card time-dist-card" style={{ top: "670px" }}>
          <div className="dist-title">오후 6시에 스트레스가 많아요</div>
          <div className="line-graph-placeholder">
            <div className="graph-text">선그래프</div>
          </div>
        </div>
      </div>
    </div>
  );
}
