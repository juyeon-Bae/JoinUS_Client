import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from './en/translation.json'
import translationKo from './ko/translation.json'
import { getInitialLanguage } from "../utils/store/languageStore";


const resources =  {
  en: {
    translation: translationEn
  },
  ko: {
    translation: translationKo
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;