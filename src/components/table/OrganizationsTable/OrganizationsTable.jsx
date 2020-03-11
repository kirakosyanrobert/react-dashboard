import React from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonVariants } from '../../ui/Button';

function OrganizationsTable ({
    organizations,
    onDetails,
    onDelete,
}) {
    return (
        <Table bordered hover size="sm" responsive="md">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {organizations.map((organization, index) => (
                    <tr key={organization.id}>
                        <td>{index + 1}</td>
                        <td>{organization.title}</td>
                        <td>
                            <Button
                                title="Details"
                                outlined
                                variant={ButtonVariants.Primary}
                                onClick={() => onDetails(organization.id)}
                            />
                        </td>
                        <td>
                            <Button
                                title="Delete"
                                outlined
                                variant={ButtonVariants.Danger}
                                onClick={() => onDelete(organization.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default OrganizationsTable;