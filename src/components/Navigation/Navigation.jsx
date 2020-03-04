import React from 'react';
import { connect } from 'react-redux';

import { toggleSidebarAction } from '../../store/toggleSidebar/toggleSidebarAction';
import { Button } from '../../components/ui/Button';


function Navigation(props) {
    const { sidebarOpen, toggleSidebar } = props;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <Button
                title={sidebarOpen ? '>' : '<'}
                outlined
                onClick={toggleSidebar}
            />
              
        </nav>
    )
}

const mapStateToProps = state => ({
    sidebarOpen: state.toggleSidebar.open 
})

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(toggleSidebarAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);