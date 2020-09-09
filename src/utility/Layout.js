import React from 'react';

import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';

const Layout = (props) => (
    <>
        <Header />

        <div className="main">
            <div className="container">
                {props.children}
            </div>
        </div>

        <Loader />
    </>
);

export default Layout;