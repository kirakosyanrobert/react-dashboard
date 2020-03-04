import React from 'react';
import Navigation from '../components/Navigation/Navigation';

function PageContent({children}) {
    return (
        <div id="page-content-wrapper">
            <Navigation />
            {children}
        </div>
    )
}

export default PageContent;
