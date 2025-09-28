import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translations
import enCommon from '../locales/en/common.json';
import deCommon from '../locales/de/common.json';
import enAbout from '../locales/en/about.json';
import deAbout from '../locales/de/about.json';
import enApi from '../locales/en/api.json';
import deApi from '../locales/de/api.json';
import enSensors from '../locales/en/sensors.json';
import deSensors from '../locales/de/sensors.json';

const resources = {
  en: {
    common: enCommon,
    about: enAbout,
    api: enApi,
    sensors: enSensors,
  },
  de: {
    common: deCommon,
    about: deAbout,
    api: deApi,
    sensors: deSensors,
  },
};

// Language detection
const getStoredLanguage = async (): Promise<string> => {
  try {
    const stored = await AsyncStorage.getItem('user-language');
    return stored || 'de';
  } catch {
    return 'de';
  }
};

const saveLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('user-language', language);
  } catch {
    // Silent fail
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'de', // Default language, will be overridden by stored language
    fallbackLng: 'de',
    debug: __DEV__,

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    defaultNS: 'common',
    ns: ['common', 'about', 'api', 'sensors'],

    react: {
      useSuspense: false, // Important for React Native
    },
  });

// Load stored language on initialization
getStoredLanguage().then((language) => {
  i18n.changeLanguage(language);
});

// Save language when it changes
i18n.on('languageChanged', (language) => {
  saveLanguage(language);
});

export default i18n;
export { saveLanguage, getStoredLanguage };