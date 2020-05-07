import React, { useState } from 'react';

import { useEffectOnce, useTranslation, useAlerts, useRequest } from '../../hooks'
import ModeratorsTable from '../../components/table/ModeratorsTable/ModeratorsTable';
import Modal from '../../components/ui/Modal/Modal';
import { Loader } from '../../components/ui/Loader';
import { Button, ButtonVariants } from '../../components/ui/Button';
import CreateModeratorForm from '../../components/forms/CreateModeratorForm';
import UpdateModeratorForm from '../../components/forms/UpdateModeratorForm';
import { IconType } from '../../consts';
import { Form } from 'react-bootstrap';



function ModeratorsPage() {
    const [allModerators, setAllModerators] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatingModerator, setUpdatingModerator] = useState({});
    const [textSearch, setTextSearch] = useState('');
    const translate = useTranslation();
    const { setError, setNotification } = useAlerts();

    const { loading: getUsersLoading, request: getUsers } = useRequest();
    const { loading: createUserLoading, request: createUser } = useRequest();
    const { loading: updateUserLoading, request: updateUser } = useRequest();
    const { request: deleteUser } = useRequest();

    function handleGetSearchValue(e) {
        const value = e.target.value;
        setTextSearch(value);

        const filteredModeratros = allModerators.filter(moderator => (
            moderator.username.includes(value) ||
            moderator.name.includes(value) ||
            moderator.phone.includes(value)
        ));

        setModerators(filteredModeratros);
    };


    useEffectOnce(() => {
        handleGetModerators();
    });

   async function handleGetModerators() {
        try {
            const data = await getUsers('/users');
            setModerators(data);
            setAllModerators(data);
        } catch (err) {
            setError({message: err.message});
        }
    }


    async function handleCreateModerator(newModerator) {
       try {
            const data = await createUser('/users', 'POST',  JSON.stringify(newModerator));
            setNotification({message: 'User Created successfully!'});
            console.log('data', data)
            console.log('newModerator', newModerator)
            setModerators([data, ...moderators]);
            setShowCreateModal(false);
       } catch (err) {
            setError({message: err.message});
       }
    }


    function handleToggleUpdateModal(moderator) {
        setUpdatingModerator(moderator);
        setShowEditModal(true);
    }

    async function handleUpdateModerator(updatedModerator) {
        try {
           await updateUser(`/users/${updatingModerator.id}`, 'PUT', JSON.stringify(updatedModerator) );

            const newData = [...moderators].map(moderator => moderator.id !== updatedModerator.id ? moderator : updatedModerator)
            setModerators(newData);
            console.log(newData)
        } catch (err) {
            setError({message: err.message});
        }
    }


    async function handleDeleteModerator(moderatorId) {
        const confirmDelete = window.confirm("are you sure ?");
        if(confirmDelete) {
            try {
               await deleteUser(`/users/${moderatorId}`, 'DELETE');

                setModerators(moderators.filter(moderator => moderator.id !== moderatorId));
            } catch (err) {
                setError({message: err.message});
            }
        }
    };

    return (
        <div className="px-4"> 
            <Modal
                title={translate(({modalTitles}) => modalTitles.createModerator)}
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            >
                <CreateModeratorForm
                    onCreate={handleCreateModerator}
                    loading={createUserLoading}
                    onClose={() => setShowCreateModal(false)}
                />
            </Modal>

            <Modal
                title={translate(({modalTitles}) => modalTitles.updateModerator)}
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
            >
                <UpdateModeratorForm
                    onClose={() => setShowEditModal(false)}
                    onUpdate={handleUpdateModerator}
                    moderator={updatingModerator}
                    loading={updateUserLoading}
                />
            </Modal>

            <div className="d-flex justify-content-between py-4">
                <div className="d-flex">
                    <Button
                        className="mr-2"
                        // title={translate(({buttons}) => buttons.updateList)}
                        icon={IconType.FaSyncAlt}
                        variant={ButtonVariants.Success}
                        onClick={handleGetModerators}
                        loading={getUsersLoading}
                    />
                    <Button
                        title={translate(({buttons}) => buttons.createModerator)}
                        rightIcon={IconType.FaPlus}
                        variant={ButtonVariants.Success}
                        onClick={() => setShowCreateModal(true)}
                    />
                </div>
                <div>
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={textSearch}
                        onChange={handleGetSearchValue}
                    />
                </div>
            </div>
            {moderators.length > 0
            ?
                <ModeratorsTable
                     moderators={moderators}
                     onEdit={handleToggleUpdateModal}
                     onDelete={handleDeleteModerator}
                />
            :
                <Loader /> 
            }
           
        </div>
    )
}

export default ModeratorsPage;

