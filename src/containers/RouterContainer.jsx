import React from 'react';

function RouterContainer({children}) {
    return (
        <div className="container-fluid">
            {children}
        </div>
    )
}

export default RouterContainer;