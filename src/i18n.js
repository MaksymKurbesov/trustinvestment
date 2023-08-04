import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // fallbackLng: "ru",
    // resources,
    detection: {
      order: ["querystring", "cookie"],
      cache: ["cookie"],
    },
    lng: "ru",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { i18n };
