import React from 'react';
import { Route as ReactRoute, Redirect } from 'react-router-dom';

import { StorageKey } from '../../../consts';
import { useNavigation } from '../../../hooks';

export function Route({path, component, guarded = false, ...rest}) {
    const { routes } = useNavigation();
    const isLogged = localStorage.getItem(StorageKey.Token);

    if(guarded) {
        if(!isLogged) {
            return <Redirect to={routes.login} />
        }

        return <ReactRoute path={path} component={component} {...rest} />
    }

    return <ReactRoute path={path} component={component} {...rest} />
}