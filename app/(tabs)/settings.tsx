import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useUserPrefsStore } from "@/store/useUserPrefsStore";
import { requestNotificationPermissions } from "@/lib/notifications";
import { colors, spacing, typography } from "@/constants/theme";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { timezone, setTimezone, alertSettings, setAlertSettings } =
    useUserPrefsStore();

  const [notificationPermission, setNotificationPermission] =
    useState<boolean>(false);

  const handleLanguageChange = (newLanguage: "en" | "ne") => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleNotificationPermission = async () => {
    try {
      const status = await requestNotificationPermissions();
      setNotificationPermission(status === "granted");
      if (status === "granted") {
        Alert.alert("Success", "Notification permissions granted!");
      } else {
        Alert.alert(
          "Permission Denied",
          "Please enable notifications in your device settings."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to request notification permissions.");
    }
  };

  const handleAlertSettingChange = (
    key: keyof typeof alertSettings,
    value: boolean
  ) => {
    setAlertSettings({
      ...alertSettings,
      [key]: value,
    });
  };

  const timezones = [
    { value: "Asia/Kathmandu", label: "Nepal (UTC+5:45)" },
    { value: "Asia/Kolkata", label: "India (UTC+5:30)" },
    { value: "Asia/Dhaka", label: "Bangladesh (UTC+6:00)" },
    { value: "Asia/Colombo", label: "Sri Lanka (UTC+5:30)" },
  ];

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
          {t("settings.title")}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Language Settings */}
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
            {t("settings.language")}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            {t("settings.languageDesc")}
          </Text>

          <View style={styles.languageContainer}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                language === "en" && styles.activeLanguageButton,
              ]}
              onPress={() => handleLanguageChange("en")}
            >
              <Text
                style={[
                  styles.languageText,
                  language === "en" && styles.activeLanguageText,
                ]}
              >
                English
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.languageButton,
                language === "ne" && styles.activeLanguageButton,
              ]}
              onPress={() => handleLanguageChange("ne")}
            >
              <Text
                style={[
                  styles.languageText,
                  language === "ne" && styles.activeLanguageText,
                ]}
              >
                नेपाली
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timezone Settings */}
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
            {t("settings.timezone")}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            {t("settings.timezoneDesc")}
          </Text>

          <View style={styles.timezoneContainer}>
            {timezones.map((tz) => (
              <TouchableOpacity
                key={tz.value}
                style={[
                  styles.timezoneButton,
                  timezone === tz.value && styles.activeTimezoneButton,
                ]}
                onPress={() => setTimezone(tz.value)}
              >
                <Text
                  style={[
                    styles.timezoneText,
                    timezone === tz.value && styles.activeTimezoneText,
                  ]}
                >
                  {tz.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notification Settings */}
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
            {t("settings.notifications")}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            {t("settings.notificationsDesc")}
          </Text>

          <TouchableOpacity
            style={styles.permissionButton}
            onPress={handleNotificationPermission}
          >
            <Text
              style={[
                styles.permissionButtonText,
                { color: Colors[colorScheme ?? "light"].primary },
              ]}
            >
              Request Notification Permissions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alert Settings */}
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
            {t("settings.alertSettings")}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            {t("settings.alertSettingsDesc")}
          </Text>

          <View style={styles.alertSettingsContainer}>
            <View style={styles.alertSetting}>
              <Text
                style={[
                  styles.alertSettingText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {t("settings.ekadashiAlerts")}
              </Text>
              <Switch
                value={alertSettings.ekadashi}
                onValueChange={(value) =>
                  handleAlertSettingChange("ekadashi", value)
                }
                trackColor={{
                  false: colors.light.outlineVariant,
                  true: colors.light.primary,
                }}
                thumbColor={colors.light.onPrimary}
              />
            </View>

            <View style={styles.alertSetting}>
              <Text
                style={[
                  styles.alertSettingText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {t("settings.purnimaAlerts")}
              </Text>
              <Switch
                value={alertSettings.purnima}
                onValueChange={(value) =>
                  handleAlertSettingChange("purnima", value)
                }
                trackColor={{
                  false: colors.light.outlineVariant,
                  true: colors.light.primary,
                }}
                thumbColor={colors.light.onPrimary}
              />
            </View>

            <View style={styles.alertSetting}>
              <Text
                style={[
                  styles.alertSettingText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {t("settings.amavasyaAlerts")}
              </Text>
              <Switch
                value={alertSettings.amavasya}
                onValueChange={(value) =>
                  handleAlertSettingChange("amavasya", value)
                }
                trackColor={{
                  false: colors.light.outlineVariant,
                  true: colors.light.primary,
                }}
                thumbColor={colors.light.onPrimary}
              />
            </View>

            <View style={styles.alertSetting}>
              <Text
                style={[
                  styles.alertSettingText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {t("settings.sankrantiAlerts")}
              </Text>
              <Switch
                value={alertSettings.sankranti}
                onValueChange={(value) =>
                  handleAlertSettingChange("sankranti", value)
                }
                trackColor={{
                  false: colors.light.outlineVariant,
                  true: colors.light.primary,
                }}
                thumbColor={colors.light.onPrimary}
              />
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
  section: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  sectionDescription: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
  },
  languageContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  languageButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.outline,
    alignItems: "center",
  },
  activeLanguageButton: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  languageText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onSurface,
  },
  activeLanguageText: {
    color: colors.light.onPrimary,
  },
  timezoneContainer: {
    gap: spacing.sm,
  },
  timezoneButton: {
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.outline,
  },
  activeTimezoneButton: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  timezoneText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onSurface,
  },
  activeTimezoneText: {
    color: colors.light.onPrimary,
  },
  permissionButton: {
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.primary,
    alignItems: "center",
  },
  permissionButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  alertSettingsContainer: {
    gap: spacing.md,
  },
  alertSetting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  alertSettingText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
});
