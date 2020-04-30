import React from 'react';
import { v4 as uuid } from 'uuid'
import { Button, ButtonSizes } from '../../components/ui/Button';
import {useAlerts, useNavigation, useRequest} from '../../hooks';
import CreateOrganizationForm from '../../components/forms/CreateOrganizationForm/CreateOrganizationForm';
import { IconType, StorageKey } from '../../consts';


function CreateOrganizationPage () {
    const { routes, navigate } = useNavigation();
    const { setError, setNotification } = useAlerts();
    const { loading: createOrganisationLoading, request: createOrganisation } = useRequest();

    async function handleCreate (newOrganization)
    {
        try {
            const data = await createOrganisation('/admin/geo/poi', 'POST',  JSON.stringify({poi : newOrganization}));
            setNotification({message: 'Organisation Created successfully!'});
            navigate(routes.organizations);
        } catch (err) {
            setError({message: err.message});
        }
    }

    return (
        <div className="px-2 px-sm-3">
            <div className="d-flex py-4">
                <Button
                    size={ButtonSizes.Small}
                    icon={IconType.FaChevronLeft}
                    onClick={() => navigate(routes.organizations)}
                />
            </div>
            <CreateOrganizationForm onCreate={handleCreate} />
        </div>
    )
}

export default CreateOrganizationPage;