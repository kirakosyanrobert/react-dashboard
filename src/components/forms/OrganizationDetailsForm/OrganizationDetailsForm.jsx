import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Badge, Col, ListGroup } from 'react-bootstrap';

import './OrganizationDetailsForm.scss';

import { Button, ButtonVariants, ButtonActionTypes } from '../../ui/Button';
import Modal from '../../ui/Modal/Modal';
import { useTranslation, useAlerts, useCategoriesList } from '../../../hooks';
import { MapView } from '../../maps/MapView/MapView';
import ChooseOrgCategories from '../../utils/ChooseOrgCategories/ChooseOrgCategories';
import { IconType } from '../../../consts';

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

function OrganizationDetailsForm ({organization, onUpdate}) {
    const translate = useTranslation();
    const { setError } = useAlerts();
    const categoriesList = useCategoriesList();
    
    const [title, setTitle] = useState(organization.properties.title.en);
    const [titleGr, setTitleGr] = useState(organization.properties.title.gr);
    const [titleRu, setTitleRu] = useState(organization.properties.title.ru);

    const [subTitle, setSubTitle] = useState(organization.properties.subTitle.en);
    const [subTitleGr, setSubTitleGr] = useState(organization.properties.subTitle.gr);
    const [subTitleRu, setSubTitleRu] = useState(organization.properties.subTitle.ru);

    const [description, setDescription] = useState(organization.properties.description.en);
    const [descriptionGr, setDescriptionGr] = useState(organization.properties.description.gr);
    const [descriptionRu, setDescriptionRu] = useState(organization.properties.description.ru);


     let categoriesWithTitle = [];
     categoriesList.forEach(listItem => {
         organization.properties.categories.forEach(orgCatItem => {
             let parts = orgCatItem.split('-');
             let category = parts[0];
             let subCategory = parts[1];

             if(listItem.category.value === category) {
                 let current = {
                     category: {
                         title: listItem.category.title,
                         value: category
                     },
                     subCategory: {
                         title: listItem.subCategories.find(subItem => subItem.value === subCategory).title,
                         value: subCategory
                     }
                 };

                 console.log(current);
                 categoriesWithTitle.push(current);
             }
         })
     });

     console.log(categoriesWithTitle)

    const [categories, setCategories] = useState(categoriesWithTitle);
    const [openCategoriesModal, setOpenCategoriesModal] = useState(false);

    const [street, setStreet] = useState(organization.properties.address.street.en);
    const [streetGr, setStreetGr] = useState(organization.properties.address.street.gr);
    const [streetRu, setStreetRu] = useState(organization.properties.address.street.ru);

    const [city, setCity] = useState(organization.properties.address.city.en);
    const [cityGr, setCityGr] = useState(organization.properties.address.city.gr);
    const [cityRu, setCityRu] = useState(organization.properties.address.city.ru);

    const [district, setDistrict] = useState(organization.properties.address.district.en);
    const [districtGr, setDistrictGr] = useState(organization.properties.address.district.gr);
    const [districtRu, setDistrictRu] = useState(organization.properties.address.district.ru);


    const [coordinates, setCoordinates] = useState(organization.geometry.coordinates);
    const [openMapView, setOpenMapView] = useState(false);
    const [floor, setFloor] = useState(organization.properties.address.floor);


    const [nearestStopTitle, setNearestStopTitle] = useState(organization.properties.nearestStop.title.en);
    const [nearestStopTitleGr, setNearestStopTitleGr] = useState(organization.properties.nearestStop.title.gr);
    const [nearestStopTitleRu, setNearestStopTitleRu] = useState(organization.properties.nearestStop.title.ru);

    const [nearestStopCoordinates, setNearestStopCoordinates] = useState(organization.properties.nearestStop.coordinates);
    const [openNearestStopMap, setOpenNearestStopMap] = useState(false);

    const [postCode, setPostCode] = useState(organization.properties.address.zipCode);
    const [numberOfFloors, setNumberOfFloors] = useState('');
    
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState(organization.properties.searchWords.en);

    const [newTagGr, setNewTagGr] = useState('');
    const [tagsGr, setTagsGr] = useState(organization.properties.searchWords.gr);

    const [newTagRu, setNewTagRu] = useState('');
    const [tagsRu, setTagsRu] = useState(organization.properties.searchWords.ru);


    const [workTimeType, setWorkTimeType] = useState(organization.properties.workTime.type);
    const [workingHours, setWorkingHours] = useState([
        ["00:00", "00:00", "00:00", "00:00"],
        ["00:00", "00:00", "00:00", "00:00"],
        ["00:00", "00:00", "00:00", "00:00"],
        ["00:00", "00:00", "00:00", "00:00"],
        ["00:00", "00:00", "00:00", "00:00"],
        ["00:00", "00:00", "00:00", "00:00"],
        ["00:00", "00:00", "00:00", "00:00"],
    ]);
    const [workingDays, setWorkingDays] = useState([true, true, true, true, true, true, true]);


    const [phoneNumbers, setPhoneNumbers] = useState(organization.properties.phoneNumbers);
    const [emails, setEmails] = useState(organization.properties.emails);
    const [websites, setWebsites] = useState(organization.properties.websites);

    const [note, setNote] = useState(organization.properties.note);


    function handleSubmit (e) {
        e.preventDefault();

        if(
            (title || titleGr || titleGr) &&
            categories.length > 0 && 

            coordinates[0] &&
            coordinates[1] &&
            (street || streetRu || streetGr) &&
            (city || cityRu || cityGr) && 
            (district || districtRu || districtGr)
        ) {
            const org = {

                type : "Feature",
                geometry : {
                    type : "Point",
                    coordinates : coordinates.map(item => parseFloat(item)),
                },
                properties : {
                    title: {
                        en: title,
                        ru: titleRu,
                        gr: titleGr
                    },
                    subTitle : {
                        en : subTitle,
                        ru : subTitleRu,
                        gr : subTitleGr
                    },
                    description: {
                        en : description,
                        ru : descriptionRu,
                        gr : descriptionGr
                    },

                    categories: categories.map(catItem => `${catItem.category.value}-${catItem.subCategory.value}`),
                    searchWords: {
                        en : tags,
                        ru : tagsRu,
                        gr : tagsGr
                    },
                    address: {
                        street: {
                            en : street,
                            ru : streetRu,
                            gr : streetGr
                        },
                        zipCode: postCode,
                        city: {
                            en : city,
                            ru : cityRu,
                            gr : cityGr
                        },
                        district: {
                            en : district,
                            ru : districtRu,
                            gr : districtGr
                        },
                        floor
                    },

                    nearestStop: {
                        coordinates: nearestStopCoordinates,
                        title: {
                            en : nearestStopTitle,
                            ru : nearestStopTitleRu,
                            gr : nearestStopTitleGr
                        }
                    },

                    workTime: {
                        type: workTimeType,
                        ...(workTimeType === 'SCHEDULE' && { schedule: workingHours })
                    },

                    phoneNumbers : phoneNumbers.filter(item => item !== ""),
                    websites : websites.filter(item => item !== ""),
                    emails : emails.filter(item => item !== ""),
                    note
                }
            };
            onUpdate(org);
        } else {
            setError({message: "Fill in Inputs"});
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

    //Emails Actions
    function handleGetEmails(index, value) {
        const tempEmails = [...emails];
        tempEmails[index] = value;
        setEmails(tempEmails);
    }
    function handleAddEmail () {
        if(emails[emails.length - 1] !== '') {
            setEmails([...emails, '']);
        }
    }
    function handleRemoveEmail (index) {
        const tempEmails = [...emails];
        tempEmails.splice(index, 1);
        setEmails(tempEmails);
    }

    //Websites Actions
    function handleGetWebsites(index, value) {
        const tempWebsites = [...websites];
        tempWebsites[index] = value;
        setWebsites(tempWebsites);
    }
    function handleAddWebsite () {
        if(websites[websites.length - 1] !== '') {
            setWebsites([...websites, '']);
        }
    }
    function handleRemoveWebsite (index) {
        const tempWebsites = [...websites];
        tempWebsites.splice(index, 1);
        setWebsites(tempWebsites);
    }

    //Tags Actions
    function handleAddTag() {
        if(newTag.length > 1) {
            setTags([newTag, ...tags])
            setNewTag('#');
        }
    }
    function handleRemoveTag(tagIndex) {
        setTags(tags.filter((t, index) => index !== tagIndex))
    }

    function handleAddTagGr() {
        if(newTagGr.length > 1) {
            setTagsGr([newTagGr, ...tagsGr])
            setNewTagGr('#');
        }
    }
    function handleRemoveTagGr(tagIndex) {
        setTagsGr(tagsGr.filter((t, index) => index !== tagIndex))
    }

    function handleAddTagRu() {
        if(newTagRu.length > 1) {
            setTagsRu([newTagRu, ...tagsRu])
            setNewTagRu('#');
        }
    }
    function handleRemoveTagRu(tagIndex) {
        setTagsRu(tagsRu.filter((t, index) => index !== tagIndex))
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

        const tempWorkingHours = [...workingHours];
            tempWorkingHours[index] = ["00:00", "00:00", "00:00", "00:00"];
            setWorkingHours(tempWorkingHours);

        if(!isWorking) {
            const tempWorkingHours = [...workingHours];
            tempWorkingHours[index] = [];
            setWorkingHours(tempWorkingHours);
        }
    } 



    function handleGetCoords (coords) {
        setCoordinates(coords);
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
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Row>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.title.title)}(en)
                            <Required />
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.title.title)}(gr)
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={titleGr}
                            onChange={(e) => setTitleGr(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.title.title)}(ru)
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={titleRu}
                            onChange={(e) => setTitleRu(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Form.Row>

            <Form.Row>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.subTitle.title)}(en)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.subTitle.title)}(gr)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={subTitleGr}
                            onChange={(e) => setSubTitleGr(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.subTitle.title)}(ru)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={subTitleRu}
                            onChange={(e) => setSubTitleRu(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Form.Row>

            <Form.Row>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.description.title)}(en)
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                         />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.description.title)}(gr)
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={descriptionGr}
                            onChange={(e) => setDescriptionGr(e.target.value)}
                         />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.description.title)}
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={descriptionRu}
                            onChange={(e) => setDescriptionRu(e.target.value)}
                         />
                    </Form.Group>
                </Col>
            </Form.Row>
         

            <Form.Group>
                <Form.Label>
                    {translate(({inputs}) => inputs.category.title)}
                </Form.Label>
                <ListGroup horizontal={'md'}>
                    {categories.length > 0 &&
                        categories.map((item, index) => (
                            <ListGroup.Item key={`categorie-item-${index}`}>
                                {`${item.category.title} - ${item.subCategory.title}`}
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
          

            <Form.Row>
                <Col lg={6}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.street.title)}(en)
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.street.title)}(gr)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={streetGr}
                            onChange={(e) => setStreetGr(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.street.title)}(ru)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={streetRu}
                            onChange={(e) => setStreetRu(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                  
                <Col lg={6}>
                    <Form.Row className="flex-column flex-sm-row">
                        <Form.Group as={Col}>
                            <Form.Label>
                                {translate(({inputs}) => inputs.longitude.title)}
                                <Required />
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={coordinates[0]}
                                onChange={(e) => setCoordinates([e.target.value, coordinates[1]])}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                {translate(({inputs}) => inputs.latitude.title)}
                                <Required />
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={coordinates[1]}
                                onChange={(e) => setCoordinates([coordinates[0], e.target.value])}
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
                            {translate(({inputs}) => inputs.city.title)}(en)
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.city.title)}(gr)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={cityGr}
                            onChange={(e) => setCityGr(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.city.title)}(ru)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={cityRu}
                            onChange={(e) => setCityRu(e.target.value)}
                        />
                    </Form.Group>
                </Col>

                <Col sm={6}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.district.title)}(en)
                            <Required />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.district.title)}(gr)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={districtGr}
                            onChange={(e) => setDistrictGr(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.district.title)}(ru)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={districtRu}
                            onChange={(e) => setDistrictRu(e.target.value)}
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
                            {translate(({inputs}) => inputs.nearestStop.title)}(en)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={nearestStopTitle}
                            onChange={(e) => setNearestStopTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.nearestStop.title)}(gr)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={nearestStopTitleGr}
                            onChange={(e) => setNearestStopTitleGr(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.nearestStop.title)}(ru)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={nearestStopTitleRu}
                            onChange={(e) => setNearestStopTitleRu(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                    
                <Col lg={6}>
                    <Form.Row className="flex-column flex-sm-row">
                        <Form.Group as={Col}>
                            <Form.Label>
                                {translate(({inputs}) => inputs.longitude.title)}
                                <Required />
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={nearestStopCoordinates[0]}
                                onChange={(e) => setNearestStopCoordinates([e.target.value, nearestStopCoordinates[1]])}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                {translate(({inputs}) => inputs.latitude.title)}
                                <Required />
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={nearestStopCoordinates[1]}
                                onChange={(e) => setNearestStopCoordinates([nearestStopCoordinates[0], e.target.value])}
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
                            icon={IconType.FaTimes}
                                disabled={index === 0}
                                onClick={() => handleRemovePhoneNumber(index)}
                            />
                            <Button
                                icon={IconType.FaPlus}
                                disabled={index !== (phoneNumbers.length - 1)}
                                onClick={handleAddPhoneNumber}
                            />
                           
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            ))}

            {emails.map((item, index) => (
                <Form.Group key={`email-input-${index}`}>
                    <Form.Label>
                        {`${translate(({inputs}) => inputs.email.title)} ${index + 1}`}
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            value={emails[index]}
                            onChange={(e) => handleGetEmails(index, e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                icon={IconType.FaTimes}
                                disabled={index === 0}
                                onClick={() => handleRemoveEmail(index)}
                            />
                            <Button
                                icon={IconType.FaPlus}
                                disabled={index !== (emails.length - 1)}
                                onClick={handleAddEmail}
                            />
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            ))} 

            {websites.map((item, index) => (
                <Form.Group key={`website-input-${index}`}>
                    <Form.Label>
                        {`${translate(({inputs}) => inputs.website.title)} ${index + 1}`}
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            value={websites[index]}
                            onChange={(e) => handleGetWebsites(index, e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                icon={IconType.FaTimes}
                                disabled={index === 0}
                                onClick={() => handleRemoveWebsite(index)}
                            />
                            <Button
                                icon={IconType.FaPlus}
                                disabled={index !== (websites.length - 1)}
                                onClick={handleAddWebsite}
                            />
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            ))} 

            <Form.Row>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.tags.title)}(en)
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
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.tags.title)}(gr)
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                type="text"
                                value={newTagGr}
                                onChange={(e) => setNewTagGr(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button
                                    title={translate(({buttons}) => buttons.add)}
                                    outlined
                                    onClick={handleAddTagGr}
                                />
                            </InputGroup.Append>
                        </InputGroup>
                        <div className="w-100 d-flex flex-wrap">
                            {tagsGr.map((tag, index) => (
                                <div
                                    key={`tag-item-gr-${index}`}
                                    className="mr-3 bg-light d-flex align-items-center"
                                >
                                    <h4>
                                        <Badge variant="secondary">{tag}</Badge>
                                    </h4>
                                    <h5
                                        className="px-2 cursor-pointer"
                                        onClick={() => handleRemoveTagGr(index)}
                                    >
                                        X
                                    </h5>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>
                            {translate(({inputs}) => inputs.tags.title)}(ru)
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                type="text"
                                value={newTagRu}
                                onChange={(e) => setNewTagRu(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button
                                    title={translate(({buttons}) => buttons.add)}
                                    outlined
                                    onClick={handleAddTagRu}
                                />
                            </InputGroup.Append>
                        </InputGroup>
                        <div className="w-100 d-flex flex-wrap">
                            {tagsRu.map((tag, index) => (
                                <div
                                    key={`tag-item-ru-${index}`}
                                    className="mr-3 bg-light d-flex align-items-center"
                                >
                                    <h4>
                                        <Badge variant="secondary">{tag}</Badge>
                                    </h4>
                                    <h5
                                        className="px-2 cursor-pointer"
                                        onClick={() => handleRemoveTagRu(index)}
                                    >
                                        X
                                    </h5>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                </Col>
            </Form.Row>


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

                                <Form.Group className="mb-3">
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

                                <Form.Group > 
                                    <Form.Label>
                                        {translate(({inputs}) => inputs.start.title)}
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        disabled={!workingDays[index]}
                                        value={workingHours[index][2] || '00:00'}
                                        onChange={(e) => handleGetWorkingHours(index, 2, e.target.value)}
                                    >
                                        {hours.map((hour, i) => (
                                            <option key={`second-start-hour-${i}`} value={hour}>
                                                {hour}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group > 
                                    <Form.Label>
                                        {translate(({inputs}) => inputs.start.title)}
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        disabled={!workingDays[index]}
                                        value={workingHours[index][3] || '00:00'}
                                        onChange={(e) => handleGetWorkingHours(index, 3, e.target.value)}
                                    >
                                        {hours.map((hour, i) => (
                                            <option key={`second-end-hour-${i}`} value={hour}>
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
                title={translate(({buttons}) => buttons.save)}
                variant={ButtonVariants.Primary}
                type={ButtonActionTypes.Submit}
                onClick={handleSubmit}
            />
        </Form>
    </>
    )
}
export default OrganizationDetailsForm;