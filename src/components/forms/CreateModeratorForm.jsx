import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation, useAlerts } from '../../hooks';

const formInitialState = {
    username: '',
    password: '',
    name: '',
    phoneNumber: ''
}

function CreateModeratorForm ({onCreate, onClose, loading}) {
    const [formData, setFormData] = useState(formInitialState);
    const translate = useTranslation();
    const { setError } = useAlerts();

    function handleSubmit (e) {
        e.preventDefault();
        if(
            !!formData.username &&
            !!formData.password &&
            !!formData.phoneNumber &&
            !!formData.name
          ) {
          onCreate({
            username: formData.username,
            password: formData.password,
            name: formData.name,
            phone: formData.phoneNumber
          });
        } else {
          setError({message: 'Inputs can`t be empty!'});
        }
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.username.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, 'username': e.target.value})}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.password.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, 'password': e.target.value})}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.name.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, 'name': e.target.value})}
                  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>{translate(({inputs}) => inputs.phoneNumber.title)}</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, 'phoneNumber': e.target.value})}
                    />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                      className="mr-2"
                      title={translate(({buttons}) => buttons.create)}
                      variant={ButtonVariants.Primary}
                      type={ButtonActionTypes.Submit}
                      onClick={handleSubmit}
                      loading={loading}
                  />
                  <Button
                      title={translate(({buttons}) => buttons.close)}
                      onClick={onClose}
                  />
                </div>
            </Form>
    )
}
export default CreateModeratorForm;