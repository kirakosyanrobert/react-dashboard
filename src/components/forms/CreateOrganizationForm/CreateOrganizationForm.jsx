import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import './CreateOrganizationForm.scss';
import { Button, ButtonVariants, ButtonActionTypes } from '../../ui/Button';
import { useTranslation } from '../../../hooks';
import { MapView } from '../../maps/MapView/MapView';
import { MapCard } from '../../maps/MapCard/MapCard';

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
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
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
    const [workingHours, setWorkingHours] = useState([[], [], [], [], [], [], []]);

    const [openMapView, setOpenMapView] = useState(false);



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
                coordinates,
                phoneNumbers,
                tags,
                workingHours
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

    function handleGetWorkingHours (index, place, value) {
        const tempWorkingHours = [...workingHours];
        tempWorkingHours[index][place] = value;
        setWorkingHours(tempWorkingHours);
    }

    function handleGetCoords (coords) {
        setCoordinates({
            lon: coords[0],
            lat: coords[1]
        })
    }

    return (
        <>
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
                <Form.Label>{translate(({inputs}) => inputs.latitude.title)}</Form.Label>
                <Form.Control
                    type="number"
                    value={coordinates.lat}
                    onChange={(e) => setCoordinates({...coordinates, lat: e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{translate(({inputs}) => inputs.longitude.title)}</Form.Label>
                <Form.Control
                    type="number"
                    value={coordinates.lon}
                    onChange={(e) => setCoordinates({...coordinates, lon: e.target.value})}
                />
            </Form.Group>

            <MapCard lon={coordinates.lon} lat={coordinates.lat} />
            <Button
                className="mb-4"
                variant={ButtonVariants.Primary}
                title={openMapView ? 'Hide map' : 'Show on map'}
                onClick={() => setOpenMapView(!openMapView)}
            />
            {openMapView &&
                <div
                    className="mb-4">
                    <MapView getCoords={handleGetCoords} />
                </div>
            }


            {phoneNumbers.map((item, index) => (
                <Form.Group key={`phone-number-input-${index}`}>
                    <Form.Label>{`${translate(({inputs}) => inputs.phoneNumber.title)} ${index + 1}`}</Form.Label>
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
                <Form.Label>{translate(({inputs}) => inputs.tags.title)}</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control 
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button
                            title={translate(({buttons}) => buttons.add)}
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

            <div className="timepicker-container">
                {days.map((day, index) => (
                        <div key={`day-${index}`} className="timepicker-element">
                            <h5>{translate(({days}) => days[day])}</h5>
                            <Form.Group > 
                                <Form.Label>{translate(({inputs}) => inputs.start.title)}</Form.Label>
                                <Form.Control
                                    as="select"
                                    size="5"
                                    onChange={(e) => handleGetWorkingHours(index, 0, e.target.value)}
                                >
                                    {hours.map((hour, i) => (
                                        <option key={`start-hour-${i}`} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>{translate(({inputs}) => inputs.end.title)}</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => handleGetWorkingHours(index, 1, e.target.value)}
                                >
                                    {hours.map((hour, i) => (
                                        <option key={`end-hour-${i}`} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
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
        </>
    )
}
export default CreateOrganizationForm;