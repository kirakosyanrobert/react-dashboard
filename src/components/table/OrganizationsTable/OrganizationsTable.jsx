import React from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonVariants } from '../../ui/Button';
import { useTranslation } from '../../../hooks';
import { IconType } from '../../../consts';

function OrganizationsTable ({
    organizations,
    onDetails,
    onDelete,
}) {

    const translate = useTranslation();

    return (
        <Table bordered hover size="sm" responsive="md">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{translate(({table}) => table.title)}</th>
                    <th>{translate(({table}) => table.details)}</th>
                    <th>{translate(({table}) => table.delete)}</th>
                </tr>
            </thead>
            <tbody>
                {organizations.map((organization, index) => (
                    <tr key={`organization-item-${index}`}>
                        <td>{index + 1}</td>
                        <td>{organization.properties.title.en}</td>
                        <td>
                            <Button
                                title={translate(({buttons}) => buttons.details)}
                                outlined
                                variant={ButtonVariants.Primary}
                                onClick={() => onDetails(organization.properties.id)}
                            />
                        </td>
                        <td>
                            <Button
                                icon={IconType.FaRegTrashAlt}
                                variant={ButtonVariants.Danger}
                                onClick={() => onDelete(organization.properties.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default OrganizationsTable;