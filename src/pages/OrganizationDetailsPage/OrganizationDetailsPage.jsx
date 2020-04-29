import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigation, useEffectOnce } from '../../hooks';
import { Button } from '../../components/ui/Button';
import { StorageKey, IconType } from '../../consts';
import OrganizationDetailsForm from '../../components/forms/OrganizationDetailsForm/OrganizationDetailsForm';

function OrganizationDetailsPage() {
    const [organization, setOrganization] = useState({});
    const { routes, navigate } = useNavigation();
    const { id: orgId } = useParams(); 

    useEffectOnce(() => {
        const organizationsData = JSON.parse(localStorage.getItem(StorageKey.Organizations));
        // Imitate get Org request.
        if(organizationsData) {
            organizationsData.forEach((org) => {
                if(org.id === orgId) {
                    setOrganization(org)
                }
            })
        }
    });

    function handleUpdateOrganization (updatedOrganization) {
        // Imitate update Org request.
        const organizationsData = JSON.parse(localStorage.getItem(StorageKey.Organizations));
        if(organizationsData) {
            organizationsData.forEach((org, index) => {
                if(org.id === updatedOrganization.id) {
                    organizationsData.splice(index, 1, updatedOrganization)
                }
            })
        }
        localStorage.setItem(StorageKey.Organizations, JSON.stringify(organizationsData))
    }

    return (
        <div className="px-4">
            <div className="d-flex py-4">
                <Button
                    icon={IconType.FaChevronLeft}
                    onClick={() => navigate(routes.organizations)}
                />
            </div>
                {organization.id && 
                    <OrganizationDetailsForm
                        organization={organization}
                        onUpdate={handleUpdateOrganization}
                    />
                }
        </div>
    )
}

export default OrganizationDetailsPage