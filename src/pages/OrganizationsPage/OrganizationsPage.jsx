import React, { useEffect, useState } from 'react';

import { Button, ButtonVariants } from '../../components/ui/Button';
import { useNavigation, useEffectOnce, useTranslation } from '../../hooks';
import { StorageKey } from '../../consts';
import OrganizationsTable from '../../components/table/OrganizationsTable/OrganizationsTable';


function OrganizationsPage () {
    const [organizations, setOrganizations] = useState([]);
    const { routes, navigate } = useNavigation();
    const translate = useTranslation();

    useEffectOnce(() => {
        const orgData = localStorage.getItem(StorageKey.Organizations);
        if(!orgData) {
            setOrganizations([]);
        } else {
            setOrganizations(JSON.parse(orgData));
        }
    });


    function handleNavigateOrganizationDetailsPage(orgId) {
        navigate(routes.organizationDetails(orgId))
    }


    function handleDeleteOrganization(organizationId) {
        //Request to delete organization
        // if success
        const confirmDelete = window.confirm("are you sure ?");
        if(confirmDelete) {
            setOrganizations(organizations.filter(organization => organization.id !== organizationId));
        }
    }

    useEffect(() => {
        localStorage.setItem(StorageKey.Organizations, JSON.stringify(organizations));
    }, [organizations])


    return (
        <div className="px-4">
            <div className="d-flex py-4">
                <Button
                    title={translate(({buttons}) => buttons.createOrganization)}
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