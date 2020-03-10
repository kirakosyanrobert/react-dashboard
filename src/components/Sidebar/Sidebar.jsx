import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';
import { useNavigation } from '../../hooks';

function Sidebar() {
  const { routes } = useNavigation();

  const Links = [
    {title: 'Home', path: routes.home},
    {title: 'Moderators', path: routes.moderators},
    {title: 'Organizations', path: routes.organizations},
    {title: 'Settings', path: routes.settings}
  ]

    return (
         <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Gmap Dashboard</div>
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
