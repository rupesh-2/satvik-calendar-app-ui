import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AlertSettings {
  ekadashi: boolean;
  purnima: boolean;
  amavasya: boolean;
  sankranti: boolean;
}

export interface Reminder {
  id: string;
  date: string;
  tithi: string;
  title: string;
  time: string;
  enabled: boolean;
}

interface UserPrefsState {
  timezone: string;
  alertSettings: AlertSettings;
  reminders: Reminder[];
  setTimezone: (timezone: string) => void;
  setAlertSettings: (settings: AlertSettings) => void;
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, reminder: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;
}

export const useUserPrefsStore = create<UserPrefsState>()(
  persist(
    (set, get) => ({
      timezone: "Asia/Kathmandu",
      alertSettings: {
        ekadashi: true,
        purnima: true,
        amavasya: true,
        sankranti: true,
      },
      reminders: [],
      setTimezone: (timezone: string) => set({ timezone }),
      setAlertSettings: (settings: AlertSettings) =>
        set({ alertSettings: settings }),
      addReminder: (reminder: Reminder) =>
        set((state) => ({
          reminders: [...state.reminders, reminder],
        })),
      updateReminder: (id: string, reminder: Partial<Reminder>) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, ...reminder } : r
          ),
        })),
      deleteReminder: (id: string) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== id),
        })),
      toggleReminder: (id: string) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
          ),
        })),
    }),
    {
      name: "user-prefs-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
