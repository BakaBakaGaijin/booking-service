import {Link, useLocation} from "react-router-dom";
import React from "react";

import './Nav.css';
import {useSelector} from "react-redux";
import {selectIsOfficeManager} from "../Auth/authSlice";

export const Nav = () => {
    const isOfficeManager = useSelector(selectIsOfficeManager);
    let location = useLocation();

    return (
        <nav className={"navbar"}>
            <Link
                to={"/rooms"}
                className={`navbar-link ${location.pathname === '/rooms' && 'active'}`}>
                Все комнаты
            </Link>
            {
                isOfficeManager && <Link
                    to={"/acceptRoom"}
                    className={`navbar-link ${location.pathname === '/acceptRoom' && 'active'}`}
                >
                    Одобрить комнаты
                </Link>
            }
        </nav>
    );
}