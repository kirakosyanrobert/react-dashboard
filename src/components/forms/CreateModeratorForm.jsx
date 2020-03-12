import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation } from '../../hooks';

const formInitialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

function CreateModeratorForm ({onCreate}) {
    const [formData, setFormData] = useState(formInitialState);
    const translate = useTranslation();
   
    function handleSubmit (e) {
        e.preventDefault();
        const data = {id: Date.now().toString(), ...formData};
        if(!!data.firstName && !!data.lastName && !!data.email && !!data.password) {
          onCreate(data);
        } else {
          alert('inputs can`t be empty!');
        }
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.firstName.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, 'firstName': e.target.value})}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.lastName.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, 'lastName': e.target.value})}
                  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>{translate(({inputs}) => inputs.email.title)}</Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, 'email': e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.password.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, 'password': e.target.value})}
                  />
                </Form.Group>
                <Button
                    title={translate(({buttons}) => buttons.create)}
                    variant={ButtonVariants.Primary}
                    type={ButtonActionTypes.Submit}
                    onClick={handleSubmit}
                />
            </Form>
    )
}
export default CreateModeratorForm;