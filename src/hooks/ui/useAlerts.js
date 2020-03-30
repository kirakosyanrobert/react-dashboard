import { createContext, useContext } from 'react';

export const AlertsContext = createContext({
    setNotification: () => null,
    setError: () => null
});

export function useAlerts() {
    return useContext(AlertsContext);
}