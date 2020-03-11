import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigation, useEffectOnce } from '../../hooks';
import { Button } from '../../components/ui/Button';
import { StorageKey } from '../../consts';
import OrganizationDetailsForm from '../../components/forms/OrganizationDetailsForm';

function OrganizationDetailsPage() {
    const [organization, setOrganization] = useState({});
    const [allowEdit, setAllowEdit] = useState(false);
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
        setAllowEdit(false);
    }

    return (
        <div className="px-4">
            <div className="d-flex py-4">
                <Button
                    className="mr-4"
                    title="<"
                    outlined
                    onClick={() => navigate(routes.organizations)}
                />
                 <Button
                    title={allowEdit ? "Discard" : "Edit"}
                    outlined
                    onClick={() => setAllowEdit(!allowEdit)}
                />
            </div>
                {organization.id && 
                    <OrganizationDetailsForm
                        organization={organization}
                        onUpdate={handleUpdateOrganization}
                        editable={allowEdit}
                    />
                }
        </div>
    )
}

export default OrganizationDetailsPage