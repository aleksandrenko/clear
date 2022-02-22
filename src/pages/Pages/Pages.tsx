import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {appsAtom, getPagesAtom} from "../../state/apps";

const Pages = () => {
    let params = useParams();
    const [pages] = useAtom(getPagesAtom(params.appId));

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
        </div>
    )
}

export default Pages;
