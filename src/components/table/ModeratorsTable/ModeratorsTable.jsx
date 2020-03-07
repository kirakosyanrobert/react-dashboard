import React from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonVariants } from '../../ui/Button';

function ModeratorsTable ({
    moderators,
    onEdit,
    onDelete,
}) {
    return (
        <Table striped bordered hover size="sm" responsive="md">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {moderators.map((moderator, index) => (
                    <tr key={moderator.id}>
                        <td>{index + 1}</td>
                        <td>{moderator.firstName}</td>
                        <td>{moderator.lastName}</td>
                        <td>{moderator.email}</td>
                        <td>{moderator.password}</td>
                        <td>
                            <Button
                                title="Edit"
                                outlined
                                variant={ButtonVariants.Primary}
                                onClick={() => {}}
                            />
                        </td>
                        <td>
                            <Button
                                title="Delete"
                                outlined
                                variant={ButtonVariants.Danger}
                                onClick={() => {}}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ModeratorsTable;