import React from 'react';

import './Loader.css';

class Loader extends React.Component {
    render() {
        return (
            <div
                className="loader"
                style={{ display: 'none' }}>
                <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}

export default Loader;