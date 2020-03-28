import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation } from '../../hooks';


function UpdateModeratorForm ({moderator, onUpdate, onClose}) {
    const [formData, setFormData] = useState(moderator);
    const translate = useTranslation();
   
    function handleSubmit (e) {
        e.preventDefault();
        if(!!formData.username && !!formData.password && !!formData.name && !!formData.phoneNumber) {
          onUpdate(formData);
        } else {
          alert('Inputs can`t be empty!');
        }
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.username.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, 'username': e.target.value})}
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
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.name.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, 'name': e.target.value})}
                  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>{translate(({inputs}) => inputs.phoneNumber.title)}</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, 'phoneNumber': e.target.value})}
                    />
                </Form.Group>
               
                <Button
                    className="mr-2"
                    title={translate(({buttons}) => buttons.save)}
                    variant={ButtonVariants.Primary}
                    type={ButtonActionTypes.Submit}
                    onClick={handleSubmit}
                />
                 <Button
                    title={translate(({buttons}) => buttons.close)}
                    onClick={onClose}
                />
            </Form>
    )
}
export default UpdateModeratorForm;