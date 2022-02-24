import React from 'react';
import {useParams} from "react-router-dom";

import './styles.css';


const HTML_COMPONENTS = [
    {
        name: 'div',
        render: (props: any) => <div {...props}>DIV: { props?.children || null }</div>,
        props: {},
        descriptions: 'component description user entered',
        childrenRestrictions: {},
        actions: {},
    },
    {
        name: 'span',
        render: (props: any) => <span {...props}>span: { props?.children || null }</span>,
        props: {},
        descriptions: 'component description user entered',
        childrenRestrictions: {},
        actions: {},
    },
    {
        name: 'Image',
        render: (props: any) => <img {...props}>{ props?.children || null }</img>,
        props: {},
        descriptions: 'component description user entered',
        childrenRestrictions: {},
        actions: {},
    },
    {
        name: 'Input',
        render: (props: any) => <input {...props}>{ props?.children || null }</input>,
        props: {},
        descriptions: 'component description user entered',
        childrenRestrictions: {},
        actions: {},
    }
];

const LIBRARIES = [
    {
        name: "HTML Components",
        components: HTML_COMPONENTS
    }
];

const PAGE_COMPONENTS = [
    {
        uuid: 'UUIDForTheElement',
        name: 'Container_1',
        component: 'div', //TODO: link them by id or something
        props: {},
        actions: {},
        children: [
            'uuidSpan'
        ],
    },
    {
        uuid: 'uuidSpan',
        name: 'Container_2',
        component: 'span',
        props: {},
        actions: {},
        children: [],
    }
]

const Page = () => {
    let params = useParams();

    return (
    <div className="page">
        <div className="page-tools">

            Tree / Libs / Data
            <input placeholder="search" />

            <h4>// Tree //</h4>

            {
                PAGE_COMPONENTS.map((component) => {
                    return (
                        <div>{component.name} ({component.component})</div>
                    );
                })
            }

            <hr />

            <h4>// Libs //</h4>
            {
                LIBRARIES.map((lib) => {
                   return (
                       <div>
                           <strong>{lib.name}</strong>
                            <div>
                                {lib.components.map((component) => {
                                    return (
                                        <div>{ component.name }</div>
                                    )
                                })}
                            </div>
                       </div>
                   )
                })
            }

        </div>

        <div className="page-preview">
            <div className="page-preview--tools">
                <div>alex (project) - dashboard (page)</div>
                <div>screensize: 1200/800 | zoom: 80%</div>
            </div>

            <div className="page-preview--page-space">
                <div className="page-preview--page">
                    the page is rendered here
                </div>
            </div>
        </div>

        <div className="page-properties">
            selected component/data process goes here
        </div>

        <div className="page-actions">
            Actions module goes here
            To define the user interactions with the ui
        </div>
    </div>
    )
}

export default Page;
