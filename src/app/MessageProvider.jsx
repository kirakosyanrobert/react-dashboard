import React, { useState } from 'react';
import { Alerts } from './Alerts/Alerts';

export function MessageProvider ({children}) {
    const [alerts] = useState([]);



    return (
            <Alerts errors={alerts}>
                {children}
            </Alerts>
    )
}