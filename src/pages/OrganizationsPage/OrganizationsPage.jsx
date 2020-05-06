import React, { useState } from 'react';

import { Button, ButtonVariants } from '../../components/ui/Button';
import {useNavigation, useEffectOnce, useTranslation, useRequest, useAlerts} from '../../hooks';
import OrganizationsTable from '../../components/table/OrganizationsTable/OrganizationsTable';
import { IconType } from '../../consts';


function OrganizationsPage () {
    const [organizations, setOrganizations] = useState([]);

    const { routes, navigate } = useNavigation();
    const translate = useTranslation();
    const { setError, setNotification } = useAlerts();
    const { loading: getOrganisationsLoading, request: getOrganisations } = useRequest();
    const { loading: deleteOrganisationLoading, request: deleteOrganisation } = useRequest();

    useEffectOnce(() => {
        handleGetOrganisations();
    });

  
    async function handleGetOrganisations() {
        try {
            const data = await getOrganisations('/admin/geo/poi?var1=1');
            setOrganizations(data);
        } catch (err) {
            setError({message: err.message});
        }
    }

    function handleNavigateOrganizationDetailsPage(orgId) {
        navigate(routes.organizationDetails(orgId))
    }


    async function handleDeleteOrganization(organizationId) {
        const confirmDelete = window.confirm("are you sure ?");
        if(confirmDelete) {
            try {
                await deleteOrganisation(`/admin/geo/poi/${organizationId}`, 'DELETE');
                setOrganizations(organizations.filter(organisation => organisation.properties.id !== organizationId));
            } catch (err) {
                setError({message: err.message});
            }
        }
    }


    return (
        <div className="px-4">
            <div className="d-flex py-4">
                <Button
                    title={translate(({buttons}) => buttons.createOrganization)}
                    rightIcon={IconType.FaPlus}
                    variant={ButtonVariants.Primary}
                    onClick={() => navigate(routes.createOrganization)}
                />
            </div>

            {organizations.length > 0
            ?
                <OrganizationsTable
                    organizations={organizations}
                    onDetails={handleNavigateOrganizationDetailsPage}
                    onDelete={handleDeleteOrganization}
                />
            :
                <h1>Organizations List is empty</h1>
            }
                  
        </div>
    )
}

export default OrganizationsPage;