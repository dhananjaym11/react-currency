import React from 'react';
import { Link } from "react-router-dom";

import './Header.scss';

const Header = () => (
    <header className="app-header">
        <div className="container">
            <Link to="/" className="app-logo">
                <span>Logo</span>
            </Link>

            <div className="float-right">
                <ul className="header-links clearfix">
                    <li>
                        <Link to="/">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/conversions">
                            <span>Conversions</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/chart">
                            <span>Chart</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
);

export default Header;