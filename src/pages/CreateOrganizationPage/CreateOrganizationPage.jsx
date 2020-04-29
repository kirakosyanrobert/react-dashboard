import React from 'react';
import { v4 as uuid } from 'uuid'
import { Button, ButtonSizes } from '../../components/ui/Button';
import { useNavigation } from '../../hooks';
import CreateOrganizationForm from '../../components/forms/CreateOrganizationForm/CreateOrganizationForm';
import { IconType, StorageKey } from '../../consts';


function CreateOrganizationPage () {
    const { routes, navigate } = useNavigation();

    function handleCreate(newOrganization) {
        console.log(newOrganization);
        newOrganization.id = uuid();
        const orgs = JSON.parse(localStorage.getItem(StorageKey.Organizations));
        if(orgs) {
            let data = [newOrganization, ...orgs];
            localStorage.setItem(StorageKey.Organizations, JSON.stringify(data));
        } else {
            let data = [newOrganization];
            localStorage.setItem(StorageKey.Organizations, JSON.stringify(data));
        }
        //Request To Create
        //Success
        // I dont check orgData exists or not;
        navigate(routes.organizations);
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