import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';


function CreateOrganizationForm ({onCreate}) {
    const [title, setTitle] = useState('');

    function handleSubmit (e) {
        e.preventDefault();
        if(title) {
            const org = {
                id: uuid(),
                title,
            };
            onCreate(org);
            
        } else {
            alert("Type Organization Name");
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="InVino"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Button
                title="Create"
                variant={ButtonVariants.Primary}
                type={ButtonActionTypes.Submit}
                onClick={handleSubmit}
            />
        </Form>
    )
}
export default CreateOrganizationForm;