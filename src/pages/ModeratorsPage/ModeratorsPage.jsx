import React, { useState, useEffect } from 'react';

import { useEffectOnce, useTranslation, useGetUsers, useCreateUser } from '../../hooks'
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

    const [{data: usersData, loading: getUsersLoading}, getUsers] = useGetUsers();
    const [{data: createUserData}, createUser] = useCreateUser();

    useEffectOnce(() => {
        handleGetModerators();
    });

    function handleGetModerators() {
        const token = localStorage.getItem(StorageKey.Token);
        getUsers({
            headers: {
                token
            }
        });
    }

    useEffect(() => {
        if(usersData) {
            setModerators(usersData);
        }
    }, [usersData]);

    
        
    function handleCreateModerator(newModerator) {
        const token = localStorage.getItem(StorageKey.Token);
        createUser({
            headers: {
                token
            },
            data: newModerator
        })
       
    }

    useEffect(() => {
        if(createUserData) {
            console.log(createUserData)
            // setModerators([newModerator, ...moderators]);
            // setShowCreateModal(false);
        }
    }, [createUserData])




    function handleToggleUpdateModal(moderator) {
        setUpdatingModerator(moderator);
        setShowEditModal(true);
    }

    function handleUpdateModerator(updatedModerator) {
        //Request to update Moderator
        // if success
        const newData = [...moderators].map(moderator => moderator.id !== updatedModerator.id ? moderator : updatedModerator)
        setModerators(newData);
        setShowEditModal(false);
    }

    function handleDeleteModerator(moderatorId) {
        //Request to delete moderator
        // if success
        const confirmDelete = window.confirm("are you sure ?");
        if(confirmDelete) {
            setModerators(moderators.filter(moderator => moderator.id !== moderatorId));
        }
    }

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

