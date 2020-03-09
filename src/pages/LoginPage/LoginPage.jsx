import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import { Button, ButtonVariants, ButtonActionTypes } from '../../components/ui/Button';
import { useNavigation, useTranslation } from '../../hooks';
import { StorageKey } from '../../consts';
import { imitateLogin } from '../../helpers/imitateLogin';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher/LanguageSwitcher';
 
//TODO make LoginForm component
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {navigate, routes} = useNavigation();
  const translate = useTranslation();

   async function handleLoginFormSubmit(e) {
      e.preventDefault();
      if(email && password) {
          const { success, token }  = await imitateLogin({email, password});
          if(success) {
            localStorage.setItem(StorageKey.Token, token);
            navigate(routes.home);
          } else {
            alert('Incorrect Email or password!')
          }

      } else {
         alert('Fill in inputs');
      }
    }

   

    return (
        <div className="d-flex justify-content-center align-items-center">
              <Form onSubmit={handleLoginFormSubmit}>
                  <LanguageSwitcher />
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                    <Button
                        title={translate(({buttons}) => buttons.login)}
                        type={ButtonActionTypes.Submit}
                        variant={ButtonVariants.Primary}
                        onClick={handleLoginFormSubmit}
                      />
                    <Button
                        title="Sign up first"
                        variant={ButtonVariants.Light}
                        onClick={() => navigate(routes.signUp)}
                    />
                </div>
              </Form>
        </div>
    )
}

export default LoginPage;