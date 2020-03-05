import React from 'react';
import './AdminContainer.scss'
import { Route } from '../../components/ui/Route';
import Sidebar from '../../components/Sidebar/Sidebar'
import HomePage from '../../pages/HomePage/HomePage'
import SettingsPage from '../../pages/SettingsPage/SettingsPage'


function AdminContainer () {
    
    const AdminRoutes = {
        Root: '/',
        Home: '/home',
        Settings: '/settings',
    }
    return (
        <div id="wrapper" className="d-flex">
            <Sidebar />
            <div id="main-wrapper">
                <Route exact guarded path={AdminRoutes.Home} component={HomePage} />
                <Route exact guarded path={AdminRoutes.Settings} component={SettingsPage} />
                <Route exact guarded path={AdminRoutes.Root} component={HomePage} />
            </div>
        </div>
    )
} 

export default AdminContainer;