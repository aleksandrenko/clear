import React from 'react';
import {Link, useParams, Outlet, NavLink} from "react-router-dom";
import {ROUTES} from "../../Router";

import './style.css';

const AppWrapper = () => {
    let params = useParams();

    return (
        <div className="app">
            <div style={{background: 'gray', padding: 10, color: '#fff'}}>
                <Link to={`/${ROUTES.APPS}`}>Clear</Link>
                <b>{params.appId}</b>

                <NavLink to={ROUTES.PAGES}>Pages</NavLink>
                <NavLink to={ROUTES.DATA}>Data</NavLink>
                <NavLink to={ROUTES.ASSETS}>Assets</NavLink>

                undo / redo

                <input placeholder="example command: Add input in #modal1" />

                version: 0.01
                <button>save</button>
                <button>⋮</button>
                (user)

            </div>
            <Outlet />
        </div>
    )
}

export default AppWrapper;
