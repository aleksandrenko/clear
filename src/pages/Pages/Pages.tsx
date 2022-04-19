import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {appsAtom, getPagesAtom} from "../../state/apps";
import {
    DocumentCard,
    DocumentCardDetails,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardType
} from "@fluentui/react";

import './styles.css';

const Pages = () => {
    let params = useParams();
    const [pages] = useAtom(getPagesAtom(params.appId));
    const [apps, setApps] = useAtom<any[]>(appsAtom);
    const [newPageName, setNewPageName] = useState<string>('');

    const onNewNameSet = (e: { target: { value: any; }; }) => {
        const name = e.target.value;
        setNewPageName(name);
    }

    const createNewPage = () => {
        const newPage = {
            uuid: Date.now(),
            slug: newPageName
        }

        const modifiedApps = apps.map((app) => {
            if (app.uuid === params.appId) {
                app.pages.push(newPage);
            }

            return app;
        });

        // @ts-ignore
        setApps(modifiedApps);
    }

    const navigate = useNavigate();

    return (
        <div className="pages-wrapper">
            <h1>Pages</h1>

            <div className="pages-grid">
            {
                pages.map(((page, index) => {
                    return (
                        <DocumentCard
                            key={index}
                            type={DocumentCardType.compact}
                            onClick={() => navigate(page.slug)}
                        >
                            <DocumentCardPreview previewImages={[]} />
                            <DocumentCardDetails>
                                <DocumentCardTitle title={page.slug} shouldTruncate />
                            </DocumentCardDetails>
                        </DocumentCard>
                    )
                }))
            }
            </div>

            <div>
                <input value={newPageName} onChange={onNewNameSet} />
                <button onClick={() => createNewPage()}>Create new Page</button>
            </div>
        </div>
    )
}

export default Pages;
