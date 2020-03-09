import { createContext, useContext } from 'react';

export const LanguageCode = {
    EN: 'en',
    RU: 'ru',
    GR: 'gr'
}

export const LanguageContext = createContext({
    language: LanguageCode.EN,
    translations: null,
    changeLanguage: () => null
});

export function useLanguage() {
    const { language, changeLanguage, translations } = useContext(LanguageContext);
    return [language, changeLanguage, translations];
}