import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TithiCard } from "@/components/TithiCard";
import { usePanchangStore } from "@/store/usePanchangStore";
import { generatePanchangData } from "@/lib/date";
import { schedulePanchangReminder } from "@/lib/notifications";
import { spacing, typography } from "@/constants/theme";

export default function TithiDetailsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { date } = useLocalSearchParams<{ date: string }>();
  const router = useRouter();
  const { selectedDateData, setSelectedDateData } = usePanchangStore();
  const [tithiData, setTithiData] = useState<any>(null);
  const [reminderSet, setReminderSet] = useState(false);

  useEffect(() => {
    if (date) {
      try {
        const data = generatePanchangData(new Date(date));
        setTithiData(data);
        setSelectedDateData(data);
      } catch (error) {
        console.error("Error loading tithi data:", error);
      }
    }
  }, [date]);

  const handleSetReminder = async () => {
    if (!tithiData) return;

    try {
      await schedulePanchangReminder(
        tithiData.tithi.id.toString(),
        tithiData.tithi.name,
        tithiData.date,
        `${tithiData.tithi.name} - ${tithiData.nakshatra.name}`
      );
      setReminderSet(true);
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  if (!tithiData) {
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
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
            style={[
              styles.title,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("tithi.details")}
          </Text>
        </View>

        {/* Date */}
        <Text
          style={[
            styles.dateText,
            { color: Colors[colorScheme ?? "light"].tint },
          ]}
        >
          {date}
        </Text>

        {/* Tithi Card */}
        <TithiCard
          tithi={tithiData.tithi}
          nakshatra={tithiData.nakshatra}
          paksha={tithiData.paksha}
          sunrise={tithiData.sunrise}
          sunset={tithiData.sunset}
          isSpecial={tithiData.isAuspicious}
          style={styles.tithiCard}
        />

        {/* Additional Details */}
        <View
          style={[
            styles.detailsSection,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("tithi.additionalInfo")}
          </Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {t("tithi.yoga")}
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {tithiData.yoga}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {t("tithi.karana")}
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {tithiData.karana}
              </Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View
          style={[
            styles.notesSection,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
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

          <View style={styles.notesList}>
            {tithiData.tithi.fasting && (
              <View style={styles.noteItem}>
                <Text
                  style={[
                    styles.noteText,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  🕉️ {t("tithi.fastingDay")}
                </Text>
              </View>
            )}

            {tithiData.tithi.avoidNonVeg && (
              <View style={styles.noteItem}>
                <Text
                  style={[
                    styles.noteText,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  🚫 {t("tithi.avoidNonVeg")}
                </Text>
              </View>
            )}

            {tithiData.tithi.isSpecial && (
              <View style={styles.noteItem}>
                <Text
                  style={[
                    styles.noteText,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  ✨ {t("tithi.specialDay")}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Reminder Button */}
        <TouchableOpacity
          style={[
            styles.reminderButton,
            { backgroundColor: Colors[colorScheme ?? "light"].tint },
            reminderSet && { opacity: 0.6 },
          ]}
          onPress={handleSetReminder}
          disabled={reminderSet}
        >
          <Text
            style={[
              styles.reminderButtonText,
              { color: Colors[colorScheme ?? "light"].background },
            ]}
          >
            {reminderSet ? t("tithi.reminderSet") : t("tithi.setReminder")}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  backButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  dateText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  tithiCard: {
    marginBottom: spacing.lg,
  },
  detailsSection: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  notesSection: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  notesList: {
    gap: spacing.sm,
  },
  noteItem: {
    paddingVertical: spacing.sm,
  },
  noteText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  reminderButton: {
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },
  reminderButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
});
