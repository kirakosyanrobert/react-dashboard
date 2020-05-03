import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { AlertsContext } from '../../hooks/ui/useAlerts';
import { AlertType } from '../../consts';
import { Hub } from './Hub';

export function Alerts ({errors, children}) {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(errors);
    }, [errors]);

    function setAlert(type, {message, title, timeout}) {
        setItems(state => [...state, { uuid: uuid(), type, message, title, timeout: timeout || 3000 }]);
    };

    const filterItems = useCallback(
        (uuid) => setItems(items => items.filter(item => item.uuid !== uuid)),
        []
    );


    return (
        <>
            <Hub items={items} filterItems={filterItems} />
            <AlertsContext.Provider
                value={{
                    setNotification: (props) => setAlert(AlertType.Notification, props),
                    setError: (props) => setAlert(AlertType.Error, props)
                }}
            >
                {children}
            </AlertsContext.Provider>
        </>
    )
}