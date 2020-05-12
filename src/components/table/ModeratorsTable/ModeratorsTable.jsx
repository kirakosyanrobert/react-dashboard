// import React from 'react';
// import { Table } from 'react-bootstrap';

// import { Button, ButtonVariants } from '../../ui/Button';
// import {useTranslation, useLoggedInAsSuper, useLanguage} from '../../../hooks';
// import { IconType } from '../../../consts';
// import { Colors } from '../../../environment';
// import Highlighter from "react-highlight-words";
// import * as moment from "moment";

// function ModeratorsTable ({
//     moderators,
//     onEdit,
//     onDelete,
//     textSearch
// }) {
//     const translate = useTranslation();
//     const [ language, changeLanguage ] = useLanguage();
//     const loggedInAsSuper = useLoggedInAsSuper();

//     const formatDate = (date) =>
//     {
//         //@TODO сделать другое форматирование, если Алекандр попросит
//         moment.locale(language.toLowerCase());
//         let momentDate = moment(date);
//         return momentDate.format("LL");
//     };

//     return (
//         <Table bordered hover size="sm" responsive="md">
//             <thead>
//                 <tr>
//                     <th className="text-center">#</th>
//                     <th>{translate(({table}) => table.login)}</th> 
//                     <th>{translate(({table}) => table.fullName)}</th>
//                     <th>{translate(({table}) => table.phoneNumber)}</th>
//                     <th>{translate(({table}) => table.role)}</th>
//                     <th>{translate(({table}) => table.createDate)}</th>
//                     <th>{translate(({table}) => table.updateDate)}</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {moderators.map((moderator, index) => (
//                     <tr key={`table-item-${moderator.id}`}>
//                         <td className="text-center">{index + 1}</td>
//                         <td>
//                             <Highlighter
//                                 highlightClassName="search-highlight"
//                                 searchWords={[textSearch]}
//                                 autoEscape={true}
//                                 textToHighlight={moderator.username}
//                             />
//                         </td>
//                         <td>
//                             <Highlighter
//                                 highlightClassName="search-highlight"
//                                 searchWords={[textSearch]}
//                                 autoEscape={true}
//                                 textToHighlight={moderator.name}
//                             />
//                         </td>
//                         <td>
//                             <Highlighter
//                                 highlightClassName="search-highlight"
//                                 searchWords={[textSearch]}
//                                 autoEscape={true}
//                                 textToHighlight={moderator.phone}
//                             />
//                         </td>
//                         <td>
//                             {
//                                 moderator.role === '1' && 'Admin' ||
//                                 moderator.role === '2' && 'Moderator'
//                             }
//                         </td>

//                         <td>
//                             {formatDate(moderator.createDate)}
//                         </td>

//                         <td>
//                             <span>{formatDate(moderator.updateDate)}</span>
//                             <span className="text-secondary ml-1">{moderator.updatedBy}</span>
//                         </td>

//                         <td className="text-center">

//                             <div className="d-flex justify-content-center">
//                                 <Button
//                                     outlined
//                                     className="border-0"
//                                     icon={IconType.FaList}
//                                     iconColor={Colors.green}
//                                     variant={ButtonVariants.Light}
//                                     onClick={() => onEdit(moderator)}
//                                 />


//                                 {
//                                     loggedInAsSuper &&
//                                     <Button
//                                         outlined
//                                         className="border-0 ml-2"
//                                         icon={IconType.FaRegTrashAlt}
//                                         iconColor={Colors.red}
//                                         variant={ButtonVariants.Light}
//                                         onClick={() => onDelete(moderator.id)}
//                                     />
//                                 }
//                             </div>

//                         </td>
//                         {/* <td>
//                             <Button
//                                 icon={IconType.FaRegEdit}
//                                 variant={ButtonVariants.Primary}
//                                 onClick={() => onEdit(moderator)}
//                             />
//                         </td> */}

//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//     )
// }

// export default ModeratorsTable;








import React from 'react';
import { Table } from 'react-bootstrap';
import { useTable, useExpanded } from 'react-table'

import { Button, ButtonVariants } from '../../ui/Button';
import {useTranslation, useLoggedInAsSuper, useLanguage} from '../../../hooks';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import Highlighter from "react-highlight-words";
import * as moment from "moment";
import { Icon } from '../../ui/Icon';

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


    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                Cell: ({ row }) => (
                    <span className={row.original.status === 'online' ? 'text-success' : 'text-dark'}>
                        {+row.id + 1}
                    </span>
                )
            },
            
            {
                Header: translate(({table}) => table.login),
                Cell: ({row}) => (
                    <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[textSearch]}
                        autoEscape={true}
                        textToHighlight={row.original.username}
                    />
                )
            },
            {
                Header: translate(({table}) => table.fullName),
                Cell: ({row}) => (
                    <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[textSearch]}
                        autoEscape={true}
                        textToHighlight={row.original.name}
                    />
                )
            },
            {
                Header: translate(({table}) => table.phoneNumber),
                Cell: ({row}) => (
                    <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[textSearch]}
                        autoEscape={true}
                        textToHighlight={row.original.phone}
                    />
                )
            },
            {
                Header: translate(({table}) => table.role),
                Cell: ({row}) => (
                    row.original.role === '1' && 'Admin' || 
                    row.original.role === '2' && 'Moderator'
                )
            },
            {
                Header: translate(({table}) => table.createDate),
                Cell: ({row}) => formatDate(row.original.createDate)

            },
            {
                Header: translate(({table}) => table.updateDate),
                Cell: ({row}) => (
                    <>
                        <span>{formatDate(row.original.updateDate)}</span>
                        <span className="text-secondary ml-1">{row.original.updatedBy}</span>
                    </>
                )
            },
            {
                id: 'actions',
                Cell: ({row}) => (
                    <div className="d-flex justify-content-center">
                        <Button
                            outlined
                            className="border-0"
                            icon={IconType.FaList}
                            iconColor={Colors.green}
                            variant={ButtonVariants.Light}
                            onClick={() => onEdit(row.original)}
                        />
                        {
                            loggedInAsSuper &&
                            <Button
                                outlined
                                className="border-0 ml-2"
                                icon={IconType.FaRegTrashAlt}
                                iconColor={Colors.red}
                                variant={ButtonVariants.Light}
                                onClick={() => onDelete(row.original.id)}
                            />
                        }
                    </div>
                )
            },
            {
                id: 'expander',
                Cell: ({ row }) =>
                row.canExpand ? (
                    <span {...row.getToggleRowExpandedProps()}>
                        {
                        row.isExpanded ?
                            <Icon color={Colors.green} name={IconType.FaAngleDown} />
                        :
                            <Icon color={Colors.black} name={IconType.FaAngleLeft} />
                        }
                    </span>
                ) : null,
            },
          
        ], [textSearch]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { expanded },
        } = useTable(
        {
            columns,
            data: moderators,
        },
        useExpanded // Use the useExpanded plugin hook
    )

    return (
        <Table {...getTableProps()} bordered hover size="md" responsive="md">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps({
                            className: cell.column.className
                          })}>
                            {cell.render('Cell')}
                        </td>
                    )
                    })}
                </tr>
                )
            })}
            </tbody>
        </Table>
    )
}

export default ModeratorsTable;



