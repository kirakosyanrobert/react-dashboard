import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import { Button, ButtonVariants, ButtonActionTypes } from '../../components/ui/Button';
import { useNavigation, useTranslation } from '../../hooks';
import { imitateSignUp } from '../../helpers/imitateSignUp';
 
//TODO make SignUpForm component
function SignUpPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {navigate, routes} = useNavigation();
  const translate = useTranslation()

   async function handleSignUpFormSubmit(e) {
      e.preventDefault();
      if(email && firstName && lastName) {
            const authObj = {
                email,
                firstName, 
                lastName
            }
            const { success }  = await imitateSignUp(authObj);
            if(success) {
                alert('Your Profile created successfully, but need to be approved with Admins!');
                navigate(routes.login);
            } else {
                alert('There is problem with creating profile')
            }

      } else {
         alert('Fill in inputs');
      }
    }


    return (
        <div className="d-flex justify-content-center align-items-center">
              <Form onSubmit={handleSignUpFormSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{translate(({inputs}) => inputs.email.title)}</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>{translate(({inputs}) => inputs.firstName.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label>{translate(({inputs}) => inputs.lastName.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                    <Button
                        className="mr-4"
                        title={translate(({buttons}) => buttons.signUp)}
                        type={ButtonActionTypes.Submit}
                        variant={ButtonVariants.Primary}
                        onClick={handleSignUpFormSubmit}
                    />
                    <Button
                        title={translate(({buttons}) => buttons.login)}
                        variant={ButtonVariants.Light}
                        onClick={() => navigate(routes.login)}
                    />
                </div>
              </Form>
        </div>
    )
}

export default SignUpPage;