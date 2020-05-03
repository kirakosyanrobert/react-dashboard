import React from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonVariants } from '../../ui/Button';
import { useTranslation } from '../../../hooks';
import { IconType } from '../../../consts';


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
                    <th>{translate(({table}) => table.login)}</th> 
                    <th>{translate(({table}) => table.password)}</th> 
                    <th>{translate(({table}) => table.fullName)}</th>
                    <th>{translate(({table}) => table.phoneNumber)}</th>

                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {moderators.map((moderator, index) => (
                    <tr key={`table-item-${moderator.id}`}>
                        <td>{index + 1}</td>
                        <td>{moderator.username}</td>
                        <td>*****</td>
                        <td>{moderator.name}</td>
                        <td>{moderator.phone}</td>

                        <td>
                            <Button
                                icon={IconType.FaList}
                                variant={ButtonVariants.Success}
                                onClick={() => {}}
                            />
                        </td>
                        <td>
                            <Button
                                icon={IconType.FaRegEdit}
                                variant={ButtonVariants.Primary}
                                onClick={() => onEdit(moderator)}
                            />
                        </td>
                        <td>
                            <Button
                                icon={IconType.FaRegTrashAlt}
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