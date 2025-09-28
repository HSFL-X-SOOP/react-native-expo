import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import de from './de.json';
import en from './en.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
};

// Get the best language based on device settings
const getBestLanguage = () => {
  const rawLocale = Localization.locale || 'de';
  const languageCode = rawLocale.split('-')[0];
  return Object.keys(resources).includes(languageCode) ? languageCode : 'de';
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: getBestLanguage(),
    fallbackLng: 'de',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;