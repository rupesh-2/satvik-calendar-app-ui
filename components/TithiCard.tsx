import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Tithi, Nakshatra, Paksha } from "../constants/tithis";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "../constants/theme";

interface TithiCardProps {
  tithi: Tithi;
  nakshatra: Nakshatra;
  paksha: Paksha;
  sunrise: string;
  sunset: string;
  isSpecial?: boolean;
  onPress?: () => void;
  style?: any;
}

export const TithiCard: React.FC<TithiCardProps> = ({
  tithi,
  nakshatra,
  paksha,
  sunrise,
  sunset,
  isSpecial = false,
  onPress,
  style,
}) => {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language === "ne";

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.container, isSpecial && styles.specialContainer, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{isNepali ? tithi.nameNe : tithi.name}</Text>
        {isSpecial && (
          <View style={styles.specialBadge}>
            <Text style={styles.specialText}>{t("home.auspicious")}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>{t("home.paksha")}:</Text>
          <Text style={styles.value}>
            {isNepali ? paksha.nameNe : paksha.name}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t("home.nakshatra")}:</Text>
          <Text style={styles.value}>
            {isNepali ? nakshatra.nameNe : nakshatra.name}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t("home.sunrise")}:</Text>
          <Text style={styles.value}>{sunrise}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t("home.sunset")}:</Text>
          <Text style={styles.value}>{sunset}</Text>
        </View>

        {tithi.fasting && (
          <View style={styles.fastingContainer}>
            <Text style={styles.fastingText}>{t("home.fastingToday")}</Text>
          </View>
        )}

        {tithi.avoidNonVeg && (
          <View style={styles.nonVegContainer}>
            <Text style={styles.nonVegText}>{t("tithi.avoidNonVeg")}</Text>
          </View>
        )}
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    ...shadows.light.medium,
  },
  specialContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.light.special,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.onSurface,
  },
  specialBadge: {
    backgroundColor: colors.light.special,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  specialText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onPrimary,
  },
  content: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onSurfaceVariant,
  },
  value: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onSurface,
  },
  fastingContainer: {
    backgroundColor: colors.light.fasting,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginTop: spacing.sm,
  },
  fastingText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onPrimary,
    textAlign: "center",
  },
  nonVegContainer: {
    backgroundColor: colors.light.inauspicious,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginTop: spacing.sm,
  },
  nonVegText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onPrimary,
    textAlign: "center",
  },
});
