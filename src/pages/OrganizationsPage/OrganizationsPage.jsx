import React, { useEffect, useState } from 'react';

import { Button, ButtonVariants } from '../../components/ui/Button';
import { useNavigation, useEffectOnce } from '../../hooks';
import { StorageKey } from '../../consts';
import OrganizationsTable from '../../components/table/OrganizationsTable/OrganizationsTable';


function OrganizationsPage () {
    const [organizations, setOrganizations] = useState([]);
    const { routes, navigate } = useNavigation();

    useEffectOnce(() => {
        const orgData = localStorage.getItem(StorageKey.Organizations);
        if(!orgData) {
            setOrganizations([]);
        } else {
            setOrganizations(JSON.parse(orgData));
        }
    });
    




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
                    title="Create Organization >>"
                    variant={ButtonVariants.Primary}
                    onClick={() => navigate(routes.createOrganization)}
                />
            </div>

            {organizations.length > 0
            ?
                <OrganizationsTable
                    organizations={organizations}
                    onEdit={(orgId) => console.log(orgId)}
                    onDelete={handleDeleteOrganization}
                />
            :
                <h1>Organizations List is empty</h1>
            }
                  
        </div>
    )
}

export default OrganizationsPage;