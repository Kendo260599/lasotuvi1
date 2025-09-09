/**
 * Main Application Logic for Vietnamese Astrology App
 */

class AstrologyApp {
    constructor() {
        this.initializeEventListeners();
        this.currentReading = null;
    }

    initializeEventListeners() {
        const form = document.getElementById('birth-form');
        form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(event.target);
        const birthData = {
            name: formData.get('name'),
            gender: formData.get('gender'),
            year: parseInt(formData.get('year')),
            month: parseInt(formData.get('month')),
            day: parseInt(formData.get('day')),
            hour: parseInt(formData.get('hour')),
            minute: parseInt(formData.get('minute')) || 0,
            isLunar: formData.get('lunar-calendar') === 'on'
        };

        // Validate input
        if (!this.validateBirthData(birthData)) {
            return;
        }

        // Generate astrology reading
        try {
            this.currentReading = vietnameseAstrology.generateAstrologyReading(birthData);
            this.displayResults();
        } catch (error) {
            alert('Có lỗi xảy ra khi tính toán lá số. Vui lòng thử lại.');
            console.error('Astrology calculation error:', error);
        }
    }

    validateBirthData(data) {
        // Basic validation
        if (!data.name || data.name.trim() === '') {
            alert('Vui lòng nhập họ tên.');
            return false;
        }

        if (!data.gender) {
            alert('Vui lòng chọn giới tính.');
            return false;
        }

        if (!data.year || !data.month || !data.day) {
            alert('Vui lòng nhập đầy đủ ngày sinh.');
            return false;
        }

        if (data.year < 1900 || data.year > 2100) {
            alert('Năm sinh phải từ 1900 đến 2100.');
            return false;
        }

        if (data.month < 1 || data.month > 12) {
            alert('Tháng sinh phải từ 1 đến 12.');
            return false;
        }

        if (data.day < 1 || data.day > 31) {
            alert('Ngày sinh không hợp lệ.');
            return false;
        }

        if (data.hour < 0 || data.hour > 23) {
            alert('Giờ sinh phải từ 0 đến 23.');
            return false;
        }

        if (data.minute < 0 || data.minute > 59) {
            alert('Phút sinh phải từ 0 đến 59.');
            return false;
        }

        return true;
    }

    displayResults() {
        if (!this.currentReading) return;

        const resultSection = document.getElementById('result-section');
        const chartContainer = document.getElementById('chart-container');
        const interpretationDiv = document.getElementById('interpretation');

        // Show result section
        resultSection.style.display = 'block';

        // Display user info
        this.displayUserInfo();

        // Display astrology chart
        this.displayChart(chartContainer);

        // Display interpretation
        this.displayInterpretation(interpretationDiv);

        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    displayUserInfo() {
        const { personalInfo } = this.currentReading;
        const chartContainer = document.getElementById('chart-container');
        
        // Remove existing user info if any
        const existingInfo = document.querySelector('.user-info');
        if (existingInfo) {
            existingInfo.remove();
        }

        // Create user info display
        const userInfoDiv = document.createElement('div');
        userInfoDiv.className = 'user-info';
        
        const birthDateStr = personalInfo.isLunar ? 
            `${personalInfo.lunarDate.day}/${personalInfo.lunarDate.month}/${personalInfo.lunarDate.year} (Âm lịch)` :
            `${personalInfo.birthDate.day}/${personalInfo.birthDate.month}/${personalInfo.birthDate.year} (Dương lịch)`;
            
        const timeStr = `${personalInfo.birthDate.hour.toString().padStart(2, '0')}:${personalInfo.birthDate.minute.toString().padStart(2, '0')}`;
        
        userInfoDiv.innerHTML = `
            <h3>Thông Tin Cá Nhân</h3>
            <p><strong>Họ tên:</strong> ${personalInfo.name}</p>
            <p><strong>Giới tính:</strong> ${personalInfo.gender === 'nam' ? 'Nam' : 'Nữ'}</p>
            <p><strong>Ngày sinh:</strong> ${birthDateStr}</p>
            <p><strong>Giờ sinh:</strong> ${timeStr}</p>
            <p><strong>Năm:</strong> ${personalInfo.yearName}</p>
        `;

        chartContainer.parentNode.insertBefore(userInfoDiv, chartContainer);
    }

    displayChart(container) {
        const { chart } = this.currentReading;
        
        // Clear existing chart
        container.innerHTML = '';

        // Palace order for display (clockwise from top-left)
        const displayOrder = [
            'Tử Tức', 'Phu Mẫu', 'Phúc Đức', 'Điền Trạch',
            'Tài Bạch', 'Menh', 'Phu Thê', 'Quan Lộc',
            'Tật Ách', 'Giao Du', 'Thiên Di', 'Nô Bộc'
        ];

        displayOrder.forEach(palaceKey => {
            const palaceData = chart[palaceKey];
            const palaceDiv = document.createElement('div');
            palaceDiv.className = `palace ${palaceKey.toLowerCase().replace(/\s+/g, '-')}`;

            // Palace name
            const nameDiv = document.createElement('div');
            nameDiv.className = 'palace-name';
            nameDiv.textContent = palaceData.name;
            palaceDiv.appendChild(nameDiv);

            // Stars content
            const starsDiv = document.createElement('div');
            starsDiv.className = 'palace-stars';

            // Main stars
            if (palaceData.stars.length > 0) {
                palaceData.stars.forEach(star => {
                    const starSpan = document.createElement('span');
                    starSpan.className = palaceData.mainStar === star ? 'main-star' : '';
                    starSpan.textContent = star;
                    starsDiv.appendChild(starSpan);
                    starsDiv.appendChild(document.createElement('br'));
                });
            }

            // Lucky stars
            if (palaceData.luckyStars.length > 0) {
                palaceData.luckyStars.forEach(star => {
                    const starSpan = document.createElement('span');
                    starSpan.className = 'lucky-star';
                    starSpan.textContent = star;
                    starsDiv.appendChild(starSpan);
                    starsDiv.appendChild(document.createElement('br'));
                });
            }

            // Unlucky stars
            if (palaceData.unluckyStars.length > 0) {
                palaceData.unluckyStars.forEach(star => {
                    const starSpan = document.createElement('span');
                    starSpan.className = 'unlucky-star';
                    starSpan.textContent = star;
                    starsDiv.appendChild(starSpan);
                    starsDiv.appendChild(document.createElement('br'));
                });
            }

            palaceDiv.appendChild(starsDiv);
            
            // Add strength indicator
            palaceDiv.setAttribute('data-strength', palaceData.strength);
            
            container.appendChild(palaceDiv);
        });
    }

    displayInterpretation(container) {
        const { interpretation } = this.currentReading;
        
        container.innerHTML = `
            <h3>Giải Đoán Lá Số</h3>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #764ba2; margin-bottom: 8px;">🌟 Tính Cách & Bản Chất</h4>
                <p>${interpretation.personality}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #764ba2; margin-bottom: 8px;">💼 Sự Nghiệp</h4>
                <p>${interpretation.career}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #764ba2; margin-bottom: 8px;">💰 Tài Lộc</h4>
                <p>${interpretation.wealth}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #764ba2; margin-bottom: 8px;">❤️ Tình Duyên & Hôn Nhân</h4>
                <p>${interpretation.relationships}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #764ba2; margin-bottom: 8px;">🏥 Sức Khỏe</h4>
                <p>${interpretation.health}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #764ba2; margin-bottom: 8px;">📋 Lời Khuyên Chung</h4>
                <p>${interpretation.general}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 8px; border: 1px solid #ffc107;">
                <p style="margin: 0; font-style: italic; color: #856404;">
                    <strong>Lưu ý:</strong> Lá số tử vi chỉ mang tính chất tham khảo. 
                    Số phận của mỗi người phụ thuộc vào nỗ lực và hành động của chính mình.
                </p>
            </div>
        `;
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new AstrologyApp();
});