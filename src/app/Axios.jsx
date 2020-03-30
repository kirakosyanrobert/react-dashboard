import React, { createContext, useState } from 'react';
import { Alerts } from './Alerts/Alerts';

export function Axios ({children}) {
    const [alerts, setAlerts] = useState([]);

    const AxiosContext = createContext({

    });


    return (
        <AxiosContext.Provider>
            <Alerts errors={alerts}>
                {children}
            </Alerts>
        </AxiosContext.Provider>
    )
}