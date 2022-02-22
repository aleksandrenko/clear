import React, {useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import {useAtom} from "jotai";
import {appsAtom} from "../../state/apps";


const Apps = () => {
    const [apps, setApps] = useAtom(appsAtom);

    return (
        <div>
            <h1>Apps</h1>
            <div>
                <ul>
                    { apps.map((app) => {
                        return (
                            <li key={app.uuid}>
                                <Link to={`${app.uuid}`}>{app.uuid}</Link>
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
