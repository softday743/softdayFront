import React from 'react';
import './statistics.css';

export function Statistics({ hasCheckedIn, onNavigate }) {
    return (
        <div className="statistics-container">
            {/* Header */}
            <div className="stat-header-title">
                {hasCheckedIn ? '오전 9시에 스트레스가 가장 높아요' : '오늘의 스트레스를 확인해보세요'}
            </div>
            <div className="stat-header-sub">
                {hasCheckedIn ? '✅ 오늘의 기분이 기록되었어요' : '✅ 아직 오늘의 기록이 없어요'}
            </div>

            {/* Date Selector (Top Right) */}
            <div className="stat-date-selector">
                <div className="stat-top-selector">일간</div>
            </div>

            {/* Mood Card */}
            {!hasCheckedIn ? (
                <div className="stat-mood-card" onClick={() => onNavigate && onNavigate('stressCheckInStats')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>오늘의 기분을 기록해 볼까요?</div>
                    <div style={{ fontSize: '40px' }}>☺️</div>
                </div>
            ) : (
                <div className="stat-mood-card">
                    <div className="stat-mood-date">12월 9일(화)</div>
                    <div className="stat-mood-emoji">😐</div>
                    <div className="stat-mood-score">3점</div>
                    <div className="stat-mood-reason">업무과다, 수면 부족</div>
                </div>
            )}

            {/* Stress Index Graph */}
            <div className="stat-graph-title">스트레스 지수 추이 그래프</div>
            <div className="stat-graph-card">
                <div className="stat-graph-btn score-label">🔍 내 점수</div>
                <div className="stat-graph-value my-score">3점</div>
                <div className="stat-graph-btn avg-label">🔍 평균 점수</div>
                <div className="stat-graph-value avg-score">2점</div>
            </div>

            {/* Stress Cause Analysis */}
            <div className="stat-analysis-title">스트레스 원인 분석</div>
            <div className="stat-analysis-card">
                <div className="stat-analysis-content-title">업무 과다가 가장 많았어요</div>
                
                {/* Pie Chart SVG and Legend */}
                <div className="stat-pie-chart">
                    {/* Simplified representation of the pie chart provided */}
                    <svg width="250" height="150" viewBox="0 0 250 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="50" r="40" fill="#FDBA74" stroke="none" /> {/* Orange part placeholder */}
                        <circle cx="40" cy="50" r="30" fill="#D8B4FE" stroke="none" transform="translate(10, -10)" /> {/* Purple part placeholder - simplified */}
                        
                        {/* Legend */}
                        <g transform="translate(120, 20)">
                            <circle cx="8" cy="8" r="4" fill="#D2B3FF"/>
                            <text x="20" y="12" fontSize="12" fill="black">업무과다</text>
                            
                            <circle cx="8" cy="38" r="4" fill="#F9D079"/>
                            <text x="20" y="42" fontSize="12" fill="black">성과압박</text>
                            
                            <circle cx="8" cy="68" r="4" fill="#97CA72"/>
                            <text x="20" y="72" fontSize="12" fill="black">인간관계</text>
                        </g>

                        {/* Percentages */}
                        <text x="20" y="50" fontSize="10" fill="white">35%</text>
                        <text x="50" y="30" fontSize="10" fill="white">50%</text>
                    </svg>
                </div>
            </div>

            {/* Time Distribution */}
            <div className="stat-time-title">시간대별 스트레스 분포</div>
            <div className="stat-time-card">
                <div className="stat-time-chart">
                    <svg width="288" height="80" viewBox="0 0 288 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Bar Chart Svg from user */}
                        <path d="M0.5 76.5V23.5L20 20.5L40 5.5L55 9L77 17.5L97 32L120 25.5L140 22.5L160 30L178 37.5L198 49L218 56.5L237 61L263 70.5L288 76.5H0.5Z" fill="#FFF9EA" stroke="#FD9800" strokeLinejoin="round"/>
                        {/* Dots */}
                        <circle cx="20" cy="20.5" r="3" fill="white" stroke="#FD9800"/>
                        <circle cx="40" cy="5.5" r="3" fill="#FD9800" stroke="#FD9800"/>
                        <circle cx="55" cy="9" r="3" fill="white" stroke="#FD9800"/>
                        <circle cx="77" cy="17.5" r="3" fill="white" stroke="#FD9800"/>
                        <circle cx="97" cy="32" r="3" fill="white" stroke="#FD9800"/>
                        <circle cx="120" cy="25.5" r="3" fill="white" stroke="#FD9800"/>
                        {/* ... more dots */}
                    </svg>
                    {/* Time Labels */}
                    <div style={{display:'flex', justifyContent:'space-between', padding:'0 10px', marginTop:'-10px'}}>
                        <span style={{fontSize:'8px', color:'#78716c'}}>09</span>
                        <span style={{fontSize:'8px', color:'#78716c'}}>12</span>
                        <span style={{fontSize:'8px', color:'#78716c'}}>15</span>
                        <span style={{fontSize:'8px', color:'#78716c'}}>18</span>
                        <span style={{fontSize:'8px', color:'#78716c'}}>21</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
