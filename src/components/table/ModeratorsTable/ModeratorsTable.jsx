import React from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonVariants } from '../../ui/Button';
import { useTranslation, useLoggedInAsSuper } from '../../../hooks';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';


function ModeratorsTable ({
    moderators,
    onEdit,
    onDelete,
}) {
    const translate = useTranslation();
    const loggedInAsSuper = useLoggedInAsSuper();

    return (
        <Table bordered hover size="sm" responsive="md">
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th>{translate(({table}) => table.login)}</th> 
                    {/* <th>{translate(({table}) => table.password)}</th>  */}
                    <th>{translate(({table}) => table.fullName)}</th>
                    <th>{translate(({table}) => table.phoneNumber)}</th>
                    <th>{translate(({table}) => table.role)}</th>

                    <th></th>
                    {
                        loggedInAsSuper &&
                        <th></th>
                    }
                </tr>
            </thead>
            <tbody>
                {moderators.map((moderator, index) => (
                    <tr key={`table-item-${moderator.id}`}>
                        <td className="text-center">{index + 1}</td>
                        <td>{moderator.username}</td>
                        {/* <td>*****</td> */}
                        <td>{moderator.name}</td>
                        <td>{moderator.phone}</td>
                        <td>
                            {
                                moderator.role === '1' && 'Admin' ||
                                moderator.role === '2' && 'Moderator'
                            }
                        </td>

                        <td>
                            <Button
                                outlined
                                className="mx-auto"
                                icon={IconType.FaList}
                                iconColor={Colors.green}
                                variant={ButtonVariants.Light}
                                onClick={() => onEdit(moderator)}
                            />
                        </td>
                        {/* <td>
                            <Button
                                icon={IconType.FaRegEdit}
                                variant={ButtonVariants.Primary}
                                onClick={() => onEdit(moderator)}
                            />
                        </td> */}
                        
                        {
                            loggedInAsSuper &&
                            <td>
                                <Button
                                    outlined
                                    className="mx-auto"
                                    icon={IconType.FaRegTrashAlt}
                                    iconColor={Colors.red}
                                    variant={ButtonVariants.Light}
                                    onClick={() => onDelete(moderator.id)}
                                />
                            </td>
                        }
                       
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ModeratorsTable;