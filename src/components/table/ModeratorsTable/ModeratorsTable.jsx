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
                    <th>{translate(({table}) => table.username)}</th>
                    <th>{translate(({table}) => table.name)}</th>
                    <th>{translate(({table}) => table.phoneNumber)}</th>

                    <th>{translate(({table}) => table.edit)}</th>
                    <th>{translate(({table}) => table.delete)}</th>
                </tr>
            </thead>
            <tbody>
                {moderators.map((moderator, index) => (
                    <tr key={`table-item-${moderator.id}`}>
                        <td>{index + 1}</td>
                        <td>{moderator.username}</td>
                        <td>{moderator.name}</td>
                        <td>{moderator.phone}</td>
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