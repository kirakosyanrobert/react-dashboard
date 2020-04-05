import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Badge, Col, ListGroup } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import './CreateOrganizationForm.scss';
import { Button, ButtonVariants, ButtonActionTypes, ButtonSizes } from '../../ui/Button';
import Modal from '../../ui/Modal/Modal';
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
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState([{
        category: 'Medicine',
        subCategory: 'Hospital'
    }]);
    const [openCategoriesModal, setOpenCategoriesModal] = useState(false);

   
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({lat: '', lon: ''});
    const [openMapView, setOpenMapView] = useState(false);


    const [nearestStopTitle, setNearestStopTitle] = useState('');
    const [nearestStopCoordinates, setNearestStopCoordinates] = useState({lat: '', lon: ''});
    const [openNearestStopMap, setOpenNearestStopMap] = useState(false);


    const [postCode, setPostCode] = useState('');
    const [numberOfFloors, setNumberOfFloors] = useState('');
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [newTag, setNewTag] = useState('#');
    const [tags, setTags] = useState([]);
    const [workingHours, setWorkingHours] = useState([[], [], [], [], [], [], []]);

    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [note, setNote] = useState('');





    function handleSubmit (e) {
        e.preventDefault();

        if(
            title &&
            tags.length > 0 &&
            address && 
            coordinates.lat && 
            coordinates.lon &&
            nearestStopCoordinates.lat &&
            nearestStopCoordinates.lon &&
            postCode && 
            numberOfFloors
        ) {
            const org = {
                id: uuid(),
                title,
                searchWords: tags,
                address,
                postCode: +postCode,
                numberOfFloors: +numberOfFloors,
                coordinates,
                phoneNumbers,
                tags,
                workingHours,
                website,
                email,
            };
            // onCreate(org);
        } else {
            alert("Fill in Inputs");
        }
    }

    function handleRemoveCategory (categoryIndex) {
        setCategories(categories.filter((cat, i) => i !== categoryIndex));
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
            if(newTag[0] !== '#') {
                const modifiedNewTag = '#' + newTag;
                setTags([modifiedNewTag, ...tags])
                setNewTag('#');
                return;
            }
            setTags([newTag, ...tags])
            setNewTag('#');
        }
    }

    function handleRemoveTag(tagIndex) {
        setTags(tags.filter((t, index) => index !== tagIndex))
    }


    function handleGetWorkingHours (index, place, value) {
        const tempWorkingHours = [...workingHours];
        tempWorkingHours[index][place] = value;
        setWorkingHours(tempWorkingHours);
    }

    function handleGetCoords (coords) {
        setCoordinates({
            lon: coords[0],
            lat: coords[1]
        });
        setTimeout(() => setOpenMapView(false), 0);
    }

    function handleGetNearestStopCoords (coords) {
        setNearestStopCoordinates({
            lon: coords[0],
            lat: coords[1]
        });
        setTimeout(() => setOpenNearestStopMap(false), 0);
    }

    const Required = () =>  (
        <span className="text-danger">*</span>
    );

    return (
        <>
        <Modal
            title="Categories"
            open={openCategoriesModal}
            onClose={() => setOpenCategoriesModal(false)}
        >
            <div>
                <ListGroup>
                    {categories.length > 0 &&
                        categories.map((item, index) => (
                            <ListGroup.Item key={`categorie-edit-item-${index}`}>
                                {`${item.category} - ${item.subCategory}`}
                                <Button
                                    className="float-right"
                                    title="X"
                                    size={ButtonSizes.Small}
                                    variant={ButtonVariants.Danger}
                                    onClick={() => handleRemoveCategory(index)}
                                />
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
        </Modal>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    {translate(({inputs}) => inputs.title.title)}
                    <Required />
                </Form.Label>
                <Form.Control
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    {translate(({inputs}) => inputs.description.title)}
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    {/* {translate(({inputs}) => inputs.description.title)} */}
                    Categories
                </Form.Label>
                <ListGroup horizontal>
                    {categories.length > 0 &&
                        categories.map((item, index) => (
                            <ListGroup.Item key={`categorie-item-${index}`}>
                                {`${item.category} - ${item.subCategory}`}
                            </ListGroup.Item>
                        ))
                    }
                    <ListGroup.Item>
                       <Button
                            title={translate(({buttons}) => buttons.edit)}
                            onClick={() => setOpenCategoriesModal(true)}
                       />
                    </ListGroup.Item>
                </ListGroup>
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
          

            <Form.Row>
                <Col lg={6}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.address.title)}
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                  
                <Col lg={6}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>
                                {translate(({inputs}) => inputs.latitude.title)}
                                <Required />
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={coordinates.lat}
                                onChange={(e) => setCoordinates({...coordinates, lat: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                {translate(({inputs}) => inputs.longitude.title)}
                                <Required />
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={coordinates.lon}
                                onChange={(e) => setCoordinates({...coordinates, lon: e.target.value})}
                            />
                        </Form.Group>
                        {/* <MapCard lon={coordinates.lon} lat={coordinates.lat} /> */}
                        <div className="d-flex align-items-end mb-3">
                            <Button
                                variant={ButtonVariants.Primary}
                                title={'Show on map'}
                                disabled={openMapView}
                                onClick={() => setOpenMapView(true)}
                            />
                        </div>
                    </Form.Row>
                </Col>
            </Form.Row>
            {openMapView &&
                <div
                    className="mb-4">
                    <MapView getCoords={handleGetCoords} />
                </div>
            }




        <Form.Row>
            <Col lg={6}>
                <Form.Group>
                    <Form.Label>
                        {translate(({inputs}) => inputs.nearestStop.title)}
                        <Required />
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={nearestStopTitle}
                        onChange={(e) => setNearestStopTitle(e.target.value)}
                    />
                </Form.Group>
            </Col>
                
            <Col lg={6}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>
                            {translate(({inputs}) => inputs.latitude.title)}
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={nearestStopCoordinates.lat}
                            onChange={(e) => setNearestStopCoordinates({...nearestStopCoordinates, lat: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>
                            {translate(({inputs}) => inputs.longitude.title)}
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={nearestStopCoordinates.lon}
                            onChange={(e) => setNearestStopCoordinates({...nearestStopCoordinates, lon: e.target.value})}
                        />
                    </Form.Group>
                    <div className="d-flex align-items-end mb-3">
                        <Button
                            variant={ButtonVariants.Primary}
                            title={'Show on map'}
                            disabled={openNearestStopMap}
                            onClick={() => setOpenNearestStopMap(true)}
                        />
                    </div>
                </Form.Row>
            </Col>
        </Form.Row>
        {openNearestStopMap &&
            <div
                className="mb-4">
                <MapView getCoords={handleGetNearestStopCoords} />
            </div>
        }


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





            {phoneNumbers.map((item, index) => (
                <Form.Group key={`phone-number-input-${index}`}>
                    <Form.Label>
                        {`${translate(({inputs}) => inputs.phoneNumber.title)} ${index + 1}`}
                    </Form.Label>
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
                <Form.Label>
                    {translate(({inputs}) => inputs.tags.title)}
                    <Required />
                </Form.Label>
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
                        <div
                            key={`tag-item-${index}`}
                            className="mr-3 bg-light d-flex align-items-center"
                        >
                            <h4>
                                <Badge variant="secondary">{tag}</Badge>
                            </h4>
                            <h5
                                className="px-2 cursor-pointer"
                                onClick={() => handleRemoveTag(index)}
                            >
                                X
                            </h5>
                        </div>
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

            <Form.Group>
                <Form.Label>
                    {translate(({inputs}) => inputs.note.title)}
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </Form.Group>


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