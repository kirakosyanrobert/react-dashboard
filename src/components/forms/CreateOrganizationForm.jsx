import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation } from '../../hooks';

// title: '',
// email: '',
// website: '',
// address: '',
// postCode: number,
// numberOfFloors: number,

// coordinates:  {lat: number, lon: number},
// workingHours: [[['9:00', '18:00'], [...], [...], [...], [], [], []]]
// phoneNumber: ['', ''],
// tags: ['', '', '']

function CreateOrganizationForm ({onCreate}) {
    const translate = useTranslation();

    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [numberOfFloors, setNumberOfFloors] = useState('');





    function handleSubmit (e) {
        e.preventDefault();
        if(title && email && website && address && postCode && numberOfFloors) {
            const org = {
                id: uuid(),
                title,
                email,
                address,
                postCode: +postCode,
                numberOfFloors: +numberOfFloors,
            };
            onCreate(org);
        } else {
            alert("Fill in Inputs");
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.title.title)}</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.email.title)}</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.website.title)}</Form.Label>
                <Form.Control
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.address.title)}</Form.Label>
                <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.postCode.title)}</Form.Label>
                <Form.Control
                    type="number"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.numberOfFloors.title)}</Form.Label>
                <Form.Control
                    type="number"
                    value={numberOfFloors}
                    onChange={(e) => setNumberOfFloors(e.target.value)}
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
export default CreateOrganizationForm;