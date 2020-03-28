import React from 'react';
import { Form } from 'react-bootstrap';

import { useLanguage, LanguageCode } from '../../../hooks';

export function LanguageSwitcher () {
  const [ language, changeLanguage ] = useLanguage();

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
        <div className="d-flex">
             <Form.Group>
              <Form.Control
                as="select"
                size="sm"
                value={language}
                onChange={(e) => handleChangeLanguage(e.target.value)}
              >
                <option value={LanguageCode.EN}>EN</option>
                <option value={LanguageCode.RU}>RU</option>
                <option value={LanguageCode.GR}>GR</option>
              </Form.Control>
            </Form.Group>
        </div>
    )

}