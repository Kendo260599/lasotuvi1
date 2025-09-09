/**
 * Vietnamese Lunar Calendar Conversion Functions
 * Based on traditional Vietnamese lunar calendar calculations
 */

// Simplified lunar calendar conversion (for demonstration)
// In a production system, this would use more accurate astronomical calculations

class LunarCalendar {
    constructor() {
        // Base date for calculations (Gregorian to Lunar conversion)
        this.baseDate = new Date(1900, 0, 31); // Jan 31, 1900
        this.baseLunar = { year: 1900, month: 1, day: 1 };
        
        // Days in each month for different lunar year types
        this.monthDays = [29, 30]; // Lunar months alternate between 29 and 30 days
        
        // Vietnamese zodiac animals (12-year cycle)
        this.zodiacAnimals = [
            'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ',
            'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
        ];
        
        // Vietnamese heavenly stems (10-year cycle)
        this.heavenlyStems = [
            'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu',
            'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'
        ];
        
        // Five elements
        this.elements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    }

    // Convert Gregorian date to approximate lunar date
    gregorianToLunar(year, month, day) {
        // Simplified calculation - in reality this would be much more complex
        const gregorianDate = new Date(year, month - 1, day);
        const daysDiff = Math.floor((gregorianDate - this.baseDate) / (24 * 60 * 60 * 1000));
        
        // Approximate lunar calculation (this is a simplified version)
        let lunarYear = this.baseLunar.year;
        let lunarMonth = this.baseLunar.month;
        let lunarDay = this.baseLunar.day + daysDiff;
        
        // Adjust for lunar calendar (approximately 354 days per year)
        while (lunarDay > 354) {
            lunarDay -= 354;
            lunarYear++;
        }
        
        while (lunarDay > 30) {
            lunarDay -= 30;
            lunarMonth++;
            if (lunarMonth > 12) {
                lunarMonth = 1;
                lunarYear++;
            }
        }
        
        if (lunarDay <= 0) {
            lunarDay += 30;
            lunarMonth--;
            if (lunarMonth <= 0) {
                lunarMonth = 12;
                lunarYear--;
            }
        }
        
        return {
            year: lunarYear,
            month: lunarMonth,
            day: lunarDay
        };
    }

    // Get zodiac animal for a year
    getZodiacAnimal(year) {
        const index = (year - 4) % 12;
        return this.zodiacAnimals[index];
    }

    // Get heavenly stem for a year
    getHeavenlyStem(year) {
        const index = (year - 4) % 10;
        return this.heavenlyStems[index];
    }

    // Get element for a year
    getElement(year) {
        const stemIndex = (year - 4) % 10;
        const elementIndex = Math.floor(stemIndex / 2);
        return this.elements[elementIndex];
    }

    // Get full lunar year description
    getLunarYearName(year) {
        const stem = this.getHeavenlyStem(year);
        const animal = this.getZodiacAnimal(year);
        const element = this.getElement(year);
        
        return `${stem} ${animal} (${element})`;
    }

    // Calculate hour pillar (địa chi giờ)
    getHourPillar(hour) {
        // Traditional Vietnamese hour system (2-hour periods)
        const hourIndex = Math.floor((hour + 1) / 2) % 12;
        return this.zodiacAnimals[hourIndex];
    }

    // Calculate day pillar
    getDayPillar(year, month, day) {
        // Simplified day pillar calculation
        const date = new Date(year, month - 1, day);
        const dayCount = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
        const stemIndex = (dayCount + 10) % 10;
        const animalIndex = (dayCount + 10) % 12;
        
        return {
            stem: this.heavenlyStems[stemIndex],
            animal: this.zodiacAnimals[animalIndex]
        };
    }

    // Get detailed birth information for astrology
    getBirthInfo(year, month, day, hour, isLunar = false) {
        let lunarDate;
        
        if (isLunar) {
            lunarDate = { year, month, day };
        } else {
            lunarDate = this.gregorianToLunar(year, month, day);
        }
        
        const yearPillar = {
            stem: this.getHeavenlyStem(lunarDate.year),
            animal: this.getZodiacAnimal(lunarDate.year),
            element: this.getElement(lunarDate.year)
        };
        
        const dayPillar = this.getDayPillar(year, month, day);
        const hourPillar = this.getHourPillar(hour);
        
        return {
            gregorian: { year, month, day, hour },
            lunar: lunarDate,
            yearPillar,
            dayPillar,
            hourPillar,
            yearName: this.getLunarYearName(lunarDate.year)
        };
    }
}

// Export for use in other modules
const lunarCalendar = new LunarCalendar();