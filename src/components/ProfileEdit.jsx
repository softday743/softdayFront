import React, { useState } from 'react';
import './profile.css';

export function ProfileEdit({ onBack }) {
    const [formData, setFormData] = useState({
        name: '이소민',
        job: '대리',
        year: '3년차',
        industry: '마케팅'
    });
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Save logic here (API call etc.)
        console.log('Saved:', formData);
        onBack();
    };

    const handleBack = () => {
        // If dirty, show modal (simplified for now to always go back or show modal logic if needed)
        // For this refactor, let's keep it simple or strictly copy logic.
        // Assuming no dirty check logic transfer for this immediate step unless requested.
        onBack();
    };

    return (
        <div className="profile-container">
            <div className="edit-header-title">프로필 정보 수정</div>
            <div className="edit-back-arrow" onClick={handleBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="edit-label label-name">이름</div>
            <div className="edit-input-wrapper input-name">
                <input 
                    type="text" 
                    className="edit-input" 
                    value={formData.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                />
            </div>

            <div className="edit-label label-job">직급</div>
            <div className="edit-input-wrapper input-job">
                <input 
                    type="text" 
                    className="edit-input" 
                    value={formData.job} 
                    onChange={(e) => handleInputChange('job', e.target.value)} 
                />
            </div>

            <div className="edit-label label-year">연차</div>
            <div className="edit-input-wrapper input-year">
                <input 
                    type="text" 
                    className="edit-input" 
                    value={formData.year} 
                    onChange={(e) => handleInputChange('year', e.target.value)} 
                />
            </div>

            <div className="edit-label label-industry">산업 분야</div>
            <div className="edit-input-wrapper input-industry">
                <input 
                    type="text" 
                    className="edit-input" 
                    value={formData.industry} 
                    onChange={(e) => handleInputChange('industry', e.target.value)} 
                />
            </div>

            <div className="edit-save-btn" onClick={handleSave}>
                <div className="edit-save-text">저장</div>
            </div>
        </div>
    );
}
