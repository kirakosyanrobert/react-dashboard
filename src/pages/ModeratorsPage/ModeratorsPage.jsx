import React, { useState } from 'react';

import { useEffectOnce, useTranslation, useAlerts } from '../../hooks'
import ModeratorsTable from '../../components/table/ModeratorsTable/ModeratorsTable';
import Modal from '../../components/ui/Modal/Modal';
import { Loader } from '../../components/ui/Loader';
import { Button, ButtonVariants } from '../../components/ui/Button';
import CreateModeratorForm from '../../components/forms/CreateModeratorForm';
import UpdateModeratorForm from '../../components/forms/UpdateModeratorForm';
import { doRequest } from '../../API';

function ModeratorsPage() {
    const [moderators, setModerators] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatingModerator, setUpdatingModerator] = useState({});
    const translate = useTranslation();
    const { setError, setNotification } = useAlerts();


    useEffectOnce(() => {
        handleGetModerators();
    });

   async function handleGetModerators() {
        try {
            const data = await doRequest('/users', {
                method: 'GET'
            });
            setModerators(data);
        } catch (err) {
            setError({message: err.message});
        }
    }


    async function handleCreateModerator(newModerator) {
       try {
            const data = await doRequest('/users', {
                method: 'POST',
                data: newModerator
            });
            setNotification({message: 'User Created successfully!'})
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
            const data = await doRequest(`/users/${updatedModerator.id}`, {
                method: 'PUT',
                data: updatedModerator
            });

            const newData = [...moderators].map(moderator => moderator.id !== updatedModerator.id ? moderator : updatedModerator)
            setModerators(newData);
            setShowEditModal(false);
        } catch (err) {
            setError({message: err.message});
        }
    }


    async function handleDeleteModerator(moderatorId) {
        const confirmDelete = window.confirm("are you sure ?");
        if(confirmDelete) {
            try {
                const data = await doRequest(`/users/${moderatorId}`, {
                    method: 'DELETE',
                })

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

