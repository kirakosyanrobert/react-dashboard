import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import { Button, ButtonVariants, ButtonActionTypes } from '../../components/ui/Button';
import { useNavigation } from '../../hooks';
import { imitateSignUp } from '../../helpers/imitateSignUp';
 
//TODO make SignUpForm component
function SignUpPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {navigate, routes} = useNavigation();

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
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pavel"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Durov"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                    <Button
                        title="Sign Up"
                        type={ButtonActionTypes.Submit}
                        variant={ButtonVariants.Primary}
                        onClick={handleSignUpFormSubmit}
                    />
                    <Button
                        title="Go to Login"
                        variant={ButtonVariants.Light}
                        onClick={() => navigate(routes.login)}
                    />
                </div>
              </Form>
        </div>
    )
}

export default SignUpPage;