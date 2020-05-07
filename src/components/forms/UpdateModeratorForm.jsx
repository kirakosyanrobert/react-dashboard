import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, ButtonVariants, ButtonActionTypes } from '../ui/Button';
import { useTranslation, useAlerts, useLoggedInAsSuper } from '../../hooks';
import { IconType } from '../../consts';
import {Colors} from "../../environment/theme";


function UpdateModeratorForm ({moderator, onUpdate, onClose, loading}) {
    const loggedInAsSuper = useLoggedInAsSuper();
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
            phone: formData.phone,
            role: formData.role,
            password: formData.password,
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
                      iconColor={Colors.green}
                      variant={ButtonVariants.Light}
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
                    <Form.Label>{translate(({inputs}) => inputs.password.title)}</Form.Label>
                    <Form.Control
                        type="text"
                        disabled={!allowEdit}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, 'password': e.target.value})}
                    />
                </Form.Group>

                {
                  loggedInAsSuper &&
                  <Form.Group>
                      <Form.Label>
                        {translate(({inputs}) => inputs.role.title)}
                      </Form.Label>
                      <Form.Control
                        as="select"
                        disabled={!allowEdit}
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, 'role': e.target.value})}
                      >
                        <option value={'1'}>Admin</option>
                        <option value={'2'}>Moderator</option>
                      </Form.Control>
                  </Form.Group>
                }

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
                  {
                    allowEdit &&
                      <Button
                        className="mr-2"
                        title={translate(({buttons}) => buttons.save)}
                        variant={ButtonVariants.Success}
                        type={ButtonActionTypes.Submit}
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={!allowEdit}
                      />

                  }
                  
                  <Button
                      title={translate(({buttons}) => buttons.close)}
                      onClick={onClose}
                  />
                </div>
            </Form>
    )
}
export default UpdateModeratorForm;