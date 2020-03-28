import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';
import { useNavigation } from '../../hooks';
import { useTranslation } from '../../hooks';
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

function Sidebar() {
  const { routes } = useNavigation();
  const translate = useTranslation();

  const Links = [
    {title: translate(({navigation}) => navigation.home), path: routes.home},
    {title: translate(({navigation}) => navigation.moderators), path: routes.moderators},
    {title: translate(({navigation}) => navigation.organizations), path: routes.organizations},
    {title: translate(({navigation}) => navigation.settings), path: routes.settings}
  ]

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
