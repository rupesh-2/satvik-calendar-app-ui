import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<any[]>([]);
  const { setSelectedDateData } = usePanchangStore();

  useEffect(() => {
    loadMonthData();
  }, [currentDate]);

  const loadMonthData = () => {
    try {
      const data = getMonthPanchangData(currentDate);
      setMonthData(data);
    } catch (error) {
      console.error("Error loading month data:", error);
    }
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDatePress = (date: string) => {
    setSelectedDateData(monthData.find((item) => item.date === date));
    router.push(`/tithi/${date}`);
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

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
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Text
            style={[
              styles.navButtonText,
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
          {getMonthName(currentDate)}
        </Text>

        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Text
            style={[
              styles.navButtonText,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            ›
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Headers */}
        <View style={styles.dayHeaders}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text
              key={day}
              style={[
                styles.dayHeader,
                { color: Colors[colorScheme ?? "light"].tint },
              ]}
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: startingDayOfWeek }, (_, index) => (
            <View key={`empty-${index}`} style={styles.emptyCell} />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const dateString = formatDate(date);
            const dayData = monthData.find((item) => item.date === dateString);

            return (
              <CalendarCard
                key={day}
                date={dateString}
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
                isToday={dateString === formatDate(new Date())}
                isSelected={false}
                onPress={() => handleDatePress(dateString)}
              />
            );
          })}
        </View>

        {/* Legend */}
        <View
          style={[
            styles.legend,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
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
                {t("calendar.special")}
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
                {t("calendar.fasting")}
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
  navButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  monthTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  dayHeaders: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  dayHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    paddingVertical: spacing.sm,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  emptyCell: {
    width: "14.28%",
    height: 60,
  },
  legend: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  legendTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  legendItems: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
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
