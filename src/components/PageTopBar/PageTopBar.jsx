import React from 'react';
import { Navbar, Dropdown, SplitButton, Nav, } from 'react-bootstrap';
import './PageTopBar.scss'

import { StorageKey, IconType } from '../../consts';
import { useTranslation, useNavigation, useRequest, useAlerts } from '../../hooks';
import { Button, ButtonSizes, ButtonVariants } from '../ui/Button';
import { connect } from 'react-redux';
import { toggleSidebarAction } from '../../store/toggleSidebar/toggleSidebarAction';
import { Colors } from '../../environment';

function PageTopBar ({toggleSidebar}) {
    const loggedInUser = JSON.parse(localStorage.getItem(StorageKey.LoggedInUser)) || {};

    const { navigate, routes } = useNavigation();
    const { setError } = useAlerts();
    const translate = useTranslation();
    const { request: logOut} = useRequest();
    
    async function handleLogOut () {
        try {
            const data = await logOut(`/auth/admin-signout/${loggedInUser.token}`);
            if(data === 'Signed out') {
                localStorage.removeItem(StorageKey.Token);
                localStorage.removeItem(StorageKey.LoggedInUser);
                navigate(routes.login);
            }
        } catch(e) {
            setError({message: e.message});
        }
    }
    
    return (
        <Navbar expand="lg" variant="light" bg="light">
            <Button
               icon={IconType.FaBars}
               iconColor={Colors.green}
               onClick={toggleSidebar}
               size={ButtonSizes.Small}
               variant={ButtonVariants.Light}
            />

            {/* <Navbar.Toggle aria-controls="admin-navbar-nav" /> */}

            {/* <Navbar.Collapse id="admin-navbar-nav"> */}

                <Nav className="ml-auto mt-2 mt-lg-0">

                    <div className="mr-5 user-info">
                        <span className="mr-3">{loggedInUser.name || ''}</span>
                        <span>{loggedInUser.phone || ''}</span>
                    </div>

                    <Nav.Item>
                        <SplitButton
                            alignRight
                            variant="info"
                            title={loggedInUser.username || ''}
                            size="sm"
                            >
                            <Dropdown.Item
                                onClick={handleLogOut}
                            >
                                {translate(({buttons}) => buttons.logOut)}
                            </Dropdown.Item>
                        </SplitButton>
                    </Nav.Item>
                </Nav>
            {/* </Navbar.Collapse> */}
        </Navbar>
    )
}


const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(toggleSidebarAction())
})



export default connect(null, mapDispatchToProps)(PageTopBar);