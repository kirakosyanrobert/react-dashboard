import React, { createContext, useState } from 'react';
import { Alerts } from './Alerts/Alerts';

export function Axios ({children}) {
    const [alerts] = useState([]);

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