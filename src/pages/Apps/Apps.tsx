import React, {useState} from 'react';
import {Link, Outlet, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {appsAtom} from "../../state/apps";


const Apps = () => {
    const params = useParams();

    const [apps, setApps] = useAtom<any[]>(appsAtom);
    const [appName, setAppName] = useState<string | null>(null);

    const createApp = () => {
        const newApp = {
            uuid: appName,
            name: appName
        }

        setApps([...apps, newApp]);
        setAppName(null);
    }

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
                <label><span>Name: </span><input value={appName} onChange={(e) => setAppName(e.target.value)} type="text"/></label>
                <button onClick={ () => createApp() }>Create</button>
            </div>
        </div>
    )
}

export default Apps;
