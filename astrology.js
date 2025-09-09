/**
 * Vietnamese Astrology (Tử Vi) Calculation System
 * Traditional Vietnamese astrology chart generation
 */

class VietnameseAstrology {
    constructor() {
        // 12 Palaces (Cung) in Vietnamese astrology
        this.palaces = [
            'Menh', 'Phu Mẫu', 'Phúc Đức', 'Điền Trạch',
            'Quan Lộc', 'Nô Bộc', 'Thiên Di', 'Giao Du',
            'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê'
        ];

        // Palace names in Vietnamese
        this.palaceNames = {
            'Menh': 'Cung Mệnh',
            'Phu Mẫu': 'Cung Phụ Mẫu',
            'Phúc Đức': 'Cung Phúc Đức',
            'Điền Trạch': 'Cung Điền Trạch',
            'Quan Lộc': 'Cung Quan Lộc',
            'Nô Bộc': 'Cung Nô Bộc',
            'Thiên Di': 'Cung Thiên Di',
            'Giao Du': 'Cung Giao Du',
            'Tật Ách': 'Cung Tật Ách',
            'Tài Bạch': 'Cung Tài Bạch',
            'Tử Tức': 'Cung Tử Tức',
            'Phu Thê': 'Cung Phu Thê'
        };

        // Major stars in Vietnamese astrology
        this.majorStars = [
            'Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh',
            'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương',
            'Thất Sát', 'Phá Quân'
        ];

        // Lucky stars
        this.luckyStars = [
            'Tả Phụ', 'Hữu Bật', 'Văn Xương', 'Văn Khúc', 'Thiên Khôi', 'Thiên Việt',
            'Tam Đài', 'Bát Tọa', 'Ân Quang', 'Thiên Quý'
        ];

        // Unlucky stars
        this.unluckyStars = [
            'Đà La', 'Kình Dương', 'Hỏa Tinh', 'Linh Tinh', 'Địa Kiếp', 'Thiên Không',
            'Thiên Hình', 'Thiên Riêu', 'Thiên Khốc', 'Thiên Hư'
        ];

        // Elements and their characteristics
        this.elementCharacteristics = {
            'Kim': { color: 'white', direction: 'west', season: 'autumn' },
            'Mộc': { color: 'green', direction: 'east', season: 'spring' },
            'Thủy': { color: 'black', direction: 'north', season: 'winter' },
            'Hỏa': { color: 'red', direction: 'south', season: 'summer' },
            'Thổ': { color: 'yellow', direction: 'center', season: 'late summer' }
        };
    }

    // Calculate the position of Tử Vi star (main star)
    calculateTuViPosition(birthInfo) {
        const { lunar, yearPillar } = birthInfo;
        
        // Simplified calculation based on birth month and day
        // In traditional astrology, this involves complex calculations
        const monthDay = lunar.month + (lunar.day > 15 ? 1 : 0);
        const position = (monthDay - 1) % 12;
        
        return position;
    }

    // Calculate positions of all major stars
    calculateStarPositions(birthInfo) {
        const tuViPos = this.calculateTuViPosition(birthInfo);
        const positions = {};

        // Calculate positions based on Tử Vi star position
        positions['Tử Vi'] = tuViPos;
        positions['Thiên Cơ'] = (tuViPos + 1) % 12;
        positions['Thái Dương'] = (tuViPos + 5) % 12;
        positions['Vũ Khúc'] = (tuViPos + 2) % 12;
        positions['Thiên Đồng'] = (tuViPos + 7) % 12;
        positions['Liêm Trinh'] = (tuViPos + 8) % 12;

        // Calculate positions of other stars
        const { lunar } = birthInfo;
        positions['Thiên Phủ'] = (12 - tuViPos) % 12;
        positions['Thái Âm'] = (lunar.month - 1) % 12;
        positions['Tham Lang'] = (tuViPos + 4) % 12;
        positions['Cự Môn'] = (tuViPos + 3) % 12;
        positions['Thiên Tướng'] = (tuViPos + 6) % 12;
        positions['Thiên Lương'] = (tuViPos + 9) % 12;
        positions['Thất Sát'] = (tuViPos + 10) % 12;
        positions['Phá Quân'] = (tuViPos + 11) % 12;

        return positions;
    }

    // Calculate lucky and unlucky star positions
    calculateMinorStars(birthInfo) {
        const { lunar, gregorian, hourPillar } = birthInfo;
        const positions = {};

        // Lucky stars
        positions['Tả Phụ'] = (lunar.month + 1) % 12;
        positions['Hữu Bật'] = (lunar.month - 1 + 12) % 12;
        positions['Văn Xương'] = (gregorian.hour / 2) % 12;
        positions['Văn Khúc'] = (gregorian.hour / 2 + 6) % 12;
        positions['Thiên Khôi'] = (lunar.year % 12);
        positions['Thiên Việt'] = (lunar.year + 6) % 12;

        // Unlucky stars
        positions['Đà La'] = (lunar.year + lunar.month) % 12;
        positions['Kình Dương'] = (lunar.year - lunar.month + 12) % 12;
        positions['Hỏa Tinh'] = (lunar.year + 2) % 12;
        positions['Linh Tinh'] = (lunar.year - 2 + 12) % 12;
        positions['Địa Kiếp'] = (lunar.day) % 12;
        positions['Thiên Không'] = (lunar.day + 6) % 12;

        return positions;
    }

    // Generate complete astrology chart
    generateChart(birthInfo, gender) {
        const chart = {};
        
        // Initialize all palaces
        for (let i = 0; i < 12; i++) {
            chart[this.palaces[i]] = {
                name: this.palaceNames[this.palaces[i]],
                stars: [],
                mainStar: null,
                luckyStars: [],
                unluckyStars: [],
                element: null,
                strength: 'neutral'
            };
        }

        // Place major stars
        const majorStarPositions = this.calculateStarPositions(birthInfo);
        for (const [star, position] of Object.entries(majorStarPositions)) {
            // Ensure position is within valid range
            const validPosition = ((position % 12) + 12) % 12;
            const palace = this.palaces[validPosition];
            
            if (palace && chart[palace]) {
                chart[palace].stars.push(star);
                if (star === 'Tử Vi' || star === 'Thiên Phủ' || star === 'Thái Dương' || star === 'Thái Âm') {
                    chart[palace].mainStar = star;
                }
            }
        }

        // Place minor stars
        const minorStarPositions = this.calculateMinorStars(birthInfo);
        for (const [star, position] of Object.entries(minorStarPositions)) {
            // Ensure position is within valid range
            const validPosition = ((position % 12) + 12) % 12;
            const palace = this.palaces[validPosition];
            
            if (palace && chart[palace]) {
                if (this.luckyStars.includes(star)) {
                    chart[palace].luckyStars.push(star);
                } else if (this.unluckyStars.includes(star)) {
                    chart[palace].unluckyStars.push(star);
                }
            }
        }

        // Determine palace strength based on stars
        for (const palace of this.palaces) {
            const palaceData = chart[palace];
            const majorStarCount = palaceData.stars.length;
            const luckyStarCount = palaceData.luckyStars.length;
            const unluckyStarCount = palaceData.unluckyStars.length;

            if (majorStarCount > 1 || luckyStarCount > unluckyStarCount) {
                palaceData.strength = 'strong';
            } else if (unluckyStarCount > luckyStarCount) {
                palaceData.strength = 'weak';
            }
        }

        return chart;
    }

    // Generate interpretation based on chart
    generateInterpretation(chart, birthInfo, gender) {
        const interpretation = {
            personality: '',
            career: '',
            wealth: '',
            relationships: '',
            health: '',
            general: ''
        };

        // Analyze Menh palace (main personality)
        const menhPalace = chart['Menh'];
        if (menhPalace.mainStar === 'Tử Vi') {
            interpretation.personality = 'Bạn có tính cách lãnh đạo mạnh mẽ, thích được tôn trọng và có khả năng điều hành tổ chức tốt. Tự tin, quyết đoán nhưng đôi khi hơi cứng đầu.';
            interpretation.career = 'Phù hợp với các vị trí lãnh đạo, quản lý hoặc kinh doanh. Có thể thành công trong chính trị, giáo dục hoặc các lĩnh vực yêu cầu tính quyết đoán.';
        } else if (menhPalace.mainStar === 'Thái Dương') {
            interpretation.personality = 'Tính cách hào sảng, năng động, thích giao tiếp và kết bạn. Có khả năng lãnh đạo tự nhiên và luôn tích cực trong cuộc sống.';
            interpretation.career = 'Thành công trong các nghề liên quan đến truyền thông, giáo dục, bán hàng hoặc công tác xã hội.';
        } else if (menhPalace.mainStar === 'Thái Âm') {
            interpretation.personality = 'Tính cách nhẹ nhàng, tinh tế, có trực giác tốt. Thích sự yên tĩnh và có khả năng nghệ thuật.';
            interpretation.career = 'Phù hợp với nghề nghiệp sáng tạo, nghệ thuật, y tế hoặc các công việc đòi hỏi sự tỉ mỉ.';
        } else {
            interpretation.personality = 'Tính cách cân bằng, có khả năng thích nghi tốt với nhiều hoàn cảnh khác nhau.';
            interpretation.career = 'Linh hoạt trong lựa chọn nghề nghiệp, có thể thành công trong nhiều lĩnh vực.';
        }

        // Analyze wealth (Tài Bạch palace)
        const wealthPalace = chart['Tài Bạch'];
        if (wealthPalace.strength === 'strong') {
            interpretation.wealth = 'Vận tài lộc tốt, có khả năng tích lũy tài sản và đầu tư thông minh. Tiền bạc ổn định trong cuộc sống.';
        } else if (wealthPalace.strength === 'weak') {
            interpretation.wealth = 'Cần thận trọng trong việc chi tiêu và đầu tư. Nên tập trung vào công việc ổn định hơn là đầu cơ.';
        } else {
            interpretation.wealth = 'Tình hình tài chính trung bình, cần có kế hoạch tài chính rõ ràng để đạt được mục tiêu.';
        }

        // Analyze relationships (Phu Thê palace)
        const relationshipPalace = chart['Phu Thê'];
        if (relationshipPalace.strength === 'strong') {
            interpretation.relationships = 'Duyên phận tốt, có khả năng gặp được người phù hợp. Hôn nhân hạnh phúc và bền vững.';
        } else if (relationshipPalace.strength === 'weak') {
            interpretation.relationships = 'Cần kiên nhẫn trong tình yêu, không nên vội vàng. Hãy học cách hiểu và bao dung trong mối quan hệ.';
        } else {
            interpretation.relationships = 'Tình duyên bình thường, cần nỗ lực duy trì và phát triển mối quan hệ.';
        }

        // Analyze health (Tật Ách palace)
        const healthPalace = chart['Tật Ách'];
        if (healthPalace.strength === 'strong') {
            interpretation.health = 'Sức khỏe tốt, ít bị bệnh tật. Nên duy trì lối sống lành mạnh để bảo toàn sức khỏe.';
        } else if (healthPalace.strength === 'weak') {
            interpretation.health = 'Cần chú ý chăm sóc sức khỏe, đặc biệt là hệ tiêu hóa và thần kinh. Tránh căng thẳng quá độ.';
        } else {
            interpretation.health = 'Sức khỏe ở mức trung bình, cần có chế độ ăn uống và tập luyện hợp lý.';
        }

        // General advice
        interpretation.general = `Năm sinh ${birthInfo.yearName}, thuộc hành ${birthInfo.yearPillar.element}. ` +
            'Hãy phát huy những điểm mạnh của mình và khắc phục những điểm yếu. ' +
            'Luôn giữ thái độ tích cực và không ngừng học hỏi để phát triển bản thân.';

        return interpretation;
    }

    // Main function to generate complete astrology reading
    generateAstrologyReading(birthData) {
        const { name, gender, year, month, day, hour, minute, isLunar } = birthData;
        
        // Get birth information
        const birthInfo = lunarCalendar.getBirthInfo(year, month, day, hour, isLunar);
        
        // Generate chart
        const chart = this.generateChart(birthInfo, gender);
        
        // Generate interpretation
        const interpretation = this.generateInterpretation(chart, birthInfo, gender);
        
        return {
            personalInfo: {
                name,
                gender,
                birthDate: { year, month, day, hour, minute },
                isLunar,
                lunarDate: birthInfo.lunar,
                yearName: birthInfo.yearName
            },
            chart,
            interpretation,
            birthInfo
        };
    }
}

// Export for use in other modules
const vietnameseAstrology = new VietnameseAstrology();