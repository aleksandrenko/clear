import React from 'react';
import {Link, useParams, Outlet, NavLink} from "react-router-dom";
import {ROUTES} from "../../Router";

const App = () => {
    let params = useParams();

    return (
        <div>
            <div style={{background: 'gray', padding: 10, color: '#fff'}}>
                <Link to={`/${ROUTES.APPS}`}>Clear</Link>
                <b>{params.pageId}</b>

                <NavLink to="">Pages</NavLink>
                <NavLink to={ROUTES.DATA}>Data</NavLink>
                <NavLink to={ROUTES.ASSETS}>Assets</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default App;
