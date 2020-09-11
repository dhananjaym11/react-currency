import React from 'react';

import './Loader.scss';

function Loader({ isShow }) {
    return (
        <div
            className="loader"
            style={{ display: isShow ? 'block' : 'none' }}>
            <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader;