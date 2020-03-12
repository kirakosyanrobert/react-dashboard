import React from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonVariants } from '../../ui/Button';
import { useTranslation } from '../../../hooks';


function ModeratorsTable ({
    moderators,
    onEdit,
    onDelete,
}) {

    const translate = useTranslation();

    return (
        <Table bordered hover size="sm" responsive="md">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{translate(({table}) => table.firstName)}</th>
                    <th>{translate(({table}) => table.lastName)}</th>
                    <th>{translate(({table}) => table.email)}</th>
                    <th>{translate(({table}) => table.password)}</th>
                    <th>{translate(({table}) => table.edit)}</th>
                    <th>{translate(({table}) => table.delete)}</th>
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
                                title={translate(({buttons}) => buttons.edit)}
                                outlined
                                variant={ButtonVariants.Primary}
                                onClick={() => onEdit(moderator)}
                            />
                        </td>
                        <td>
                            <Button
                                title={translate(({buttons}) => buttons.delete)}
                                outlined
                                variant={ButtonVariants.Danger}
                                onClick={() => onDelete(moderator.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ModeratorsTable;