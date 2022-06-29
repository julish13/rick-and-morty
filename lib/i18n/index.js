import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';

const i18n = createInstance({
  fallbackLng: 'en',
  debug: true,

  resources: {
    en,
  },
});

i18n.use(initReactI18next).init();

export default i18n;
