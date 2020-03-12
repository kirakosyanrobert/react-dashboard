import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation } from '../../hooks';


function UpdateModeratorForm ({moderator, onUpdate}) {
    const [formData, setFormData] = useState(moderator);
    const translate = useTranslation();
   
    function handleSubmit (e) {
        e.preventDefault();
        if(!!formData.firstName && !!formData.lastName && !!formData.email && !!formData.password) {
          onUpdate(formData);
        } else {
          alert('Inputs can`t be empty!');
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
                    title={translate(({buttons}) => buttons.save)}
                    variant={ButtonVariants.Primary}
                    type={ButtonActionTypes.Submit}
                    onClick={handleSubmit}
                />
            </Form>
    )
}
export default UpdateModeratorForm;