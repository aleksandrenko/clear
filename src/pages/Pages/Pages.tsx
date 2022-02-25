import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {appsAtom, getPagesAtom} from "../../state/apps";

const Pages = () => {
    let params = useParams();
    const [pages] = useAtom(getPagesAtom(params.appId));
    const [apps, setApps] = useAtom<any[]>(appsAtom);
    const [newPageName, setNewPageName] = useState<string>('');

    const onNewNameSet = (e) => {
        const name = e.target.value;
        setNewPageName(name);
    }

    const createNewPage = () => {
        console.log('crate new page');
        const newPage = {
            uuid: Date.now(),
            slug: newPageName
        }

        console.log(newPage);

        const modifiedApps = apps.map((app) => {
            if (app.uuid === params.appId) {
                app.pages.push(newPage);
            }

            return app;
        });

        setApps(modifiedApps);
    }

    return (
        <div>
            <h1>Pages</h1>
            <ul>
                {
                    pages.map((page => {
                        return <li key={page.slug}>
                            <Link to={page.slug}>{page.slug}</Link>
                        </li>
                    }))
                }
            </ul>
            <div>
                <input value={newPageName} onChange={onNewNameSet} />
                <button onClick={() => createNewPage()}>Create new Page</button>
            </div>
        </div>
    )
}

export default Pages;
