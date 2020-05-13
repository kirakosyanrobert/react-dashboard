import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';


import { useEffectOnce, useTranslation, useAlerts, useRequest } from '../../hooks'
import ModeratorsTable from '../../components/table/ModeratorsTable/ModeratorsTable';
import Modal from '../../components/ui/Modal/Modal';
import { Loader } from '../../components/ui/Loader';
import { Button, ButtonVariants } from '../../components/ui/Button';
import CreateModeratorForm from '../../components/forms/CreateModeratorForm';
import UpdateModeratorForm from '../../components/forms/UpdateModeratorForm';
import { IconType } from '../../consts';



function ModeratorsPage() {
    const [allModerators, setAllModerators] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatingModerator, setUpdatingModerator] = useState({});
    const [textSearch, setTextSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const translate = useTranslation();
    const { setError, setNotification } = useAlerts();
    const [usersToShow, setUsersToShow] = useState([]);

    const { loading: getUsersLoading, request: getUsers } = useRequest();
    const { loading: createUserLoading, request: createUser } = useRequest();
    const { loading: updateUserLoading, request: updateUser } = useRequest();
    const { request: deleteUser } = useRequest();

    function handleGetSearchValue(e) {
        const value = e.target.value;
        setTextSearch(value);
        const filteredModeratros = allModerators.filter(moderator => (
            moderator.role === '1' ||
            moderator.username.includes(value) ||
            moderator.name.includes(value) ||
            moderator.phone.includes(value)
        ));
        setModerators([...filteredModeratros]);
    };

    useEffect(() => {
        if(selectedStatus === 'all') {
            setModerators(allModerators);
        } else {
            const filteredModeratros = allModerators.filter(moderator => (moderator.role === '1') || moderator.status === selectedStatus);
            setModerators([...filteredModeratros]);
        }
    }, [selectedStatus])


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
    };


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
            setShowEditModal(false);
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

    useEffect(() => {
        if(moderators.length > 0) {
           const admins = moderators.filter(moder => moder.role === '1');
           admins.forEach(admin => {
            admin.subRows = [];
            admin.opened = false;
           });
            moderators.forEach((moder) => {
                admins.forEach((admin) => {
                    if(moder.createdBy === admin.username) {
                        admin.subRows = [...admin.subRows, moder]
                    }
                })
            })
            console.log(admins);
            setUsersToShow(admins)
        }
    }, [moderators]);


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
                <div className="d-flex align-items-center">
                    <Form.Control
                        className="mr-2"
                        as="select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </Form.Control> 

                    <Form.Control
                        type="text"
                        placeholder={translate(({inputs}) => inputs.search.title)}
                        value={textSearch}
                        onChange={handleGetSearchValue}
                    />
                </div>
            </div>

            {getUsersLoading && <Loader />}

            {!getUsersLoading && moderators.length === 0 && textSearch.length !== 0 &&
              <span>{translate(({messages}) => messages.noUsersFound)}</span>
            }

            {!getUsersLoading && moderators.length === 0 && textSearch.length === 0 &&
                <span>{translate(({messages}) => messages.noUsers)}</span>
            }

            {!getUsersLoading && usersToShow.length > 0 &&
                <ModeratorsTable
                     textSearch={textSearch}
                     usersToShow={usersToShow}
                     onEdit={handleToggleUpdateModal}
                     onDelete={handleDeleteModerator}
                />
            }
           
        </div>
    )
}

export default ModeratorsPage;

