import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import { Button, ButtonVariants, ButtonActionTypes } from '../../components/ui/Button';
import { useNavigation, useTranslation, useAlerts, useRequest } from '../../hooks';
import { StorageKey } from '../../consts';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher/LanguageSwitcher';
 
//TODO make LoginForm component
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {navigate, routes} = useNavigation();
  const translate = useTranslation();
  const { setError } = useAlerts();
  
  const { loading: loginLoading, request: login } = useRequest();

    async function handleLoginFormSubmit(e) {
        e.preventDefault();

        if(username && password) {
          const loginCredentals = JSON.stringify({username, password})
          try {
            const data = await login('/auth/admin-signin', 'POST', loginCredentals);
              
            localStorage.setItem(StorageKey.Token, data.token);
            localStorage.setItem(StorageKey.LoggedInUser, JSON.stringify(data));
            navigate(routes.home);
          } catch(e) {
               setError({message: e.message});
          }

        } else {
          setError({message: 'Fill in inputs'});
        }
      }

    return (
        <div className="d-flex justify-content-center align-items-center">
              <Form onSubmit={handleLoginFormSubmit}>
                <div className="d-flex justify-content-end">
                  <LanguageSwitcher />
                </div>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{translate(({inputs}) => inputs.username.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>{translate(({inputs}) => inputs.password.title)}</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                    <Button
                        className="mr-4"
                        title={translate(({buttons}) => buttons.login)}
                        type={ButtonActionTypes.Submit}
                        variant={ButtonVariants.Primary}
                        onClick={handleLoginFormSubmit}
                        disabled={loginLoading}
                      />
                    <Button
                        title={translate(({buttons}) => buttons.signUp)}
                        variant={ButtonVariants.Light}
                        onClick={() => navigate(routes.signUp)}
                    />
                </div>
              </Form>
        </div>
    )
};

export default LoginPage;