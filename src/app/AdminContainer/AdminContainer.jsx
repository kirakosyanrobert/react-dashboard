import React from 'react';

import './AdminContainer.scss';
import { Route } from '../../components/ui/Route';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomePage from '../../pages/HomePage/HomePage';
import ModeratorsPage from '../../pages/ModeratorsPage/ModeratorsPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import OrganizationsPage from '../../pages/OrganizationsPage/OrganizationsPage';
import CreateOrganizationPage from '../../pages/CreateOrganizationPage/CreateOrganizationPage';
import OrganizationDetailsPage from '../../pages/OrganizationDetailsPage/OrganizationDetailsPage';



function AdminContainer () {
    
    const AdminRoutes = {
        Root: '/',
        Home: '/home',
        Moderators: '/moderators',
        Organizations: '/organizations',
        OrganizationDetails: '/organizations/:id',
        CreateOrganization: '/create-organization',
        Settings: '/settings',
    }
    
    return (
        <div id="wrapper" className="d-flex">
            <Sidebar />
            <div id="main-wrapper">
                <Route exact guarded path={AdminRoutes.Home} component={HomePage} />
                <Route exact guarded path={AdminRoutes.Moderators} component={ModeratorsPage} />
                <Route exact guarded path={AdminRoutes.Organizations} component={OrganizationsPage} />
                <Route 
                    exact 
                    guarded 
                    path={AdminRoutes.OrganizationDetails} 
                    component={OrganizationDetailsPage} 
                />
                <Route
                    exact
                    guarded
                    path={AdminRoutes.CreateOrganization}
                    component={CreateOrganizationPage}
                />
                <Route exact guarded path={AdminRoutes.Settings} component={SettingsPage} />
                <Route exact guarded path={AdminRoutes.Root} component={HomePage} />
            </div>
        </div>
    )
} 

export default AdminContainer;