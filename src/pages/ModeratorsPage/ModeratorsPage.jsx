import React, { useState, useEffect } from 'react';

import { useEffectOnce } from '../../hooks'
import ModeratorsTable from '../../components/table/ModeratorsTable/ModeratorsTable';
import Modal from '../../components/ui/Modal/Modal';
import { Button, ButtonVariants } from '../../components/ui/Button';
import { StorageKey } from '../../consts';
import CreateModeratorForm from '../../components/forms/CreateModeratorForm';
import UpdateModeratorForm from '../../components/forms/UpdateModeratorForm';

function ModeratorsPage() {
    const [moderators, setModerators] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatingModerator, setUpdatingModerator] = useState({});

    useEffectOnce(() => {
        const moderatorsData = JSON.parse(localStorage.getItem(StorageKey.Moderators));
        setModerators(moderatorsData);
    });

    function handleCreateModerator(newModerator) {
        //Request to create Moderator
        // if success
        setModerators([newModerator, ...moderators]);
        setShowCreateModal(false);
    }

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

    // save in localStorage for all actions
    useEffect(() => {
        localStorage.setItem(StorageKey.Moderators, JSON.stringify(moderators))
    }, [moderators]);
    
    return (
        <div className="px-4">
            <Modal
                title={"Create New Moderator"}
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            >
                <CreateModeratorForm onCreate={handleCreateModerator} />
            </Modal>

            <Modal
                title={"Update Moderator Info"}
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
            >
                <UpdateModeratorForm
                    onUpdate={handleUpdateModerator}
                    moderator={updatingModerator}
                />
            </Modal>

            <div className="d-flex py-4">
                <Button
                    title="Create new Moderator"
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
                <h1>Moderators List is empty</h1>
            }
           
        </div>
    )
}

export default ModeratorsPage;

