import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./en.json";
import ne from "./ne.json";

const resources = {
  en: {
    translation: en,
  },
  ne: {
    translation: ne,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale.split("-")[0], // Get language code
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v3",
});

export default i18n;
