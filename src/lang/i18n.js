import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationEn from "./translation.en.json";
import TranslationKo from "./translation.ko.json";

const resources = {
    'en-US': {
        translations: TranslationEn
    },
    'ko-KR': {
        translations: TranslationKo
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources:resources,
        lng: 'ko-KR',
        fallbackLng: {
            'en-US':['en-US'],
            default:['ko-KR']
        },
        debug: true,
        defaultNS: "translations",
        ns: "translations",
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;