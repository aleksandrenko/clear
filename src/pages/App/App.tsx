import React from 'react';
import {Link, useParams, Outlet, NavLink} from "react-router-dom";

const App = () => {
    let params = useParams();

    return (
        <div>
            <div style={{background: 'gray', padding: 10, color: '#fff'}}>
               app {params.appId}
            </div>
        </div>
    )
}

export default App;
