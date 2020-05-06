import React from 'react';
import { Navbar, Dropdown, SplitButton, Nav, } from 'react-bootstrap';

import { StorageKey, IconType } from '../../consts';
import { useTranslation, useNavigation } from '../../hooks';
import { Button, ButtonSizes, ButtonVariants } from '../ui/Button';
import { connect } from 'react-redux';
import { toggleSidebarAction } from '../../store/toggleSidebar/toggleSidebarAction';

function PageTopBar ({toggleSidebar}) {
    const loggedInUser = JSON.parse(localStorage.getItem(StorageKey.LoggedInUser)) || {};

    const { navigate, routes } = useNavigation();
    const translate = useTranslation();
    
    function handleLogOut () {
      localStorage.removeItem(StorageKey.Token);
      localStorage.removeItem(StorageKey.LoggedInUser);
      navigate(routes.login);
    }
    
    return (
        <Navbar expand="lg" variant="light" bg="light">
            <Button
               icon={IconType.FaBars}
               onClick={toggleSidebar}
               size={ButtonSizes.Small}
               variant={ButtonVariants.Success}
            />

            {/* <Navbar.Toggle aria-controls="admin-navbar-nav" /> */}

            {/* <Navbar.Collapse id="admin-navbar-nav"> */}
                <Nav className="ml-auto mt-2 mt-lg-0">
                    <Nav.Item >
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