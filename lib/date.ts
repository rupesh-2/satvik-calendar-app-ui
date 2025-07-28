import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import {
  TITHIS,
  NAKSHATRAS,
  PAKSHAS,
  getTithiById,
  getNakshatraById,
  getPakshaById,
} from "../constants/tithis";

// Simple AD to BS conversion (this is a simplified version)
// In a real app, you would use a proper Nepali calendar library
export const convertADToBS = (
  adDate: Date
): { year: number; month: number; day: number } => {
  // This is a simplified conversion - in reality, you'd need a proper Nepali calendar library
  const year = adDate.getFullYear();
  const month = adDate.getMonth() + 1;
  const day = adDate.getDate();

  // Approximate BS year (BS starts around April 13-14)
  const bsYear = year + 57;

  return {
    year: bsYear,
    month,
    day,
  };
};

export const convertBSToAD = (
  bsYear: number,
  bsMonth: number,
  bsDay: number
): Date => {
  // Simplified conversion back to AD
  const adYear = bsYear - 57;
  return new Date(adYear, bsMonth - 1, bsDay);
};

export const formatDate = (
  date: Date,
  formatStr: string = "yyyy-MM-dd"
): string => {
  return format(date, formatStr);
};

export const getTodayString = (): string => {
  return formatDate(new Date());
};

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
};

// Simplified Panchang calculations
// In a real app, you would use astronomical calculations
export const calculateTithi = (date: Date): number => {
  // Simplified calculation - in reality, this would be based on lunar position
  const dayOfMonth = date.getDate();
  // Ensure we get a valid tithi ID (1-16)
  const lunarDay = ((dayOfMonth - 1) % 16) + 1;
  return lunarDay;
};

export const calculateNakshatra = (date: Date): number => {
  // Simplified calculation - in reality, this would be based on moon's position
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  // Ensure we get a valid nakshatra ID (1-27)
  const nakshatraIndex = (dayOfYear % 27) + 1;
  return nakshatraIndex;
};

export const calculatePaksha = (date: Date): number => {
  // Simplified calculation - Shukla (1-15) or Krishna (16-30)
  const dayOfMonth = date.getDate();
  return dayOfMonth <= 15 ? 1 : 2; // 1 = Shukla, 2 = Krishna
};

export const getSunriseSunset = (
  date: Date
): { sunrise: string; sunset: string } => {
  // Simplified sunrise/sunset times
  // In a real app, you would use astronomical calculations or API
  return {
    sunrise: "06:00",
    sunset: "18:00",
  };
};

export const generatePanchangData = (date: Date) => {
  const tithiId = calculateTithi(date);
  const nakshatraId = calculateNakshatra(date);
  const pakshaId = calculatePaksha(date);

  const tithi = getTithiById(tithiId);
  const nakshatra = getNakshatraById(nakshatraId);
  const paksha = getPakshaById(pakshaId);

  if (!tithi || !nakshatra || !paksha) {
    // Fallback to default values if calculation fails
    const defaultTithi = getTithiById(1);
    const defaultNakshatra = getNakshatraById(1);
    const defaultPaksha = getPakshaById(1);

    if (!defaultTithi || !defaultNakshatra || !defaultPaksha) {
      throw new Error("Failed to load default Panchang data");
    }

    return {
      date: formatDate(date),
      tithi: defaultTithi,
      nakshatra: defaultNakshatra,
      paksha: defaultPaksha,
      sunrise: "06:00",
      sunset: "18:00",
      yoga: "Vishkumbha", // Simplified
      karana: "Bava", // Simplified
      isAuspicious: false,
    };
  }

  const { sunrise, sunset } = getSunriseSunset(date);

  return {
    date: formatDate(date),
    tithi,
    nakshatra,
    paksha,
    sunrise,
    sunset,
    yoga: "Vishkumbha", // Simplified
    karana: "Bava", // Simplified
    isAuspicious: tithi.isSpecial,
  };
};

export const getMonthPanchangData = (date: Date) => {
  const days = getMonthDays(date);
  return days
    .map((day) => {
      try {
        return generatePanchangData(day);
      } catch (error) {
        console.error("Error generating Panchang data for date:", day, error);
        return null;
      }
    })
    .filter(Boolean);
};
