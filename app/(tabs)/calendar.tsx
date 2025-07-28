import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { CalendarCard } from "@/components/CalendarCard";
import { usePanchangStore } from "@/store/usePanchangStore";
import { getMonthPanchangData, formatDate } from "@/lib/date";
import { colors, spacing, typography } from "@/constants/theme";
import { router } from "expo-router";

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { selectedDate, setSelectedDate } = usePanchangStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthData, setMonthData] = useState<any[]>([]);

  useEffect(() => {
    loadMonthData();
  }, [currentMonth]);

  const loadMonthData = async () => {
    try {
      const data = getMonthPanchangData(currentMonth);
      setMonthData(data);
    } catch (error) {
      console.error("Error loading month data:", error);
    }
  };

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    router.push(`/tithi/${date}`);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getMonthDataForDay = (day: number) => {
    if (!day) return null;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateString = formatDate(date);
    return monthData.find((data) => data.date === dateString);
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!day) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateString = formatDate(date);
    return dateString === selectedDate;
  };

  const changeMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => changeMonth("prev")}
          style={styles.navButton}
        >
          <Text
            style={[
              styles.navText,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            ‹
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.monthTitle,
            { color: Colors[colorScheme ?? "light"].text },
          ]}
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>

        <TouchableOpacity
          onPress={() => changeMonth("next")}
          style={styles.navButton}
        >
          <Text
            style={[
              styles.navText,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            ›
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Names */}
        <View style={styles.dayNamesContainer}>
          {dayNames.map((dayName, index) => (
            <Text
              key={index}
              style={[
                styles.dayName,
                { color: Colors[colorScheme ?? "light"].tint },
              ]}
            >
              {dayName}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {getDaysInMonth(currentMonth).map((day, index) => {
            const dayData = getMonthDataForDay(day);

            return (
              <View key={index} style={styles.calendarCell}>
                {day ? (
                  <CalendarCard
                    date={formatDate(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      )
                    )}
                    day={day}
                    tithi={
                      dayData?.tithi || {
                        id: 1,
                        name: "",
                        nameNe: "",
                        shortName: "",
                        shortNameNe: "",
                        isSpecial: false,
                        fasting: false,
                        avoidNonVeg: false,
                        description: "",
                        descriptionNe: "",
                      }
                    }
                    isToday={isToday(day)}
                    isSelected={isSelected(day)}
                    onPress={() =>
                      handleDatePress(
                        formatDate(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            day
                          )
                        )
                      )
                    }
                  />
                ) : (
                  <View style={styles.emptyCell} />
                )}
              </View>
            );
          })}
        </View>

        {/* Legend */}
        <View
          style={[
            styles.legend,
            { backgroundColor: Colors[colorScheme ?? "light"].surface },
          ]}
        >
          <Text
            style={[
              styles.legendTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("calendar.legend")}
          </Text>

          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: colors.light.special },
                ]}
              />
              <Text
                style={[
                  styles.legendText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {t("calendar.specialDays.ekadashi")}
              </Text>
            </View>

            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: colors.light.fasting },
                ]}
              />
              <Text
                style={[
                  styles.legendText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {t("home.fasting")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  navButton: {
    padding: spacing.sm,
  },
  navText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  monthTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  dayNamesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.md,
  },
  dayName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    width: 40,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  calendarCell: {
    width: "14.28%",
    alignItems: "center",
  },
  emptyCell: {
    width: 40,
    height: 60,
  },
  legend: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
  },
  legendTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  legendItems: {
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
});
