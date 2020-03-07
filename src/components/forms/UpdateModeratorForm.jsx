import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';


function UpdateModeratorForm ({moderator, onUpdate}) {
    const [formData, setFormData] = useState(moderator);
   
    function handleSubmit (e) {
        e.preventDefault();
        onUpdate(formData);
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pavel"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, 'firstName': e.target.value})}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Durov"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, 'lastName': e.target.value})}
                  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@email.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, 'email': e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="#@hGa3"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, 'password': e.target.value})}
                  />
                </Form.Group>
                <Button
                    title="Save"
                    variant={ButtonVariants.Primary}
                    type={ButtonActionTypes.Submit}
                    onClick={handleSubmit}
                />
            </Form>
    )
}
export default UpdateModeratorForm;