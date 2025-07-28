import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TithiCard } from "@/components/TithiCard";
import { usePanchangStore } from "@/store/usePanchangStore";
import {
  generatePanchangData,
  convertADToBS,
  getTodayString,
} from "@/lib/date";
import { colors, spacing, typography } from "@/constants/theme";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t, i18n } = useTranslation();
  const { todayData, setTodayData, setLoading, setError } = usePanchangStore();
  const [bsDate, setBsDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);

  useEffect(() => {
    const loadTodayData = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const data = generatePanchangData(today);
        setTodayData(data);

        // Convert to BS date
        const bs = convertADToBS(today);
        setBsDate(bs);
      } catch (error) {
        setError("Failed to load today's data");
        console.error("Error loading today data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodayData();
  }, []);

  const isNepali = i18n.language === "ne";

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
        <Text
          style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {t("home.title")}
        </Text>
        <LanguageSwitcher />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Date Section */}
        <View
          style={[
            styles.dateSection,
            { backgroundColor: Colors[colorScheme ?? "light"].surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("home.today")}
          </Text>

          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Text
                style={[
                  styles.dateLabel,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                AD
              </Text>
              <Text
                style={[
                  styles.dateValue,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {getTodayString()}
              </Text>
            </View>

            {bsDate && (
              <View style={styles.dateItem}>
                <Text
                  style={[
                    styles.dateLabel,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  BS
                </Text>
                <Text
                  style={[
                    styles.dateValue,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  {bsDate.year}-{bsDate.month.toString().padStart(2, "0")}-
                  {bsDate.day.toString().padStart(2, "0")}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Today's Panchang Data */}
        {todayData && (
          <TithiCard
            tithi={todayData.tithi}
            nakshatra={todayData.nakshatra}
            paksha={todayData.paksha}
            sunrise={todayData.sunrise}
            sunset={todayData.sunset}
            isSpecial={todayData.isAuspicious}
            style={styles.tithiCard}
          />
        )}

        {/* Quick Info Section */}
        <View
          style={[
            styles.infoSection,
            { backgroundColor: Colors[colorScheme ?? "light"].surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("home.fullInfo")}
          </Text>

          {todayData && (
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  {t("home.yoga")}
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  {todayData.yoga}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  {t("home.karana")}
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  {todayData.karana}
                </Text>
              </View>
            </View>
          )}
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
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  dateSection: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateItem: {
    alignItems: "center",
  },
  dateLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  dateValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  tithiCard: {
    marginBottom: spacing.lg,
  },
  infoSection: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
});
