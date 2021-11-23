import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../index.js';

const i18nInstance = i18n.createInstance();
const defaultLanguage = 'ru';

i18nInstance
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18nInstance;
