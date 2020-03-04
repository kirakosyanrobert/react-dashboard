import React from 'react';
import { connect } from 'react-redux';

import Sidebar from '../components/Sidebar/Sidebar';

function Wrapper (props) {
    const {toggled, children} = props;

    return (
        <div id="wrapper" className={`d-flex ${toggled ? 'toggled' : ''}`}>
            <Sidebar />
            {children}
        </div>
    )
}

const mapStateToProps = state => ({
    toggled: state.toggleSidebar.open
})

export default connect(mapStateToProps, null)(Wrapper)