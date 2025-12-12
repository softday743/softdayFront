import React from 'react';
import './chatbot.css';
import { BottomNav } from './BottomNav';

export function Chatbot({ onNavigate }) {
    return (
        <div className="chatbot-container">
            {/* Header: Recent Conversation */}
            <div className="chatbot-header">최근 대화 </div>

            {/* Conversation Card 1 */}
            <div className="chat-card card-1">
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
                <div className="card-delete">삭제</div>
            </div>

            {/* Main Center Card (Bot Info) */}
            <div className="bot-info-card">
                <div className="bot-name">챗봇 이름</div>
                <div className="bot-avatar" />
                <div className="bot-desc">챗봇 설명</div>
            </div>

            {/* Conversation Card 2 */}
            <div className="chat-card card-2">
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
            </div>

            {/* Conversation Card 3 */}
            <div className="chat-card card-3">
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
            </div>

            {/* Conversation Card 4 */}
            <div className="chat-card card-4">
                <div className="card-title">대화 제목 (첫 질문)</div>
                <div className="card-desc">“마지막 메시지"</div>
                <div className="card-date">날짜</div>
            </div>

            {/* Start Conversation Button */}
            <div className="start-chat-btn">
                <div className="start-chat-text">대화 시작하기</div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav active="chatbot" onNavigate={onNavigate} />
        </div>
    );
}
