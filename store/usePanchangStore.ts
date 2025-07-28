import { create } from "zustand";
import { Tithi, Nakshatra, Paksha } from "../constants/tithis";

export interface PanchangData {
  date: string;
  tithi: Tithi;
  nakshatra: Nakshatra;
  paksha: Paksha;
  sunrise: string;
  sunset: string;
  yoga: string;
  karana: string;
  isAuspicious: boolean;
}

interface PanchangState {
  todayData: PanchangData | null;
  selectedDate: string;
  selectedDateData: PanchangData | null;
  isLoading: boolean;
  error: string | null;
  setTodayData: (data: PanchangData) => void;
  setSelectedDate: (date: string) => void;
  setSelectedDateData: (data: PanchangData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePanchangStore = create<PanchangState>((set) => ({
  todayData: null,
  selectedDate: new Date().toISOString().split("T")[0],
  selectedDateData: null,
  isLoading: false,
  error: null,
  setTodayData: (data: PanchangData) => set({ todayData: data }),
  setSelectedDate: (date: string) => set({ selectedDate: date }),
  setSelectedDateData: (data: PanchangData) => set({ selectedDateData: data }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));
