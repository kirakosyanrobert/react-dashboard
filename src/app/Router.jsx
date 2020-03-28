import React from 'react';
import { Router as ReactRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AdminContainer from './AdminContainer/AdminContainer';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { Route } from '../components/ui/Route';

const history = createBrowserHistory();


export function Router() {
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