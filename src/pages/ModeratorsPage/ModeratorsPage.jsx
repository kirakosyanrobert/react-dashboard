import React, { useState } from 'react';

import { useEffectOnce, useTranslation, useAlerts, useRequest } from '../../hooks'
import ModeratorsTable from '../../components/table/ModeratorsTable/ModeratorsTable';
import Modal from '../../components/ui/Modal/Modal';
import { Loader } from '../../components/ui/Loader';
import { Button, ButtonVariants } from '../../components/ui/Button';
import CreateModeratorForm from '../../components/forms/CreateModeratorForm';
import UpdateModeratorForm from '../../components/forms/UpdateModeratorForm';
import { IconType } from '../../consts';



function ModeratorsPage() {
    const [moderators, setModerators] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatingModerator, setUpdatingModerator] = useState({});
    const translate = useTranslation();
    const { setError, setNotification } = useAlerts();

    const { loading: getUsersLoading, request: getUsers } = useRequest();
    const { loading: createUserLoading, request: createUser } = useRequest();
    const { loading: updateUserLoading, request: updateUser } = useRequest();
    const { request: deleteUser } = useRequest();


    useEffectOnce(() => {
        handleGetModerators();
    });

   async function handleGetModerators() {
        try {
            const data = await getUsers('/users');
            setModerators(data);
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
                title={"Create New Moderator"}
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
                title={"Update Moderator Info"}
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

            <div className="d-flex py-4">
                <Button
                    className="mr-2"
                    title={translate(({buttons}) => buttons.updateList)}
                    variant={ButtonVariants.Primary}
                    onClick={handleGetModerators}
                    loading={getUsersLoading}
                />
                <Button
                    title={translate(({buttons}) => buttons.createModerator)}
                    rightIcon={IconType.FaPlus}
                    variant={ButtonVariants.Primary}
                    onClick={() => setShowCreateModal(true)}
                />
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

