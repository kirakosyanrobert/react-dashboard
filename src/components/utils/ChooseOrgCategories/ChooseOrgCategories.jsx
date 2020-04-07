import React, { useState } from 'react'
import { ListGroup, Form } from 'react-bootstrap';

import { Button, ButtonSizes, ButtonVariants } from '../../ui/Button';


const categoriesList = [
    {
        category: {title: 'Medicine', value: 'medicine'},
        subCategories: [
            {title: 'Pharmacy', value: 'pharmacy'},
            {title: 'Hostpital', value: 'hostpital'},
            {title: 'Labaratory', value: 'labaratory'},
        ]
    },
    {
        category: {title: 'Tourism', value: 'tourism'},
        subCategories: [
            {title: 'Excourse', value: 'excourse'},
            {title: 'Car Rent', value: 'carRent'},
            {title: 'MotorSycle Rent', value: 'motoRent'},
        ]
    },
    {
        category: {title: 'Car', value: 'car'},
        subCategories: [
            {title: 'Car service', value: 'carservice'},
            {title: 'Car Parts', value: 'carParts'},
            {title: 'Car Wash', value: 'carWash'},
        ]
    }
]


function ChooseOrgCategories ({
    orgCategories,
    deleteCategory,
    addCategory
}) {
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


    return (
        <div>
            <ListGroup>
                {orgCategories.length > 0 &&
                    orgCategories.map((item, index) => (
                        <ListGroup.Item key={`categorie-edit-item-${index}`}>
                            {`${item.category} - ${item.subCategory}`}
                            <Button
                                className="float-right"
                                title="X"
                                size={ButtonSizes.Small}
                                variant={ButtonVariants.Danger}
                                onClick={() => deleteCategory(index)}
                            />
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <div className="d-flex my-4 justify-content-between">

                <Form.Group>
                    <Form.Label>Category</Form.Label>
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
                    <Form.Label>Sub Category</Form.Label>
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
                        title="Add"
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