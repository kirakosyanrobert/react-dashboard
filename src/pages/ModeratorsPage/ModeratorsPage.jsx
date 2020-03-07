import React, { useState, useEffect } from 'react';

import { useEffectOnce } from '../../hooks'
import ModeratorsTable from '../../components/table/ModeratorsTable/ModeratorsTable';
import Modal from '../../components/ui/Modal/Modal';
import { Button, ButtonVariants } from '../../components/ui/Button';

import { StorageKey } from '../../consts';
import CreateModeratorForm from '../../components/forms/CreateModeratorForm';

function ModeratorsPage() {
    const [moderators, setModerators] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffectOnce(() => {
        const moderatorsData = JSON.parse(localStorage.getItem(StorageKey.Moderators));
        setModerators(moderatorsData);
    });

    function handleCreateModerator(newModerator) {
        setModerators([newModerator, ...moderators]);
        setShowCreateModal(false);
    }

    function handleUpdateModerator() {

    }

    function handleDeleteModerator() {

    }

    useEffect(() => {
        localStorage.setItem(StorageKey.Moderators, JSON.stringify(moderators))
    }, [moderators]);
    
    return (
        <div>
            <Modal
                title={"Create New Moderator"}
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            >
                <CreateModeratorForm onSubmit={handleCreateModerator} />
            </Modal>
            <div className="d-flex p-4">
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
                     onEdit={handleUpdateModerator}
                     onRemove={handleDeleteModerator}
                />
            :
                <h1>Moderators List is empty</h1>
            }
           
        </div>
    )
}

export default ModeratorsPage;

