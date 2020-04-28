import React, { useState } from 'react'
import { ListGroup, Form } from 'react-bootstrap';

import { Button, ButtonSizes, ButtonVariants } from '../../ui/Button';
import { useTranslation } from '../../../hooks';
import { IconType } from '../../../consts';





function ChooseOrgCategories ({
    orgCategories,
    deleteCategory,
    addCategory
}) {
    const translate = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedItem, setSelectedItem] = useState(undefined);

    function handleGetCategoryItem (value) {
        const temp = categoriesList.filter(item => item.category.value === value);
        setSelectedItem(temp[0]);
        setSelectedCategory(value);
    }

    function handleAddCategory() {
        const newCategory = {
            category: selectedCategory,
            subCategory: selectedSubCategory
        }
        addCategory(newCategory);

        setSelectedCategory('');
        setSelectedSubCategory('');
        setSelectedItem(undefined);
    }

    const categoriesList = [
        {
            category: {
                title: translate(({category}) => category.eat),
                value: 'eat'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.cafe), value: 'cafe'},
                {title: translate(({subCategory}) => subCategory.taverna), value: 'taverna'},
                {title: translate(({subCategory}) => subCategory.restaurant), value: 'restaurant'},
                {title: translate(({subCategory}) => subCategory.pub), value: 'pub'},
                {title: translate(({subCategory}) => subCategory.bar), value: 'bar'},
                {title: translate(({subCategory}) => subCategory.delivery), value: 'delivery'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.food),
                value: 'food'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.kiosk), value: 'kiosk'},
                {title: translate(({subCategory}) => subCategory.minimarket), value: 'minimarket'},
                {title: translate(({subCategory}) => subCategory.supermarket), value: 'supermarket'},
                {title: translate(({subCategory}) => subCategory.hypermarket), value: 'hypermarket'},
                {title: translate(({subCategory}) => subCategory.wholesale), value: 'wholesale'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.medicine),
                value: 'medicine'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.hospital), value: 'hospital'},
                {title: translate(({subCategory}) => subCategory.pharmacy), value: 'pharmacy'},
                {title: translate(({subCategory}) => subCategory.privateDoctor), value: 'private_doctor'},
                {title: translate(({subCategory}) => subCategory.privateHospital), value: 'private_hospital'},
                {title: translate(({subCategory}) => subCategory.laboratory), value: 'Laboratory'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.municipal),
                value: 'municipal'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.fireDepartment), value: 'fire_department'},
                {title: translate(({subCategory}) => subCategory.police), value: 'police'},
                {title: translate(({subCategory}) => subCategory.law), value: 'law'},
                {title: translate(({subCategory}) => subCategory.postOffice), value: 'post_office'},
                {title: translate(({subCategory}) => subCategory.other), value: 'other'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.sleep),
                value: 'sleep'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.villa), value: 'villa'},
                {title: translate(({subCategory}) => subCategory.hotel), value: 'hotel'},
                {title: translate(({subCategory}) => subCategory.apartments), value: 'apartments'},
                {title: translate(({subCategory}) => subCategory.hostel), value: 'hostel'},
                {title: translate(({subCategory}) => subCategory.camping), value: 'camping'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.farm),
                value: 'farm'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.animal), value: 'animal'},
                {title: translate(({subCategory}) => subCategory.plant), value: 'plant'},
                {title: translate(({subCategory}) => subCategory.equipment), value: 'equipment'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.tourism),
                value: 'tourism'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.excursion), value: 'excursion'},
                {title: translate(({subCategory}) => subCategory.rentACar), value: 'rent_a_car'},
                {title: translate(({subCategory}) => subCategory.rentAMoto), value: 'rent_a_moto'},
                {title: translate(({subCategory}) => subCategory.beachEquipped), value: 'beach_equipped'},
                {title: translate(({subCategory}) => subCategory.sights), value: 'sights'},
                {title: translate(({subCategory}) => subCategory.viewpoint), value: 'viewpoint'},
                {title: translate(({subCategory}) => subCategory.religion), value: 'religion'},
                {title: translate(({subCategory}) => subCategory.museum), value: 'museum'},
                {title: translate(({subCategory}) => subCategory.monument), value: 'monument'},
                {title: translate(({subCategory}) => subCategory.wc), value: 'wc'},
                {title: translate(({subCategory}) => subCategory.beach), value: 'beach'},
                {title: translate(({subCategory}) => subCategory.nature), value: 'nature'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.construction),
                value: 'construction'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.decorationMaterials), value: 'decoration_materials'},
                {title: translate(({subCategory}) => subCategory.constructionMaterials), value: 'construction_materials'},
                {title: translate(({subCategory}) => subCategory.tools), value: 'tools'},
                {title: translate(({subCategory}) => subCategory.equipment), value: 'equipment'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.stores),
                value: 'stores'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.shoppingCenter), value: 'shopping_center'},
                {title: translate(({subCategory}) => subCategory.kids), value: 'kids'},
                {title: translate(({subCategory}) => subCategory.clothes), value: 'clothes'},
                {title: translate(({subCategory}) => subCategory.appliances), value: 'appliances'},
                {title: translate(({subCategory}) => subCategory.stationery), value: 'stationery'},
                {title: translate(({subCategory}) => subCategory.houseware), value: 'houseware'},
                {title: translate(({subCategory}) => subCategory.zoo), value: 'zoo'},
                {title: translate(({subCategory}) => subCategory.forBusiness), value: 'for_business'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.auto),
                value: 'auto'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.forCar), value: 'for_car'},
                {title: translate(({subCategory}) => subCategory.carService), value: 'car_service'},
                {title: translate(({subCategory}) => subCategory.carWash), value: 'car_wash'},
                {title: translate(({subCategory}) => subCategory.carInspection), value: 'car_inspection'},
                {title: translate(({subCategory}) => subCategory.parkingEuro), value: 'parking_euro'},
                {title: translate(({subCategory}) => subCategory.gas), value: 'gas'},
                {title: translate(({subCategory}) => subCategory.parking), value: 'parking'},
                {title: translate(({subCategory}) => subCategory.parkingMoto), value: 'parking_moto'},
                {title: translate(({subCategory}) => subCategory.parkingBike), value: 'parking_bike'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.fun),
                value: 'fun'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.aquapark), value: 'aquapark'},
                {title: translate(({subCategory}) => subCategory.oceanarium), value: 'oceanarium'},
                {title: translate(({subCategory}) => subCategory.nightClub), value: 'night_club'},
                {title: translate(({subCategory}) => subCategory.computerClub), value: 'computer_club'},
                {title: translate(({subCategory}) => subCategory.other), value: 'other'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.sport),
                value: 'sport'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.gym), value: 'gym'},
                {title: translate(({subCategory}) => subCategory.playground), value: 'playground'},
                {title: translate(({subCategory}) => subCategory.stadium), value: 'stadium'},
                {title: translate(({subCategory}) => subCategory.stadiumEuro), value: 'stadium_euro'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.education),
                value: 'education'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.preschool), value: 'preschool'},
                {title: translate(({subCategory}) => subCategory.scholl), value: 'scholl'},
                {title: translate(({subCategory}) => subCategory.college), value: 'college'},
                {title: translate(({subCategory}) => subCategory.university), value: 'university'},
                {title: translate(({subCategory}) => subCategory.courses), value: 'courses'},
                {title: translate(({subCategory}) => subCategory.municipalCourses), value: 'municipal_courses'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.gas),
                value: 'gas'
            }, 
            subCategories: []
        }, 
        {
            category: {
                title: translate(({category}) => category.realty),
                value: 'realty'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.sale), value: 'sale'},
                {title: translate(({subCategory}) => subCategory.rent), value: 'rent'},
            ]
        }, 
        {
            category: {
                title: translate(({category}) => category.publicTransport),
                value: 'public_transport'
            }, 
            subCategories: [
                {title: translate(({subCategory}) => subCategory.busStop), value: 'bus_stop'},
                {title: translate(({subCategory}) => subCategory.busStation), value: 'bus_station'},
                {title: translate(({subCategory}) => subCategory.port), value: 'port'},
                {title: translate(({subCategory}) => subCategory.airport), value: 'airport'},
                {title: translate(({subCategory}) => subCategory.railway), value: 'railway'},
            ]
        }, 
    ];


    return (
        <div>
            <ListGroup>
                {orgCategories.length > 0 &&
                    orgCategories.map((item, index) => (
                        <ListGroup.Item key={`categorie-edit-item-${index}`}>
                            {`${item.category} - ${item.subCategory}`}
                            <Button
                                className="float-right"
                                icon={IconType.FaRegTrashAlt}
                                size={ButtonSizes.Small}
                                variant={ButtonVariants.Danger}
                                onClick={() => deleteCategory(index)}
                            />
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <div className="d-flex my-4 justify-content-between flex-column flex-sm-row">

                <Form.Group>
                    <Form.Label>
                        {translate(({inputs}) => inputs.category.title)}
                    </Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCategory}
                        onChange={(e) => handleGetCategoryItem(e.target.value)}
                    >
                        <option value='' disabled>-</option>
                        {categoriesList.map((catItem, index) => (
                            <option
                                key={`category-item-${index}`}
                                value={catItem.category.value}
                            >
                                {catItem.category.title}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        {translate(({inputs}) => inputs.subCategory.title)}
                    </Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        disabled={!selectedItem}
                    >
                        <option value='' disabled>-</option>
                        {
                        selectedItem && 
                        selectedItem.subCategories.map((subCatItem, index) => (
                            <option
                                key={`sub-cat-item${index}`}
                                value={subCatItem.value}
                            >
                                    {subCatItem.title}
                            </option>
                        ))
                        }
                    </Form.Control>
                </Form.Group>

                <div className="d-flex align-items-end mb-3">
                    <Button
                        title={translate(({buttons}) => buttons.add)}
                        size={ButtonSizes.Medium}
                        variant={ButtonVariants.Primary}
                        onClick={handleAddCategory}
                        disabled={!selectedCategory || !selectedSubCategory}
                    />
                </div>
               
            </div>
        </div>
    )
}

export default ChooseOrgCategories;