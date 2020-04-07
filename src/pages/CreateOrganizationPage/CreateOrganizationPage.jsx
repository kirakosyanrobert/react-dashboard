import React from 'react';

import { Button } from '../../components/ui/Button';
import { useNavigation } from '../../hooks';
import CreateOrganizationForm from '../../components/forms/CreateOrganizationForm/CreateOrganizationForm';


function CreateOrganizationPage () {
    const { routes, navigate } = useNavigation();

    function handleCreate(newOrganization) {
        console.log(newOrganization);
        
        //Request To Create
        //Success
        // I dont check orgData exists or not;
        navigate(routes.organizations);
    }

    return (
        <div className="px-4">
            <div className="d-flex py-4">
                <Button
                    title="<"
                    outlined
                    onClick={() => navigate(routes.organizations)}
                />
            </div>
            <CreateOrganizationForm onCreate={handleCreate} />
        </div>
    )
}

export default CreateOrganizationPage;