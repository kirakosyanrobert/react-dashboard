import React, { useState, useEffect } from 'react';

import { Button, ButtonVariants } from '../../components/ui/Button';
import {useNavigation, useEffectOnce, useTranslation, useRequest, useAlerts} from '../../hooks';
import OrganizationsTable from '../../components/table/OrganizationsTable/OrganizationsTable';
import { IconType } from '../../consts';
import { Form } from 'react-bootstrap';
import { Pagination } from '../../components/ui/Pagination';


function OrganizationsPage () {
    const [organizations, setOrganizations] = useState([]);
    const [tempOrganizations, setTempOrganizations] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);

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
            setTempOrganizations(data.slice(0, itemsPerPage));
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

                setTempOrganizations(tempOrganizations.filter(organisation => organisation.properties.id !== organizationId));
            } catch (err) {
                setError({message: err.message});
            }
        }
    }


    useEffect(() => {
        setTempOrganizations(organizations.slice(0, itemsPerPage));
        setPage(1);
    }, [itemsPerPage]);

    function handlePagePrev (showPage) {
        setPage(showPage)
        setTempOrganizations(organizations.slice((showPage - 1) * itemsPerPage, showPage * itemsPerPage))
    }

    function handlePageNext (showPage) {
        setPage(showPage)
        setTempOrganizations(organizations.slice((showPage - 1) * itemsPerPage, showPage * itemsPerPage))
    }




    return (
        <div className="px-4">
            <div className="d-flex py-4">
                <div>
                    <Button
                        title={translate(({buttons}) => buttons.createOrganization)}
                        rightIcon={IconType.FaPlus}
                        variant={ButtonVariants.Primary}
                        onClick={() => navigate(routes.createOrganization)}
                    />
                </div>
               <div>
                    <Form.Group>
                        <Form.Control
                            as="select"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </Form.Control>
                    </Form.Group>
               </div>
               <div>
                   <Pagination
                        total={organizations.length}
                        currentPage={page}
                        perPage={itemsPerPage}
                        onPrev={handlePagePrev}
                        onNext={handlePageNext}
                   />
               </div>
             
            </div>

            {organizations.length > 0
            ?
                <OrganizationsTable
                    organizations={tempOrganizations}
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