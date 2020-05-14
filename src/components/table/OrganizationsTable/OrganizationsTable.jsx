import React from 'react';
import { Table, Form, Pagination } from 'react-bootstrap';

import { useTable, usePagination } from 'react-table'

import { Button, ButtonVariants } from '../../ui/Button';
import { useTranslation, useLanguage, useFormatDate } from '../../../hooks';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';

// function OrganizationsTable ({
//     organizations,
//     onDetails,
//     onDelete,
// }) {

//     const translate = useTranslation();

//     return (
//         <section>
//             <Table bordered hover size="sm" responsive="md">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>{translate(({table}) => table.title)}</th>
//                         <th>{translate(({table}) => table.details)}</th>
//                         <th>{translate(({table}) => table.delete)}</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {organizations.map((organization, index) => (
//                         <tr key={`organization-item-${index}`}>
//                             <td>{index + 1}</td>
//                             <td>{organization.properties.title.en}</td>
//                             <td>
//                                 <Button
//                                     title={translate(({buttons}) => buttons.details)}
//                                     outlined
//                                     variant={ButtonVariants.Primary}
//                                     onClick={() => onDetails(organization.properties.id)}
//                                 />
//                             </td>
//                             <td>
//                                 <Button
//                                     icon={IconType.FaRegTrashAlt}
//                                     variant={ButtonVariants.Danger}
//                                     onClick={() => onDelete(organization.properties.id)}
//                                 />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </section>
//     )
// }



function OrganizationsTable ({
    organizations,
    onDetails,
    onDelete,
}) {
    const translate = useTranslation();
    const [language] = useLanguage();
    const formatDate = useFormatDate();


    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                className: 'text-center',
                Cell: ({ row }) => (
                    +row.id + 1
                )
            },
          {
            Header: translate(({table}) => table.title),
            accessor: `properties.title[${language}]`,
          },
          {
            Header: translate(({table}) => table.days),
            Cell: ({ row }) => (
                365
            )
          },
          {
            Header: translate(({table}) => table.start),
            Cell: ({ row }) => (
                formatDate(row.original.properties.createDate)
            )
          },
          {
            Header: translate(({table}) => table.end),
            Cell: ({ row }) => (
                formatDate(row.original.properties.lastUpdateDate)
            )
          },
          {
            id: 'org-actions',
            Cell: ({row}) => (
                <div className="d-flex justify-content-center">
                    <Button
                        outlined
                        className="border-0"
                        icon={IconType.FaList}
                        iconColor={Colors.green}
                        variant={ButtonVariants.Light}
                        onClick={() => onDetails(row.original.properties.id)}
                    />

                    <Button
                        outlined
                        className="border-0 ml-2"
                        icon={IconType.FaRegTrashAlt}
                        iconColor={Colors.red}
                        variant={ButtonVariants.Light}
                        onClick={() => onDelete(row.original.properties.id)}
                    />
                </div>
            )
          },
        ], [])
        
                             
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,

        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
      } = useTable(
        {
          columns,
          data: organizations,
          initialState: { pageIndex: 0 },
        },
        usePagination
      );


    return (
        <section className="mb-4">
            <Pagination>
                <Form.Group>
                    <Form.Control
                        as="select"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <span>
                    Page{' '}
                    <strong>
                    {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>

                <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage}  />
               
            </Pagination>
            
            <Table bordered hover size="sm" responsive="md" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps({
                                className: column.className
                            })}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
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
        </section>
    )
}

export default OrganizationsTable;

       
  