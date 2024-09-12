import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./locales/en.json";
import es from "./locales/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  compatibilityJSON: "v3",
  lng: Localization.locale.split("-")[0],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
