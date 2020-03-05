import React from 'react';
import { Router as ReactRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AdminContainer from './AdminContainer/AdminContainer';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SigeUpPage/SigeUpPage';
import { Route } from '../components/ui/Route';

import { useEffectOnce } from '../hooks';
import { StorageKey } from '../consts';

const history = createBrowserHistory();

//TODO Remove test data
const testAdminData = [{email: 'admin@gmail.com', password: '1111'}];

export function Router() {
    useEffectOnce(() => {
        const exists = localStorage.getItem(StorageKey.Users);
        if(!exists) {
            localStorage.setItem(StorageKey.Users, JSON.stringify(testAdminData));
        }
    });

    const Routes = {
        Admin: '/',
        Login: '/login',
        SignUp: '/sign-up'
    }

    return (
        <ReactRouter history={history}>
            <Switch>
                <Route exact path={Routes.Login} component={LoginPage} />
                <Route exact path={Routes.SignUp} component={SignUpPage} />
                <Route guarded path={Routes.Admin} component={AdminContainer} />
            </Switch>
        </ReactRouter>
    )
}