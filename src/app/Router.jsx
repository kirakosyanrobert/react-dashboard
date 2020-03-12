import React from 'react';
import { Router as ReactRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AdminContainer from './AdminContainer/AdminContainer';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { Route } from '../components/ui/Route';

import { useEffectOnce } from '../hooks';
import { StorageKey } from '../consts';


const history = createBrowserHistory();

//TODO Remove test data
const superAdminData = [{email: 'admin@gmail.com', password: '1111'}];
const ModeratorsData = require('../MockData.json');


export function Router() {
    useEffectOnce(() => {
        const exists = localStorage.getItem(StorageKey.Super);
        const moderatorsExists = localStorage.getItem(StorageKey.Moderators);

        if(!exists || !moderatorsExists) {
            localStorage.setItem(StorageKey.Super, JSON.stringify(superAdminData));
            localStorage.setItem(StorageKey.Moderators, JSON.stringify(ModeratorsData.moderators));
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