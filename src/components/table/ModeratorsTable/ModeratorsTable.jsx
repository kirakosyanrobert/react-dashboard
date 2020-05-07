import React from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonVariants } from '../../ui/Button';
import {useTranslation, useLoggedInAsSuper, useLanguage} from '../../../hooks';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import Highlighter from "react-highlight-words";
import * as moment from "moment";

function ModeratorsTable ({
    moderators,
    onEdit,
    onDelete,
    textSearch
}) {
    const translate = useTranslation();
    const [ language, changeLanguage ] = useLanguage();
    const loggedInAsSuper = useLoggedInAsSuper();

    const formatDate = (date) =>
    {
        //@TODO сделать другое форматирование, если Алекандр попросит
        moment.locale(language.toLowerCase());
        let momentDate = moment(date);
        return momentDate.format("LL");
    };

    return (
        <Table bordered hover size="sm" responsive="md">
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th>{translate(({table}) => table.login)}</th> 
                    <th>{translate(({table}) => table.fullName)}</th>
                    <th>{translate(({table}) => table.phoneNumber)}</th>
                    <th>{translate(({table}) => table.role)}</th>
                    <th>{translate(({table}) => table.createDate)}</th>
                    <th>{translate(({table}) => table.updateDate)}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {moderators.map((moderator, index) => (
                    <tr key={`table-item-${moderator.id}`}>
                        <td className="text-center">{index + 1}</td>
                        <td>
                            <Highlighter
                                highlightClassName="search-highlight"
                                searchWords={[textSearch]}
                                autoEscape={true}
                                textToHighlight={moderator.username}
                            />
                        </td>
                        <td>
                            <Highlighter
                                highlightClassName="search-highlight"
                                searchWords={[textSearch]}
                                autoEscape={true}
                                textToHighlight={moderator.name}
                            />
                        </td>
                        <td>
                            <Highlighter
                                highlightClassName="search-highlight"
                                searchWords={[textSearch]}
                                autoEscape={true}
                                textToHighlight={moderator.phone}
                            />
                        </td>
                        <td>
                            {
                                moderator.role === '1' && 'Admin' ||
                                moderator.role === '2' && 'Moderator'
                            }
                        </td>

                        <td>
                            {formatDate(moderator.createDate)}
                        </td>

                        <td>
                            <span>{formatDate(moderator.updateDate)}</span>
                            <span className="text-secondary ml-1">{moderator.updatedBy}</span>
                        </td>

                        <td className="text-center">

                            <div className="d-flex justify-content-center">
                                <Button
                                    outlined
                                    className="border-0"
                                    icon={IconType.FaList}
                                    iconColor={Colors.green}
                                    variant={ButtonVariants.Light}
                                    onClick={() => onEdit(moderator)}
                                />


                                {
                                    loggedInAsSuper &&
                                    <Button
                                        outlined
                                        className="border-0 ml-2"
                                        icon={IconType.FaRegTrashAlt}
                                        iconColor={Colors.red}
                                        variant={ButtonVariants.Light}
                                        onClick={() => onDelete(moderator.id)}
                                    />
                                }
                            </div>

                        </td>
                        {/* <td>
                            <Button
                                icon={IconType.FaRegEdit}
                                variant={ButtonVariants.Primary}
                                onClick={() => onEdit(moderator)}
                            />
                        </td> */}

                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ModeratorsTable;