import { Platform } from "react-native";

export const colors = {
  light: {
    primary: "#FF6B35",
    primaryDark: "#E55A2B",
    secondary: "#4ECDC4",
    secondaryDark: "#45B7AF",
    background: "#FFFFFF",
    surface: "#F8F9FA",
    surfaceVariant: "#F1F3F4",
    error: "#B00020",
    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",
    onBackground: "#1C1B1F",
    onSurface: "#1C1B1F",
    onSurfaceVariant: "#49454F",
    onError: "#FFFFFF",
    outline: "#79747E",
    outlineVariant: "#CAC4D0",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#313033",
    inverseOnSurface: "#F4EFF4",
    inversePrimary: "#D0BCFF",
    surfaceDisabled: "#1C1B1F",
    onSurfaceDisabled: "#1C1B1F",
    backdrop: "#000000",
    elevation: {
      level0: "transparent",
      level1: "#FDFCFF",
      level2: "#FDFCFF",
      level3: "#FDFCFF",
      level4: "#FDFCFF",
      level5: "#FDFCFF",
    },
    // Special colors for Panchang
    auspicious: "#4CAF50",
    inauspicious: "#F44336",
    fasting: "#FF9800",
    special: "#9C27B0",
    tithi: "#2196F3",
    nakshatra: "#00BCD4",
    paksha: "#FF5722",
  },
  dark: {
    primary: "#FF6B35",
    primaryDark: "#E55A2B",
    secondary: "#4ECDC4",
    secondaryDark: "#45B7AF",
    background: "#1C1B1F",
    surface: "#313033",
    surfaceVariant: "#49454F",
    error: "#F2B8B5",
    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",
    onBackground: "#E6E1E5",
    onSurface: "#E6E1E5",
    onSurfaceVariant: "#CAC4D0",
    onError: "#000000",
    outline: "#938F99",
    outlineVariant: "#49454F",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#E6E1E5",
    inverseOnSurface: "#313033",
    inversePrimary: "#6750A4",
    surfaceDisabled: "#E6E1E5",
    onSurfaceDisabled: "#E6E1E5",
    backdrop: "#000000",
    elevation: {
      level0: "transparent",
      level1: "#313033",
      level2: "#313033",
      level3: "#313033",
      level4: "#313033",
      level5: "#313033",
    },
    // Special colors for Panchang
    auspicious: "#81C784",
    inauspicious: "#E57373",
    fasting: "#FFB74D",
    special: "#BA68C8",
    tithi: "#64B5F6",
    nakshatra: "#4DD0E1",
    paksha: "#FF8A65",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 50,
};

export const typography = {
  fontFamily: {
    regular: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
    medium: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
    bold: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

export const shadows = {
  light: {
    small: {
      shadowColor: colors.light.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    medium: {
      shadowColor: colors.light.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: colors.light.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowColor: colors.dark.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    medium: {
      shadowColor: colors.dark.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: colors.dark.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
};
