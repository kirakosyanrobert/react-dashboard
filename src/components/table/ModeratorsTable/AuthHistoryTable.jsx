import React from 'react';
import { Table } from 'react-bootstrap';

import { useTranslation } from '../../../hooks';

export function AuthHistoryTable ({authHistory}) {
    const translate = useTranslation();
    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>{translate(({table}) => table.sessionStart)}</th>
                <th>{translate(({table}) => table.sessionEnd)}</th>
                <th>{translate(({table}) => table.sessionDuration)}</th>
            </tr>
            </thead>
            <tbody>
                {
                    authHistory.length > 0 &&
                    authHistory.map((history, index) => (
                        <tr key={`history-item=${history.id}`}>
                            <td>{index + 1}</td>
                            <td>{history.start}</td>
                            <td>{history.end}</td>
                            <td>{history.duration}</td>
                        </tr>
                    ))
                }
            </tbody>
         </Table>
    )
}