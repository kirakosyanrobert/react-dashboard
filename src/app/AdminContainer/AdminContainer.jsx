import React from 'react';

// import './AdminContainer.scss';
import { Route } from '../../components/ui/Route';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomePage from '../../pages/HomePage/HomePage';
import ModeratorsPage from '../../pages/ModeratorsPage/ModeratorsPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import OrganizationsPage from '../../pages/OrganizationsPage/OrganizationsPage';
import CreateOrganizationPage from '../../pages/CreateOrganizationPage/CreateOrganizationPage';
import OrganizationDetailsPage from '../../pages/OrganizationDetailsPage/OrganizationDetailsPage';
import PageTopBar from '../../components/PageTopBar/PageTopBar';
import { connect } from 'react-redux';



function AdminContainer ({sidebarIsOpen}) {
    
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
        <div id="wrapper" className={`d-flex ${sidebarIsOpen ? '' : 'toggled'}`}>
            <Sidebar />

            <div id="page-content-wrapper">
                <PageTopBar />
                <div className="container-fluid">
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
        </div>
    )
} 

const mapStateToProps = state => ({
    sidebarIsOpen: state.toggleSidebar.open
})

export default connect(mapStateToProps, null)(AdminContainer);