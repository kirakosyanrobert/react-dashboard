import React from 'react';
import { Link } from 'react-router-dom';
//TODO Change to NavLink

import { useNavigation } from '../../hooks';

function Sidebar() {
  const { routes } = useNavigation();

  const Links = [
    {title: 'Home', path: routes.home},
    {title: 'Settings', path: routes.settings}

  ]
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">GMap Dashboard</div>

        <div className="list-group list-group-flush">
          {Links.map((link, index) => (
              <Link
                 key={`nav-link-${index}`}
                 to={link.path}
                 className="list-group-item list-group-item-action bg-light"
              >
                {link.title}
              </Link>
          ))}
        </div>
      </div>
    )
}

export default Sidebar;