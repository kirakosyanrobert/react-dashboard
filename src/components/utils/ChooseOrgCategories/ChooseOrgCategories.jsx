import React, { useState } from 'react'
import { ListGroup, Form } from 'react-bootstrap';

import { Button, ButtonSizes, ButtonVariants } from '../../ui/Button';
import { useTranslation, useCategoriesList } from '../../../hooks';
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
    const categoriesList = useCategoriesList();

    function handleGetCategoryItem (value) {
        const temp = categoriesList.filter(item => item.category.value === value);
        setSelectedItem(temp[0]);
        setSelectedCategory(value);
    }

    function handleAddCategory() {
        const newCategory = {
            category: {
                title: selectedItem.category.title,
                value: selectedCategory
            },
            subCategory: {
                title: selectedItem.subCategories.find(subItem => subItem.value === selectedSubCategory).title,
                value: selectedSubCategory
            }
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
                            {`${item.category.title} - ${item.subCategory.title}`}
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