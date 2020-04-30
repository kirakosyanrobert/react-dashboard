import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {useNavigation, useEffectOnce, useRequest, useAlerts} from '../../hooks';
import { Button } from '../../components/ui/Button';
import { StorageKey, IconType } from '../../consts';
import OrganizationDetailsForm from '../../components/forms/OrganizationDetailsForm/OrganizationDetailsForm';

function OrganizationDetailsPage() {
    const [organization, setOrganization] = useState({});
    const { routes, navigate } = useNavigation();
    const { request: getOrganisation } = useRequest();
    const { id: orgId } = useParams();
    const { setError, setNotification } = useAlerts();
    const { loading: updateOrganisationLoading, request: updateOrganisation } = useRequest();

    useEffectOnce(() => {
        handleGetOrganisation();
    });

    async function handleGetOrganisation ()
    {
        const organizationsData = await getOrganisation(`/admin/geo/poi/${orgId}`);
        setOrganization(organizationsData);
    }

    async function handleUpdateOrganization (updatedOrganization)
    {
        try {
            const data = await updateOrganisation(`/admin/geo/poi/${orgId}`, 'PUT',  JSON.stringify({poi : updatedOrganization}));
            setNotification({message: 'Organisation Updated successfully!'});
            navigate(routes.organizations);
        } catch (err) {
            setError({message: err.message});
        }
    }

    return (
        <div className="px-4">
            <div className="d-flex py-4">
                <Button
                    icon={IconType.FaChevronLeft}
                    onClick={() => navigate(routes.organizations)}
                />
            </div>
                {organization.properties && organization.properties.id &&
                    <OrganizationDetailsForm
                        organization={organization}
                        onUpdate={handleUpdateOrganization}
                    />
                }
        </div>
    )
}

export default OrganizationDetailsPage