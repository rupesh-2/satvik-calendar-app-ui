import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useUserPrefsStore, Reminder } from "@/store/useUserPrefsStore";
import {
  schedulePanchangReminder,
  cancelNotification,
} from "@/lib/notifications";
import { colors, spacing, typography } from "@/constants/theme";

export default function AlertsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { reminders, addReminder, deleteReminder, toggleReminder } =
    useUserPrefsStore();

  const [showAddReminder, setShowAddReminder] = useState(false);

  const handleAddReminder = () => {
    // In a real app, you would show a modal or navigate to a form
    const newReminder: Reminder = {
      id: Date.now().toString(),
      date: "2024-01-15",
      tithi: "Ekadashi",
      title: "Ekadashi Reminder",
      time: "06:00",
      enabled: true,
    };

    addReminder(newReminder);
    schedulePanchangReminder(newReminder);
    Alert.alert("Success", "Reminder added successfully!");
  };

  const handleDeleteReminder = (id: string) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteReminder(id);
            cancelNotification(id);
          },
        },
      ]
    );
  };

  const handleToggleReminder = (id: string, enabled: boolean) => {
    toggleReminder(id);
    if (enabled) {
      const reminder = reminders.find((r) => r.id === id);
      if (reminder) {
        schedulePanchangReminder(reminder);
      }
    } else {
      cancelNotification(id);
    }
  };

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
          {t("alerts.title")}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming Tithis Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: Colors[colorScheme ?? "light"].surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("alerts.upcoming")}
          </Text>

          <View style={styles.upcomingContainer}>
            <View style={styles.upcomingItem}>
              <Text
                style={[
                  styles.upcomingDate,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                2024-01-15
              </Text>
              <Text
                style={[
                  styles.upcomingTithi,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                Ekadashi
              </Text>
            </View>

            <View style={styles.upcomingItem}>
              <Text
                style={[
                  styles.upcomingDate,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                2024-01-25
              </Text>
              <Text
                style={[
                  styles.upcomingTithi,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                Purnima
              </Text>
            </View>

            <View style={styles.upcomingItem}>
              <Text
                style={[
                  styles.upcomingDate,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                2024-02-09
              </Text>
              <Text
                style={[
                  styles.upcomingTithi,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                Amavasya
              </Text>
            </View>
          </View>
        </View>

        {/* Subscribed Reminders Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: Colors[colorScheme ?? "light"].surface },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("alerts.subscribed")}
          </Text>

          {reminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text
                style={[
                  styles.emptyStateText,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {t("alerts.noReminders")}
              </Text>
              <TouchableOpacity
                style={styles.addReminderButton}
                onPress={handleAddReminder}
              >
                <Text
                  style={[
                    styles.addReminderButtonText,
                    { color: Colors[colorScheme ?? "light"].primary },
                  ]}
                >
                  {t("alerts.addReminder")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.remindersContainer}>
              {reminders.map((reminder) => (
                <View key={reminder.id} style={styles.reminderItem}>
                  <View style={styles.reminderInfo}>
                    <Text
                      style={[
                        styles.reminderTitle,
                        { color: Colors[colorScheme ?? "light"].text },
                      ]}
                    >
                      {reminder.title}
                    </Text>
                    <Text
                      style={[
                        styles.reminderDate,
                        { color: Colors[colorScheme ?? "light"].tint },
                      ]}
                    >
                      {reminder.date} at {reminder.time}
                    </Text>
                    <Text
                      style={[
                        styles.reminderTithi,
                        { color: Colors[colorScheme ?? "light"].tint },
                      ]}
                    >
                      {reminder.tithi}
                    </Text>
                  </View>

                  <View style={styles.reminderActions}>
                    <Switch
                      value={reminder.enabled}
                      onValueChange={(value) =>
                        handleToggleReminder(reminder.id, value)
                      }
                      trackColor={{
                        false: colors.light.outlineVariant,
                        true: colors.light.primary,
                      }}
                      thumbColor={colors.light.onPrimary}
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteReminder(reminder.id)}
                    >
                      <Text style={styles.deleteButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.onPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  upcomingContainer: {
    gap: spacing.sm,
  },
  upcomingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.light.surfaceVariant,
    borderRadius: 8,
  },
  upcomingDate: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  upcomingTithi: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyStateText: {
    fontSize: typography.fontSize.md,
    marginBottom: spacing.md,
  },
  addReminderButton: {
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.primary,
  },
  addReminderButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  remindersContainer: {
    gap: spacing.md,
  },
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.light.surfaceVariant,
    borderRadius: 8,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  reminderDate: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  reminderTithi: {
    fontSize: typography.fontSize.sm,
  },
  reminderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.light.error,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.onError,
  },
});
