import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

import './Hub.scss';
import { AlertType } from '../../consts';


export function Hub ({items, filterItems}) {
    
    useEffect(() => {
        if(items.length > 0) {
            items.forEach(item => {
                setTimeout(() => filterItems(item.uuid), item.timeout)
            });
        }
    }, [items]);

    return (
        <div className="hub-container">
            { 
                items.length > 0 &&
                items.map(item => (
                    <Alert
                        key={item.uuid}
                        style={{width: '20rem'}}
                        variant={item.type === AlertType.Error ? 'danger' : 'primary'} 
                        onClose={() => filterItems(item.uuid)} 
                        dismissible
                    >
                        {item.title && <Alert.Heading>{item.title}</Alert.Heading>}
                        <p>{item.message}</p>
                    </Alert>
                ))
            }
        </div>
       
    )
}