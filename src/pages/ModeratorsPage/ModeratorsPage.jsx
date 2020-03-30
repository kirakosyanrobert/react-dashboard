import React, { useState, useEffect } from 'react';

import { useEffectOnce, useTranslation, useAlerts, useGetUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../hooks'
import ModeratorsTable from '../../components/table/ModeratorsTable/ModeratorsTable';
import Modal from '../../components/ui/Modal/Modal';
import { Loader } from '../../components/ui/Loader';
import { Button, ButtonVariants } from '../../components/ui/Button';
import { StorageKey } from '../../consts';
import CreateModeratorForm from '../../components/forms/CreateModeratorForm';
import UpdateModeratorForm from '../../components/forms/UpdateModeratorForm';

function ModeratorsPage() {
    const [moderators, setModerators] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatingModerator, setUpdatingModerator] = useState({});
    const translate = useTranslation();
    const { setError, setNotification } = useAlerts();

    const [{data: usersData, loading: getUsersLoading}, getUsers] = useGetUsers();
    const [{data: createUserData}, createUser] = useCreateUser();
    const [{data: updateUserData}, updateUser] = useUpdateUser();
    const [{data: deleteUserData}, deleteUser] = useDeleteUser();

    useEffectOnce(() => {
        handleGetModerators();
    });

    function handleGetModerators() {
        getUsers();
    }

    useEffect(() => {
        if(usersData) {
            setNotification({ title: 'Message', message: 'success',})
            console.log(usersData);
            setModerators(usersData);
        }
    }, [usersData]);

    
        
    function handleCreateModerator(newModerator) {
        createUser({
            data: newModerator
        })
       
    }

    useEffect(() => {
        if(createUserData) {
            console.log(createUserData);
            setModerators([createUserData, ...moderators]);
            setShowCreateModal(false);
        }
    }, [createUserData])




    function handleToggleUpdateModal(moderator) {
        setUpdatingModerator(moderator);
        setShowEditModal(true);
    }

    function handleUpdateModerator(updatedModerator) {
        updateUser({
            url: `/users/${updatedModerator.id}`,
            data: updatedModerator
        });
    }

    useEffect(() => {
        if(updateUserData) {
            console.log(updateUserData);
            // const newData = [...moderators].map(moderator => moderator.id !== updatedModerator.id ? moderator : updatedModerator)
            // setModerators(newData);
            setShowEditModal(false);
        }
    }, [updateUserData])




    function handleDeleteModerator(moderatorId) {
        const confirmDelete = window.confirm("are you sure ?");
        if(confirmDelete) {
            deleteUser({
                url: `/users/${moderatorId}`,
            });
        }
    };

    useEffect(() => {
        if(deleteUserData) {
            console.log(deleteUserData);
            // setModerators(moderators.filter(moderator => moderator.id !== moderatorId));
        }
    }, [deleteUserData])

    return (
        <div className="px-4">
            <Modal
                title={"Create New Moderator"}
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            >
                <CreateModeratorForm
                     onCreate={handleCreateModerator}
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
                />
            </Modal>

            <div className="d-flex py-4">
                <Button
                    className="mr-2"
                    title={translate(({buttons}) => buttons.updateList)}
                    disabled={getUsersLoading}
                    variant={ButtonVariants.Primary}
                    onClick={handleGetModerators}
                />
                <Button
                    title={translate(({buttons}) => buttons.createModerator)}
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

