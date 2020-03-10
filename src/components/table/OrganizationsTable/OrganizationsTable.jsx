import React from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonVariants } from '../../ui/Button';

function OrganizationsTable ({
    organizations,
    onEdit,
    onDelete,
}) {
    return (
        <Table bordered hover size="sm" responsive="md">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Edit</th>
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
                                title="Edit"
                                outlined
                                variant={ButtonVariants.Primary}
                                onClick={() => onEdit(organization.id)}
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