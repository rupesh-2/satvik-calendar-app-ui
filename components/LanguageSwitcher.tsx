import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../store/useLanguageStore";
import { colors, spacing, borderRadius, typography } from "../constants/theme";

interface LanguageSwitcherProps {
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  style,
}) => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ne" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.button, language === "en" && styles.activeButton]}
        onPress={toggleLanguage}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            language === "en" && styles.activeButtonText,
          ]}
        >
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, language === "ne" && styles.activeButton]}
        onPress={toggleLanguage}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            language === "ne" && styles.activeButtonText,
          ]}
        >
          ने
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.light.surfaceVariant,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  button: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: colors.light.primary,
  },
  buttonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.light.onSurfaceVariant,
  },
  activeButtonText: {
    color: colors.light.onPrimary,
    fontWeight: typography.fontWeight.bold,
  },
});
