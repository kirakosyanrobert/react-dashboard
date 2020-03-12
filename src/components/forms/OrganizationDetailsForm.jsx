import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation } from '../../hooks';


function OrganizationDetailsForm ({organization, onUpdate, editable}) {
    const [org, setOrg] = useState(organization);
    const translate = useTranslation();

    function handleGetInputsData (field, value) {
        setOrg({...org, [field]: value})
    }

    function handleSubmit (e) {
        e.preventDefault();
        if(org.title !== '') {
            onUpdate(org);
        } else {
            alert("Organization Name can`t me empty");
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.title.title)}</Form.Label>
                <Form.Control
                    readOnly={!editable}
                    type="text"
                    value={org.title}
                    onChange={(e) => handleGetInputsData('title', e.target.value)}
                />
            </Form.Group>
            <Button
                title={translate(({buttons}) => buttons.save)}
                variant={ButtonVariants.Primary}
                type={ButtonActionTypes.Submit}
                onClick={handleSubmit}
                disabled={!editable}
            />
        </Form>
    )
}
export default OrganizationDetailsForm;