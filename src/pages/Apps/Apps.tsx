import React, {useState} from 'react';
import {Link, Outlet} from "react-router-dom";

const TEST_APPS = [
    {
        uuid: '3243t3he',
        name: 'alx'
    }
];


const Apps = () => {
    const [apps, setApps] = useState(TEST_APPS);

    return (
        <div>
            <h1>Apps</h1>
            <div>
                <ul>
                    { apps.map((app) => {
                        return (
                            <li key={app.uuid}>
                                <Link to={`${app.name}`}>{app.name}</Link>
                            </li>
                        )
                    }) }
                </ul>

            </div>
            <div>
                <h2>Create</h2>
                <label><span>Name: </span><input type="text"/></label>
                <button>Create</button>
            </div>
        </div>
    )
}

export default Apps;
