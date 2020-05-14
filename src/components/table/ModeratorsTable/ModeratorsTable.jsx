import React, { useState, Fragment, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import Highlighter from "react-highlight-words";


import { Button, ButtonVariants, ButtonSizes } from '../../ui/Button';
import {useTranslation, useLoggedInAsSuper, useFormatDate} from '../../../hooks';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import Modal from '../../ui/Modal/Modal';
import { AuthHistoryTable } from './AuthHistoryTable';
import { Pagination } from '../../ui/Pagination/Pagination';

function ModeratorsTable ({
    usersToShow,
    onEdit,
    onDelete,
    textSearch
}) {
    const translate = useTranslation();
    const loggedInAsSuper = useLoggedInAsSuper();
    const formatDate = useFormatDate();

    const [admins, setAdmins] = useState(usersToShow);
    const [showAuthHistoryModal, setShowAuthHistoryModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setAdmins(usersToShow);
    }, [usersToShow]);


    function toggleAdminRow(adminIndex) {
        const tempAdmins = [...admins];
        tempAdmins[adminIndex].opened = !tempAdmins[adminIndex].opened;
        setAdmins(tempAdmins)
    }

    function handleToggleAuthHistoryModal(user) {
        setSelectedUser(user);
    }

    useEffect(() => {
        if(selectedUser) {
            setShowAuthHistoryModal(true);
        }
    }, [selectedUser]);

    useEffect(() => {
        if(!showAuthHistoryModal) {
            setSelectedUser(null);
        }
    }, [showAuthHistoryModal])



   

    function handleToPrev(pageToShow) {
        setCurrentPage(pageToShow);
    }

    function handleToNext(pageToShow) {
        setCurrentPage(pageToShow);
    }

    useEffect(() => {
        setAdmins(
            usersToShow.slice( (currentPage - 1) * perPage, currentPage * perPage )
        )
    }, [perPage, currentPage])

  
    return (
        <>
        <Modal 
            title={translate(({modalTitles}) => modalTitles.userActivity)}
            open={showAuthHistoryModal}
            onClose={() => setShowAuthHistoryModal(false)}
        >
            <Modal.Body>
                {
                    selectedUser &&
                    <AuthHistoryTable authHistory={selectedUser.authHistory} />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    title={translate(({buttons}) => buttons.close)}
                    onClick={() => setShowAuthHistoryModal(false)}
                />
            </Modal.Footer>
        </Modal>

        <div className="d-flex">
            <Form.Group>
                <Form.Control 
                    as="select"
                    value={perPage}
                    onChange={(e) => setPerPage(+e.target.value)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </Form.Control>
            </Form.Group>

            <Pagination
                total={usersToShow.length}
                currentPage={currentPage}
                perPage={perPage}
                onPrev={handleToPrev}
                onNext={handleToNext}
            />
        </div>

       

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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {admins.map((admin, index) => (
                <Fragment key={`table-item-${admin.id}__${admin.createDate}`}>
                    <tr key={`table-item-${admin.id}__${index}`}>
                        <td
                            className={`text-center ${admin.status === 'online' ? 'bg-success text-light' : ''}`}
                        >
                            {index + 1}
                        </td>
                        <td>
                            <Highlighter
                                highlightClassName="search-highlight"
                                searchWords={[textSearch]}
                                autoEscape={true}
                                textToHighlight={admin.username}
                            />
                        </td>
                        <td>
                            <Highlighter
                                highlightClassName="search-highlight"
                                searchWords={[textSearch]}
                                autoEscape={true}
                                textToHighlight={admin.name}
                            />
                        </td>
                        <td>
                            <Highlighter
                                highlightClassName="search-highlight"
                                searchWords={[textSearch]}
                                autoEscape={true}
                                textToHighlight={admin.phone}
                            />
                        </td>
                        <td>
                            {
                                admin.role === '1' && 'Admin' ||
                                admin.role === '2' && 'Moderator'
                            }
                        </td>

                        <td>
                            {formatDate(admin.createDate)}
                        </td>

                        <td>
                            <span>{formatDate(admin.updateDate)}</span>
                            <span className="text-secondary ml-1">{admin.updatedBy}</span>
                        </td>

                        <td className="text-center">

                            <div className="d-flex">
                                <Button
                                    outlined
                                    className="border-0"
                                    icon={IconType.FaList}
                                    iconColor={Colors.green}
                                    variant={ButtonVariants.Light}
                                    size={ButtonSizes.Small}
                                    onClick={() => onEdit(admin)}
                                />

                                <Button
                                    outlined
                                    className="border-0"
                                    icon={IconType.FaRegEye}
                                    iconColor={Colors.black}
                                    variant={ButtonVariants.Light}
                                    size={ButtonSizes.Small}
                                    onClick={() => handleToggleAuthHistoryModal(admin)}
                                />


                                {
                                    loggedInAsSuper &&
                                    <Button
                                        outlined
                                        className="border-0 ml-2"
                                        icon={IconType.FaRegTrashAlt}
                                        iconColor={Colors.red}
                                        variant={ButtonVariants.Light}
                                        size={ButtonSizes.Small}
                                        onClick={() => onDelete(admin.id)}
                                    />
                                }
                            </div>

                        </td>
                        <td>
                            <Button
                                icon={admin.opened ? IconType.FaAngleDown : IconType.FaAngleLeft}
                                iconColor={admin.opened ? Colors.green : Colors.black}
                                variant={ButtonVariants.Light}
                                size={ButtonSizes.Small}
                                onClick={() => toggleAdminRow(index)}
                            />
                        </td>
                    </tr>
                    {admin.opened && admin.subRows.map((moderator, i) => (
                    <Fragment key={`table-moderator-item-${moderator.id}__${i}`}>
                        <tr
                            style={{backgroundColor: '#f5f5f5'}}
                        >
                            <td
                                className={`text-center ${moderator.status === 'online' ? 'bg-success text-light' : ''}`}
                            >
                                {i + 1}
                            </td>
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
                                <div className="d-flex">
                                    <Button
                                        outlined
                                        className="border-0"
                                        icon={IconType.FaList}
                                        iconColor={Colors.green}
                                        variant={ButtonVariants.Light}
                                        size={ButtonSizes.Small}
                                        onClick={() => onEdit(moderator)}
                                    />

                                    <Button
                                        outlined
                                        className="border-0"
                                        icon={IconType.FaRegEye}
                                        iconColor={Colors.black}
                                        variant={ButtonVariants.Light}
                                        size={ButtonSizes.Small}
                                        onClick={() => handleToggleAuthHistoryModal(moderator)}
                                    />
                                    {
                                        (loggedInAsSuper || (!loggedInAsSuper && moderator.role === '2')) &&
                                        <Button
                                            outlined
                                            className="border-0 ml-2"
                                            icon={IconType.FaRegTrashAlt}
                                            iconColor={Colors.red}
                                            variant={ButtonVariants.Light}
                                            size={ButtonSizes.Small}
                                            onClick={() => onDelete(moderator.id)}
                                        />
                                    }
                                </div>
                            </td>
                            <td></td>
                        </tr>
                        {
                            i === (admin.subRows.length - 1) &&
                            <tr style={{height: '2rem'}} />
                        }
                        
                    </Fragment>
                    ))}
                    
                </Fragment>
                ))}
            </tbody>
        </Table>
        </>
    )
}

export default ModeratorsTable;








// import React from 'react';
// import { Table } from 'react-bootstrap';
// import { useTable, useExpanded } from 'react-table'

// import { Button, ButtonVariants } from '../../ui/Button';
// import {useTranslation, useLoggedInAsSuper, useLanguage} from '../../../hooks';
// import { IconType } from '../../../consts';
// import { Colors } from '../../../environment';
// import Highlighter from "react-highlight-words";
// import * as moment from "moment";
// import { Icon } from '../../ui/Icon';

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


//     const columns = React.useMemo(
//         () => [
//             {
//                 Header: '#',
//                 Cell: ({ row }) => (
//                     <span className={row.original.status === 'online' ? 'text-success' : 'text-dark'}>
//                         {+row.id + 1}
//                     </span>
//                 )
//             },
            
//             {
//                 Header: translate(({table}) => table.login),
//                 Cell: ({row}) => (
//                     <Highlighter
//                         highlightClassName="search-highlight"
//                         searchWords={[textSearch]}
//                         autoEscape={true}
//                         textToHighlight={row.original.username}
//                     />
//                 )
//             },
//             {
//                 Header: translate(({table}) => table.fullName),
//                 Cell: ({row}) => (
//                     <Highlighter
//                         highlightClassName="search-highlight"
//                         searchWords={[textSearch]}
//                         autoEscape={true}
//                         textToHighlight={row.original.name}
//                     />
//                 )
//             },
//             {
//                 Header: translate(({table}) => table.phoneNumber),
//                 Cell: ({row}) => (
//                     <Highlighter
//                         highlightClassName="search-highlight"
//                         searchWords={[textSearch]}
//                         autoEscape={true}
//                         textToHighlight={row.original.phone}
//                     />
//                 )
//             },
//             {
//                 Header: translate(({table}) => table.role),
//                 Cell: ({row}) => (
//                     row.original.role === '1' && 'Admin' || 
//                     row.original.role === '2' && 'Moderator'
//                 )
//             },
//             {
//                 Header: translate(({table}) => table.createDate),
//                 Cell: ({row}) => formatDate(row.original.createDate)

//             },
//             {
//                 Header: translate(({table}) => table.updateDate),
//                 Cell: ({row}) => (
//                     <>
//                         <span>{formatDate(row.original.updateDate)}</span>
//                         <span className="text-secondary ml-1">{row.original.updatedBy}</span>
//                     </>
//                 )
//             },
//             {
//                 id: 'actions',
//                 Cell: ({row}) => (
//                     <div className="d-flex justify-content-center">
//                         <Button
//                             outlined
//                             className="border-0"
//                             icon={IconType.FaList}
//                             iconColor={Colors.green}
//                             variant={ButtonVariants.Light}
//                             onClick={() => onEdit(row.original)}
//                         />
//                         {
//                             loggedInAsSuper &&
//                             <Button
//                                 outlined
//                                 className="border-0 ml-2"
//                                 icon={IconType.FaRegTrashAlt}
//                                 iconColor={Colors.red}
//                                 variant={ButtonVariants.Light}
//                                 onClick={() => onDelete(row.original.id)}
//                             />
//                         }
//                     </div>
//                 )
//             },
//             {
//                 id: 'expander',
//                 Cell: ({ row }) =>
//                 row.canExpand ? (
//                     <span {...row.getToggleRowExpandedProps()}>
//                         {
//                         row.isExpanded ?
//                             <Icon color={Colors.green} name={IconType.FaAngleDown} />
//                         :
//                             <Icon color={Colors.black} name={IconType.FaAngleLeft} />
//                         }
//                     </span>
//                 ) : null,
//             },
          
//         ], [textSearch]);

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//         state: { expanded },
//         } = useTable(
//         {
//             columns,
//             data: moderators,
//         },
//         useExpanded // Use the useExpanded plugin hook
//     )

//     return (
//         <Table {...getTableProps()} bordered hover size="md" responsive="md">
//             <thead>
//             {headerGroups.map(headerGroup => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 ))}
//                 </tr>
//             ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//                 prepareRow(row)
//                 return (
//                 <tr {...row.getRowProps()}>
//                     {row.cells.map(cell => {
//                     return (
//                         <td {...cell.getCellProps({
//                             className: cell.column.className
//                           })}>
//                             {cell.render('Cell')}
//                         </td>
//                     )
//                     })}
//                 </tr>
//                 )
//             })}
//             </tbody>
//         </Table>
//     )
// }

// export default ModeratorsTable;



