import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TithiCard } from "@/components/TithiCard";
import { usePanchangStore } from "@/store/usePanchangStore";
import { useUserPrefsStore } from "@/store/useUserPrefsStore";
import { generatePanchangData, convertADToBS } from "@/lib/date";
import { schedulePanchangReminder } from "@/lib/notifications";
import { colors, spacing, typography } from "@/constants/theme";

export default function TithiDetailsScreen() {
  const colorScheme = useColorScheme();
  const { t, i18n } = useTranslation();
  const { date } = useLocalSearchParams();
  const router = useRouter();
  const { selectedDateData, setSelectedDateData, setLoading, setError } =
    usePanchangStore();
  const { addReminder } = useUserPrefsStore();
  const [bsDate, setBsDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);

  useEffect(() => {
    if (date) {
      loadDateData();
    }
  }, [date]);

  const loadDateData = async () => {
    try {
      setLoading(true);
      const selectedDate = new Date(date as string);
      const data = generatePanchangData(selectedDate);
      setSelectedDateData(data);

      // Convert to BS date
      const bs = convertADToBS(selectedDate);
      setBsDate(bs);
    } catch (error) {
      setError("Failed to load date data");
      console.error("Error loading date data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetReminder = () => {
    if (!selectedDateData) return;

    const reminder = {
      id: Date.now().toString(),
      date: selectedDateData.date,
      tithi: selectedDateData.tithi.name,
      title: `${selectedDateData.tithi.name} Reminder`,
      time: "06:00",
      enabled: true,
    };

    addReminder(reminder);
    schedulePanchangReminder(reminder);
    Alert.alert("Success", t("tithi.reminderSet"));
  };

  const isNepali = i18n.language === "ne";

  if (!selectedDateData) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme ?? "light"].background },
        ]}
      >
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <View style={styles.loadingContainer}>
          <Text
            style={[
              styles.loadingText,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("common.loading")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text
            style={[
              styles.backButtonText,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            ‹ {t("common.back")}
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {t("tithi.details")}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Section */}
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
            {date}
          </Text>

          {bsDate && (
            <Text
              style={[
                styles.bsDate,
                { color: Colors[colorScheme ?? "light"].tint },
              ]}
            >
              BS: {bsDate.year}-{bsDate.month.toString().padStart(2, "0")}-
              {bsDate.day.toString().padStart(2, "0")}
            </Text>
          )}
        </View>

        {/* Tithi Card */}
        <TithiCard
          tithi={selectedDateData.tithi}
          nakshatra={selectedDateData.nakshatra}
          paksha={selectedDateData.paksha}
          sunrise={selectedDateData.sunrise}
          sunset={selectedDateData.sunset}
          isSpecial={selectedDateData.isAuspicious}
          style={styles.tithiCard}
        />

        {/* Additional Details */}
        <View
          style={[
            styles.detailsSection,
            { backgroundColor: Colors[colorScheme ?? "light"].surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("tithi.fullInfo")}
          </Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {t("home.yoga")}
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {selectedDateData.yoga}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {t("home.karana")}
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {selectedDateData.karana}
              </Text>
            </View>
          </View>
        </View>

        {/* Notes Section */}
        <View
          style={[
            styles.notesSection,
            { backgroundColor: Colors[colorScheme ?? "light"].surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("tithi.notes")}
          </Text>

          <View style={styles.notesContainer}>
            {selectedDateData.tithi.fasting && (
              <View style={styles.noteItem}>
                <Text
                  style={[
                    styles.noteText,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  • {t("home.fastingToday")}
                </Text>
              </View>
            )}

            {selectedDateData.tithi.avoidNonVeg && (
              <View style={styles.noteItem}>
                <Text
                  style={[
                    styles.noteText,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  • {t("tithi.avoidNonVeg")}
                </Text>
              </View>
            )}

            <View style={styles.noteItem}>
              <Text
                style={[
                  styles.noteText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                •{" "}
                {isNepali
                  ? selectedDateData.tithi.descriptionNe
                  : selectedDateData.tithi.description}
              </Text>
            </View>
          </View>
        </View>

        {/* Reminder Button */}
        <TouchableOpacity
          style={[
            styles.reminderButton,
            { backgroundColor: Colors[colorScheme ?? "light"].primary },
          ]}
          onPress={handleSetReminder}
        >
          <Text
            style={[
              styles.reminderButtonText,
              { color: Colors[colorScheme ?? "light"].onPrimary },
            ]}
          >
            {t("tithi.setReminder")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  backButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  title: {
    fontSize: typography.fontSize.lg,
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
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  bsDate: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  tithiCard: {
    marginBottom: spacing.lg,
  },
  detailsSection: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  detailsGrid: {
    gap: spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  detailValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  notesSection: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  notesContainer: {
    gap: spacing.sm,
  },
  noteItem: {
    paddingVertical: spacing.xs,
  },
  noteText: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
  },
  reminderButton: {
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  reminderButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});
