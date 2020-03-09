import React, {useEffect, useState} from 'react';

import { StorageKey } from '../consts';
import { LanguageContext, LanguageCode, useEffectOnce } from '../hooks';

export function Language({children}) {
    const [language, setLanguage] = useState(LanguageCode.EN);
    const [translations, setTranslations] = useState(null);

    useEffectOnce(() => {
        const code = localStorage.getItem(StorageKey.LanguageCode);

        if(code) {
            setLanguage(code);
        }
    });

    useEffect(() => {
        async function getTranslations(code) {
            const t = await fetch(`/locales/${code}/translations.json`)
            .then(res => res.json())
            .then(res => res)

            setTranslations(t);
        }

        getTranslations(language);
    }, [language]);

    function changeLanguage(code) {
        setLanguage(code);
        localStorage.setItem(StorageKey.LanguageCode, code)
    }

    if(!translations) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{language, translations, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}