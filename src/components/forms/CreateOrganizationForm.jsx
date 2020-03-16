import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Badge } from 'react-bootstrap';
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
// phoneNumber: ['', ''],
// tags: ['', '', '']

// workingHours: [[['9:00', '18:00'], [...], [...], [...], [], [], []]]

const hours = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

const days = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
]

//TODO: create smaller components for this form
function CreateOrganizationForm ({onCreate}) {
    const translate = useTranslation();
    
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [numberOfFloors, setNumberOfFloors] = useState('');
    const [coordinates, setCoordinates] = useState({lat: '', lon: ''});
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [newTag, setNewTag] = useState('#');
    const [tags, setTags] = useState([]);



    function handleSubmit (e) {
        e.preventDefault();

        if(title && email && website && address && postCode && numberOfFloors && 
            coordinates.lat && coordinates.lon) {
            const org = {
                id: uuid(),
                title,
                email,
                address,
                postCode: +postCode,
                numberOfFloors: +numberOfFloors,
                coordinates: {...coordinates, lat: +coordinates.lat, lon: +coordinates.lon},
                phoneNumbers,
                tags
            };
            onCreate(org);
        } else {
            alert("Fill in Inputs");
        }
    }

    //Phone Number Actions
    function handleGetPhoneNumbers(index, value) {
        const tempPhoneNumers = [...phoneNumbers];
        tempPhoneNumers[index] = value;
        setPhoneNumbers(tempPhoneNumers);
    }

    function handleAddPhoneNumber () {
        if(phoneNumbers[phoneNumbers.length - 1] !== '') {
            setPhoneNumbers([...phoneNumbers, '']);
        }
    }

    function handleRemovePhoneNumber (index) {
        const tempPhoneNumers = [...phoneNumbers];
        tempPhoneNumers.splice(index, 1);
        setPhoneNumbers(tempPhoneNumers);
    }

    //Tags Actions
    function handleAddTag() {
        if(newTag.length > 1) {
            setTags([newTag, ...tags])
            setNewTag('#');
        }
    }

    // function handleRemoveTag() {}

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


            <Form.Group>
                <Form.Label>{'Latitude'}</Form.Label>
                <Form.Control
                    type="number"
                    value={coordinates.lat}
                    onChange={(e) => setCoordinates({...coordinates, lat: e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{'Longitude'}</Form.Label>
                <Form.Control
                    type="number"
                    value={coordinates.lon}
                    onChange={(e) => setCoordinates({...coordinates, lon: e.target.value})}
                />
            </Form.Group>


            {phoneNumbers.map((item, index) => (
                <Form.Group key={`phone-number-input-${index}`}>
                    <Form.Label>{`Phone number ${index + 1}`}</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            value={phoneNumbers[index]}
                            onChange={(e) => handleGetPhoneNumbers(index, e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                title="x"
                                outlined
                                disabled={index === 0}
                                onClick={() => handleRemovePhoneNumber(index)}
                            />
                            <Button
                                title="+"
                                outlined
                                disabled={index !== (phoneNumbers.length - 1)}
                                onClick={handleAddPhoneNumber}
                            />
                           
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            ))}


            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control 
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button
                            title="Add"
                            outlined
                            onClick={handleAddTag}
                        />
                    </InputGroup.Append>
                </InputGroup>
                <div className="w-100 d-flex flex-wrap">
                    {tags.map((tag, index) => (
                         <h4 key={`tag-item-${index}`} className="mr-3">
                            <Badge variant="secondary">{tag}</Badge>
                        </h4>
                    ))}
                </div>
            </Form.Group>

            <div className="d-flex flex-nowrap justify-content-between bg-light mb-4"
                 >
                {days.map((day, index) => (
                        <div key={`day-${index}`}>
                            {day}
                            {hours.map((hour, i) => (
                                <div key={`hour-${i}`}>
                                    {hour}
                                </div>
                            ))}
                        </div>
                       
                ))}
            </div>


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