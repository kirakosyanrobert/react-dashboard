import React from 'react';
import {Router as ReactRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from '../pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { Route } from '../components/ui/Route';

import Wrapper from '../containers/Wrapper';
import PageContent from '../containers/PageContent';
import RouterContainer from '../containers/RouterContainer';
import SettingsPage from '../pages/SettingsPage/SettingsPage';


const history = createBrowserHistory();

export function Router() {

    const Routes = {
        Root: '/',
        Home: '/home',
        Settings: '/settings',
        Login: '/login'
    }

    

    return (
        <ReactRouter history={history}>
           <Wrapper>
              <PageContent>
                     <RouterContainer>
                        <Switch>
                            <Route path={Routes.Login} component={LoginPage} />
                            <Route guarded={true} path={Routes.Home} component={HomePage} />
                            <Route guarded={true} path={Routes.Settings} component={SettingsPage} />
                            <Route exact path={Routes.Root} component={HomePage} />
                        </Switch>
                    </RouterContainer>
              </PageContent>
            </Wrapper>
        </ReactRouter>
    )
}