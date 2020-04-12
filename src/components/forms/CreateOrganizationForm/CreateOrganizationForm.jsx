import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Badge, Col, ListGroup } from 'react-bootstrap';

import './CreateOrganizationForm.scss';
import { Button, ButtonVariants, ButtonActionTypes } from '../../ui/Button';
import Modal from '../../ui/Modal/Modal';
import { useTranslation } from '../../../hooks';
import { MapView } from '../../maps/MapView/MapView';
import { MapCard } from '../../maps/MapCard/MapCard';
import ChooseOrgCategories from '../../utils/ChooseOrgCategories/ChooseOrgCategories';

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

    const [categories, setCategories] = useState([]);
    const [openCategoriesModal, setOpenCategoriesModal] = useState(false);

    const [street, setStreet] = useState('');
    const [coordinates, setCoordinates] = useState({lat: '', lon: ''});
    const [openMapView, setOpenMapView] = useState(false);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [floor, setFloor] = useState('');

    const [nearestStopTitle, setNearestStopTitle] = useState('');
    const [nearestStopCoordinates, setNearestStopCoordinates] = useState({lat: '', lon: ''});
    const [openNearestStopMap, setOpenNearestStopMap] = useState(false);

    const [postCode, setPostCode] = useState('');
    const [numberOfFloors, setNumberOfFloors] = useState('');
    
    const [newTag, setNewTag] = useState('#');
    const [tags, setTags] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState(['']);

    const [workTimeType, setWorkTimeType] = useState('NONE');
    const [workingHours, setWorkingHours] = useState([[], [], [], [], [], [], []]);
    const [workingDays, setWorkingDays] = useState([true, true, true, true, true, true, true])

    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [note, setNote] = useState('');


    function handleSubmit (e) {
        e.preventDefault();

        if(
            title &&
            categories.length > 0 && 
            tags.length > 0 &&

            coordinates.lat && 
            coordinates.lon &&
            street &&
            city && 
            district &&

            nearestStopCoordinates.lat &&
            nearestStopCoordinates.lon &&
            numberOfFloors
        ) {
            const org = {
                title,
                description,
                categories,
                search_words: tags,


                address: {
                    coordinates: coordinates,
                    street: street,
                    zip_code: postCode,
                    city: city,
                    district: district,
                    floor: floor
                },
                nearest_stop: {
                    coordinates: nearestStopCoordinates,
                    title: nearestStopTitle
                },

                work_time: {
                    type: workTimeType,
                    ...(workTimeType === 'SCHEDULE' && { schedule: workingHours })
                },

                phone_numbers: phoneNumbers,
                website,
                email,
                note,
            };
            onCreate(org);
        } else {
            alert("Fill in Inputs");
        }
    }


    function handleAddCategory (newCategory) {
        setCategories([newCategory, ...categories]);
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

    function handleGetWorkingDays (index, isWorking) {
        const tempWorkingDays = [...workingDays];
        tempWorkingDays[index] = isWorking;
        setWorkingDays(tempWorkingDays);
        if(!isWorking) {
            const tempWorkingHours = [...workingHours];
            tempWorkingHours[index] = [];
            setWorkingHours(tempWorkingHours);
        }
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
            title={translate(({inputs}) => inputs.category.title)}
            open={openCategoriesModal}
            onClose={() => setOpenCategoriesModal(false)}
        >
            <ChooseOrgCategories
                orgCategories={categories}
                deleteCategory={handleRemoveCategory}
                addCategory={handleAddCategory}
            />
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
                    {translate(({inputs}) => inputs.category.title)}
                </Form.Label>
                <ListGroup horizontal={'md'}>
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
                            {translate(({inputs}) => inputs.street.title)}
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                  
                <Col lg={6}>
                    <Form.Row className="flex-column flex-sm-row">
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
                                title={translate(({buttons}) => buttons.showOnMap)}
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
                    <MapView 
                        center={coordinates}
                        getCoords={handleGetCoords}
                    />
                </div>
            }

            <Form.Row>
                <Col sm={6}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.city.title)}
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.district.title)}
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="district"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Form.Row>

            <Form.Group>
                <Form.Label>
                    {translate(({inputs}) => inputs.floor.title)}
                </Form.Label>
                <Form.Control
                    type="text"
                    name="floor"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                />
            </Form.Group>

            
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
                    <Form.Row className="flex-column flex-sm-row">
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
                                title={translate(({buttons}) => buttons.showOnMap)}
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
                    <MapView 
                        center={nearestStopCoordinates}
                        getCoords={handleGetNearestStopCoords}
                    />
                </div>
            }

            <Form.Row>
                <Col sm={6}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.postCode.title)}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="postCode"
                            value={postCode}
                            onChange={(e) => setPostCode(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.numberOfFloors.title)}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={numberOfFloors}
                            onChange={(e) => setNumberOfFloors(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Form.Row>
           
         



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



            <Form.Group>
                <Form.Label>
                    {translate(({inputs}) => inputs.workTime.title)}
                </Form.Label>
                <Form.Control
                    as="select"
                    value={workTimeType}
                    onChange={(e) => setWorkTimeType(e.target.value)}
                >
                    <option calue="NONE">None</option>
                    <option value="ALL_TIME">All time</option>
                    <option value="SCHEDULE">Schedule</option>
                </Form.Control>
            </Form.Group>
            {workTimeType === 'SCHEDULE' && 
                <div className="timepicker-container">
                    {days.map((day, index) => (
                            <div key={`day-${index}`} className="timepicker-element">
                                <h5>{translate(({days}) => days[day])}</h5>
                                <Form.Group > 
                                    <Form.Label>
                                        {translate(({inputs}) => inputs.start.title)}
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        disabled={!workingDays[index]}
                                        value={workingHours[index][0] || '00:00'}
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
                                    <Form.Label>
                                        {translate(({inputs}) => inputs.end.title)}
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        disabled={!workingDays[index]}
                                        value={workingHours[index][1] || '00:00'}
                                        onChange={(e) => handleGetWorkingHours(index, 1, e.target.value)}
                                    >
                                        {hours.map((hour, i) => (
                                            <option key={`end-hour-${i}`} value={hour}>
                                                {hour}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Form.Check
                                        checked={workingDays[index]}
                                        onChange={(e) => handleGetWorkingDays(index, e.target.checked)}
                                    />
                                </div>
                            </div>
                    ))}
                </div>
            }


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