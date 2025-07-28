import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Tithi } from "../constants/tithis";
import { colors, spacing, borderRadius, typography } from "../constants/theme";

interface CalendarCardProps {
  date: string;
  day: number;
  tithi: Tithi;
  isToday: boolean;
  isSelected: boolean;
  onPress: () => void;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  date,
  day,
  tithi,
  isToday,
  isSelected,
  onPress,
}) => {
  const { i18n } = useTranslation();
  const isNepali = i18n.language === "ne";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isToday && styles.todayContainer,
        isSelected && styles.selectedContainer,
        tithi.isSpecial && styles.specialContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.dayText,
          isToday && styles.todayText,
          isSelected && styles.selectedText,
        ]}
      >
        {day}
      </Text>

      <Text
        style={[styles.tithiText, tithi.isSpecial && styles.specialTithiText]}
      >
        {isNepali ? tithi.shortNameNe : tithi.shortName}
      </Text>

      {tithi.fasting && <View style={styles.fastingDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 60,
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    margin: spacing.xs,
  },
  todayContainer: {
    backgroundColor: colors.light.primary,
  },
  selectedContainer: {
    backgroundColor: colors.light.secondary,
  },
  specialContainer: {
    borderWidth: 2,
    borderColor: colors.light.special,
  },
  dayText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onSurface,
  },
  todayText: {
    color: colors.light.onPrimary,
    fontWeight: typography.fontWeight.bold,
  },
  selectedText: {
    color: colors.light.onSecondary,
    fontWeight: typography.fontWeight.bold,
  },
  tithiText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.light.onSurfaceVariant,
    textAlign: "center",
  },
  specialTithiText: {
    color: colors.light.special,
    fontWeight: typography.fontWeight.medium,
  },
  fastingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.light.fasting,
    marginTop: spacing.xs,
  },
});
