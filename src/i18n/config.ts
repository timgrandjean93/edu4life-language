import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '../locales/en.json';
import hrTranslations from '../locales/hr.json';
import nlTranslations from '../locales/nl.json';
import skTranslations from '../locales/sk.json';

i18n
  .use(LanguageDetector) // Detect user language from browser
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      nl: {
        translation: nlTranslations,
      },
      hr: {
        translation: hrTranslations,
      },
      sk: {
        translation: skTranslations,
      },
    },
    fallbackLng: 'en', // Use English if translation is missing
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator'],
      // Cache user language preference
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;

