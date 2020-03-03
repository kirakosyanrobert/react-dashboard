import React from 'react';
import {Router as ReactRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from '../pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { Route } from '../components/ui/Route';

const history = createBrowserHistory();

export function Router() {

    const Routes = {
        Root: '/',
        Home: '/home',
        Login: '/login'
    }

    return (
        <ReactRouter history={history}>
            <Switch>
                <Route path={Routes.Login} component={LoginPage} />
                <Route guarded={true} path={Routes.Home} component={HomePage} />
                <Route exact path={Routes.Root} component={HomePage} />
            </Switch>
        </ReactRouter>
    )
}