import React from 'react';

import { Button, ButtonSizes } from '../Button';
import { useLanguage, LanguageCode } from '../../../hooks';

export function LanguageSwitcher () {
  const [ , changeLanguage ] = useLanguage();

    function handleChangeLanguage(code) {
        if(code === LanguageCode.EN) {
          changeLanguage(LanguageCode.EN)
        } else if(code === LanguageCode.RU) {
          changeLanguage(LanguageCode.RU)
        } else if(code === LanguageCode.GR) {
          changeLanguage(LanguageCode.GR)
        } else {
          changeLanguage(LanguageCode.EN)
        }
    }

    return (
        <div className="d-flex justify-content-between" style={{width: 150, margin: '.5rem auto'}}>
            <Button
                title="EN"
                size={ButtonSizes.Small}
                onClick={() => handleChangeLanguage(LanguageCode.EN)}
             />
            <Button
                title="RU"
                size={ButtonSizes.Small}
                onClick={() => handleChangeLanguage(LanguageCode.RU)}
            />
            <Button
                title="GR"
                size={ButtonSizes.Small}
                onClick={() => handleChangeLanguage(LanguageCode.GR)}
            />
        </div>
    )

}