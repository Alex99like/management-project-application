import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from '../locales/en/translation';
import translationRu from '../locales/ru/translation';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEn,
    },
    ru: {
      translation: translationRu,
    },
  },
  fallbackLng: 'en',
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
