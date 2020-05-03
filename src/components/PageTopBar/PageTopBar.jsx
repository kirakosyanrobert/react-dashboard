import React from 'react';
import { Navbar, Container, Dropdown, SplitButton } from 'react-bootstrap';

import { StorageKey } from '../../consts';
import { useTranslation, useNavigation } from '../../hooks';

function PageTopBar () {
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
            <Container className="d-flex justify-content-end">
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
            </Container>
        </Navbar>
    )
}


export default PageTopBar;