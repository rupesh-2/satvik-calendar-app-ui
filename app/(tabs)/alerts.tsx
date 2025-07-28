import React, { useState } from "react";
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
import { useUserPrefsStore, Reminder } from "@/store/useUserPrefsStore";
import {
  schedulePanchangReminder,
  cancelNotification,
} from "@/lib/notifications";
import { spacing, typography } from "@/constants/theme";

export default function AlertsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { reminders, addReminder, deleteReminder, toggleReminder } =
    useUserPrefsStore();
  const [upcomingTithis] = useState([
    {
      id: "1",
      name: "Ekadashi",
      date: "2024-01-15",
      description: "Fasting day",
    },
    {
      id: "2",
      name: "Purnima",
      date: "2024-01-20",
      description: "Full moon day",
    },
    {
      id: "3",
      name: "Amavasya",
      date: "2024-01-25",
      description: "New moon day",
    },
  ]);

  const handleAddReminder = async (tithi: any) => {
    try {
      const reminder: Reminder = {
        id: tithi.id,
        date: tithi.date,
        tithi: tithi.name,
        title: `${tithi.name} Reminder`,
        time: "06:00",
        enabled: true,
      };

      const success = await schedulePanchangReminder(reminder);

      if (success) {
        addReminder(reminder);
      }
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  const handleDeleteReminder = async (reminderId: string) => {
    try {
      await cancelNotification(reminderId);
      deleteReminder(reminderId);
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const handleToggleReminder = async (reminderId: string) => {
    const reminder = reminders.find((r) => r.id === reminderId);
    if (!reminder) return;

    try {
      if (reminder.enabled) {
        await cancelNotification(reminderId);
      } else {
        await schedulePanchangReminder(reminder);
      }
      toggleReminder(reminderId);
    } catch (error) {
      console.error("Error toggling reminder:", error);
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text
          style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {t("alerts.title")}
        </Text>

        {/* Upcoming Tithis */}
        <View
          style={[
            styles.section,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
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

          {upcomingTithis.map((tithi) => (
            <View
              key={tithi.id}
              style={[
                styles.tithiItem,
                { backgroundColor: Colors[colorScheme ?? "light"].background },
              ]}
            >
              <View style={styles.tithiInfo}>
                <Text
                  style={[
                    styles.tithiName,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  {tithi.name}
                </Text>
                <Text
                  style={[
                    styles.tithiDate,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  {tithi.date}
                </Text>
                <Text
                  style={[
                    styles.tithiDescription,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  {tithi.description}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.addButton,
                  { backgroundColor: Colors[colorScheme ?? "light"].tint },
                ]}
                onPress={() => handleAddReminder(tithi)}
              >
                <Text
                  style={[
                    styles.addButtonText,
                    { color: Colors[colorScheme ?? "light"].background },
                  ]}
                >
                  {t("alerts.add")}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Subscribed Reminders */}
        <View
          style={[
            styles.section,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
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
            <Text
              style={[
                styles.emptyText,
                { color: Colors[colorScheme ?? "light"].tint },
              ]}
            >
              {t("alerts.noReminders")}
            </Text>
          ) : (
            reminders.map((reminder) => (
              <View
                key={reminder.id}
                style={[
                  styles.reminderItem,
                  {
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                  },
                ]}
              >
                <View style={styles.reminderInfo}>
                  <Text
                    style={[
                      styles.reminderName,
                      { color: Colors[colorScheme ?? "light"].text },
                    ]}
                  >
                    {reminder.tithi}
                  </Text>
                  <Text
                    style={[
                      styles.reminderDate,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {reminder.date}
                  </Text>
                  <Text
                    style={[
                      styles.reminderDescription,
                      { color: Colors[colorScheme ?? "light"].text },
                    ]}
                  >
                    {reminder.title}
                  </Text>
                </View>

                <View style={styles.reminderActions}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      {
                        backgroundColor: reminder.enabled
                          ? Colors[colorScheme ?? "light"].tint
                          : Colors[colorScheme ?? "light"].background,
                        borderColor: Colors[colorScheme ?? "light"].tint,
                      },
                    ]}
                    onPress={() => handleToggleReminder(reminder.id)}
                  >
                    <Text
                      style={[
                        styles.toggleButtonText,
                        {
                          color: reminder.enabled
                            ? Colors[colorScheme ?? "light"].background
                            : Colors[colorScheme ?? "light"].tint,
                        },
                      ]}
                    >
                      {reminder.enabled
                        ? t("alerts.active")
                        : t("alerts.inactive")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.deleteButton,
                      { backgroundColor: "#FF4444" },
                    ]}
                    onPress={() => handleDeleteReminder(reminder.id)}
                  >
                    <Text
                      style={[
                        styles.deleteButtonText,
                        { color: Colors[colorScheme ?? "light"].background },
                      ]}
                    >
                      {t("alerts.delete")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
  },
  section: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  tithiItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  tithiInfo: {
    flex: 1,
  },
  tithiName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  tithiDate: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  tithiDescription: {
    fontSize: typography.fontSize.sm,
  },
  addButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    textAlign: "center",
    fontStyle: "italic",
  },
  reminderItem: {
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  reminderInfo: {
    marginBottom: spacing.sm,
  },
  reminderName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  reminderDate: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  reminderDescription: {
    fontSize: typography.fontSize.sm,
  },
  reminderActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  toggleButton: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  toggleButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  deleteButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
});
