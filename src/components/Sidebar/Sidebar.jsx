import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';
import { useNavigation } from '../../hooks';
import { useTranslation } from '../../hooks';
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { StorageKey } from '../../consts';

function Sidebar() {
    const { routes } = useNavigation();
    const translate = useTranslation();
    const activeUser = JSON.parse(localStorage.getItem(StorageKey.LoggedInUser));
    let Links = [];

    const AdminLinks = [
      // {title: translate(({navigation}) => navigation.home), path: routes.home},
      {title: translate(({navigation}) => navigation.administrators), path: routes.moderators},
      {title: translate(({navigation}) => navigation.organizations), path: routes.organizations},
      {title: translate(({navigation}) => navigation.settings), path: routes.settings}
    ];

    const ModeratorLinks = [
      // {title: translate(({navigation}) => navigation.home), path: routes.home},
      {title: translate(({navigation}) => navigation.organizations), path: routes.organizations},
      {title: translate(({navigation}) => navigation.settings), path: routes.settings}
    ];

    if(activeUser) {
      Links = activeUser.role === '2' ? ModeratorLinks : AdminLinks;
    }


    return (
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="d-flex justify-content-between sidebar-heading">
              Gmap
              <LanguageSwitcher />
            </div>
            <div className="list-group list-group-flush">
              {Links.map((link, index) => (
                <NavLink
                  key={`nav-link-${index}`}
                  to={link.path}
                  activeClassName="list-group-item-success"
                  className="list-group-item list-group-item-action"
                >
                    {link.title}
                </NavLink>
              ))}
            </div>
        </div>
    )
}

export default Sidebar;
