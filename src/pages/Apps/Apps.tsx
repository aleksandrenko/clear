import React, {useState} from 'react';
import {Link, Outlet, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {appsAtom} from "../../state/apps";
import { Text } from "@fluentui/react"



const Apps = () => {
    const params = useParams();

    const [apps, setApps] = useAtom<any[]>(appsAtom);
    const [appName, setAppName] = useState<string>();

    const createApp = () => {
        const newApp = {
            uuid: appName,
            name: appName
        }

        // @ts-ignore
        setApps([...apps, newApp]);
        setAppName(undefined);
    }

    return (
        <div>
            <Text variant="xxLarge" nowrap>Clear Applications</Text>
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
                <Text variant="large" nowrap block>Create:</Text>

                <label><span>Name: </span><input value={appName} onChange={(e) => setAppName(e.target.value)} type="text"/></label>
                <button onClick={ () => createApp() }>Create</button>
            </div>
        </div>
    )
}

export default Apps;
