import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation, useAlerts } from '../../hooks';
import { IconType } from '../../consts';


function UpdateModeratorForm ({moderator, onUpdate, onClose, loading}) {
    const [formData, setFormData] = useState({...moderator});
    const [allowEdit, setAllowEdit] = useState(false);
    const translate = useTranslation();
    const { setError } = useAlerts();
   
    function handleSubmit (e) {
        e.preventDefault();
        if(
            !!formData.username &&
            !!formData.name &&
            !!formData.phone
           ) {
          onUpdate({
            ...moderator,
            username: formData.username,
            name: formData.name,
            phone: formData.phone
          });
          setAllowEdit(false)
        } else {
          setError({message: 'Inputs can`t be empty!'});
        }
    }

    return (
            <Form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-end">
                 <Button
                      icon={IconType.FaRegEdit}
                      variant={ButtonVariants.Primary}
                      type={ButtonActionTypes.Button}
                      onClick={() => setAllowEdit(true)}
                      disabled={allowEdit}
                  />
              </div>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.username.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={!allowEdit}
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, 'username': e.target.value})}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{translate(({inputs}) => inputs.name.title)}</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={!allowEdit}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, 'name': e.target.value})}
                  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>{translate(({inputs}) => inputs.phoneNumber.title)}</Form.Label>
                    <Form.Control
                        type="text"
                        disabled={!allowEdit}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, 'phone': e.target.value})}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                      className="mr-2"
                      title={translate(({buttons}) => buttons.save)}
                      variant={ButtonVariants.Primary}
                      type={ButtonActionTypes.Submit}
                      onClick={handleSubmit}
                      loading={loading}
                      disabled={!allowEdit}
                  />
                  <Button
                      title={translate(({buttons}) => buttons.close)}
                      onClick={onClose}
                  />
                </div>
            </Form>
    )
}
export default UpdateModeratorForm;