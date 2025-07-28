import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useUserPrefsStore } from "@/store/useUserPrefsStore";
import { requestNotificationPermissions } from "@/lib/notifications";
import { spacing, typography } from "@/constants/theme";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { alertSettings, updateAlertSettings } = useUserPrefsStore();
  const [notificationPermission, setNotificationPermission] = useState(false);

  const handleLanguageChange = (newLanguage: "en" | "ne") => {
    setLanguage(newLanguage);
  };

  const handleAlertToggle = (tithiType: string) => {
    updateAlertSettings({
      ...alertSettings,
      [tithiType]: !alertSettings[tithiType as keyof typeof alertSettings],
    });
  };

  const handleRequestPermissions = async () => {
    try {
      const granted = await requestNotificationPermissions();
      setNotificationPermission(granted);
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
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
          {t("settings.title")}
        </Text>

        {/* Language Settings */}
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
            {t("settings.language")}
          </Text>

          <View style={styles.languageContainer}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                language === "en" && styles.activeLanguageButton,
                { borderColor: Colors[colorScheme ?? "light"].tint },
              ]}
              onPress={() => handleLanguageChange("en")}
            >
              <Text
                style={[
                  styles.languageText,
                  { color: Colors[colorScheme ?? "light"].text },
                  language === "en" && {
                    color: Colors[colorScheme ?? "light"].background,
                  },
                ]}
              >
                English
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.languageButton,
                language === "ne" && styles.activeLanguageButton,
                { borderColor: Colors[colorScheme ?? "light"].tint },
              ]}
              onPress={() => handleLanguageChange("ne")}
            >
              <Text
                style={[
                  styles.languageText,
                  { color: Colors[colorScheme ?? "light"].text },
                  language === "ne" && {
                    color: Colors[colorScheme ?? "light"].background,
                  },
                ]}
              >
                नेपाली
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Settings */}
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
            {t("settings.notifications")}
          </Text>

          <TouchableOpacity
            style={[
              styles.permissionButton,
              { backgroundColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={handleRequestPermissions}
          >
            <Text
              style={[
                styles.permissionButtonText,
                { color: Colors[colorScheme ?? "light"].background },
              ]}
            >
              {t("settings.requestPermissions")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alert Settings */}
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
            {t("settings.alertSettings")}
          </Text>

          {Object.entries(alertSettings).map(([key, value]) => (
            <View key={key} style={styles.settingRow}>
              <Text
                style={[
                  styles.settingText,
                  { color: Colors[colorScheme ?? "light"].text },
                ]}
              >
                {t(`settings.alerts.${key}`)}
              </Text>
              <Switch
                value={value}
                onValueChange={() => handleAlertToggle(key)}
                trackColor={{
                  false: Colors[colorScheme ?? "light"].background,
                  true: Colors[colorScheme ?? "light"].tint,
                }}
                thumbColor={Colors[colorScheme ?? "light"].background}
              />
            </View>
          ))}
        </View>

        {/* About Section */}
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
            {t("settings.about")}
          </Text>

          <Text
            style={[
              styles.aboutText,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t("settings.aboutText")}
          </Text>
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
  languageContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  languageButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  activeLanguageButton: {
    backgroundColor: Colors.light.tint,
  },
  languageText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  permissionButton: {
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  permissionButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  settingText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  aboutText: {
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
  },
});
