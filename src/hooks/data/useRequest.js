import {useState, useCallback} from 'react';
import { StorageKey } from '../../consts';

const API_URL = 'https://api.gmap.gr';
// const API_URL = 'https://api-dev.gmap.gr';

export function useRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const request = useCallback( async (endpoint, method = 'GET', body = null, additionalHeaders = {}) => {
        const AUTH_TOKEN = localStorage.getItem(StorageKey.Token) || '';
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}${endpoint}`, 
            {
                method,
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'token': AUTH_TOKEN,
                    ...additionalHeaders
                }
            });

            const data = await response.json();

            // if(!response.ok) {
            //     throw new Error(data.message || 'Errors on server')
            // }
            
            if(!data.success) {
                throw new Error(data.message || 'Errors on server')
            }


            setLoading(false);
            return data.data;

        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;

        }

    }, [])

    return { loading, request, error }

};