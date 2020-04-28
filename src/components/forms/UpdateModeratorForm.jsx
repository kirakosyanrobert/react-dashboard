import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation, useAlerts } from '../../hooks';


function UpdateModeratorForm ({moderator, onUpdate, onClose, loading}) {
    const [formData, setFormData] = useState({...moderator});
    const translate = useTranslation();
    const { setError } = useAlerts();
   
    function handleSubmit (e) {
        e.preventDefault();
        if(
            !!formData.username &&
            // !!formData.password &&
            !!formData.name &&
            !!formData.phone
           ) {
          onUpdate({
            username: formData.username,
            // password: formData.password,
            name: formData.name,
            phone: formData.phone
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
                {/* <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.password.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, 'password': e.target.value})}
                  />
                </Form.Group> */}

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
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, 'phone': e.target.value})}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                      className="mr-2"
                      title={translate(({buttons}) => buttons.save)}
                      variant={ButtonVariants.Primary}
                      type={ButtonActionTypes.Submit}
                      onClick={handleSubmit}
                      disabled={loading}
                  />
                  <Button
                      title={translate(({buttons}) => buttons.close)}
                      onClick={onClose}
                  />
                </div>
            </Form>
    )
}
export default UpdateModeratorForm;