import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import './styles.css';
import LibComponentsSelectModal from "./components/LibComponentsSelectModal";


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
    }
];

const LIBRARIES = [
    {
        name: "HTML Components",
        components: HTML_COMPONENTS
    },
    {
        name: "MUI",
        components: []
    },
    {
        name: "FluentUI",
        components: []
    }
];

const PAGE_COMPONENTS = [
    {
        uuid: '2tges',
        name: 'Container_1',
        component: 'div',
        props: {},
        actions: {},
        children: [
            {
                uuid: '432t2g',
                name: 'Container_2',
                component: 'span',
                props: {},
                actions: {},
                children: []
            }
        ]
    }
];

const addAChild = (componentDefinition: any) => {

}

const Page = () => {
    let params = useParams();
    const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
    const [pageComponents, setPageComponents] = useState(PAGE_COMPONENTS);

    const renderPage = (componentsDefinition: any[]) => {
        const renderComponents = (componentsDefinition: any[]): any[] => {
            const components = componentsDefinition.map((componentDefinition) => {
                const component = HTML_COMPONENTS.find((libComponent) => libComponent.name === componentDefinition.component);
                if (!component) { return null; }

                const children = renderComponents(componentDefinition.children);
                return component.render({ children });
            });

            return components;
        }

        const Page = (
            <React.Fragment>
                { renderComponents(componentsDefinition) }
            </React.Fragment>
        );

        return Page;
    }

    const renderComponentsNav = (componentsDefinitions: any[]): any => {
        return componentsDefinitions.map((componentDefinition, index) => {
            return (
                <div className="nav-element">
                    <button
                        onClick={() => setIsSelectModalVisible(true)}
                    >+</button>

                    {componentDefinition.name} ({componentDefinition.component}) <button>-</button>
                    <button
                        onClick={() => setIsSelectModalVisible(true)}
                    >+</button>

                    <div className="nav-element--children">
                        { componentDefinition.children
                            ? renderComponentsNav(componentDefinition.children)
                            : <button>+ children</button>
                        }
                    </div>
                </div>
            );
        })
    };

    return (
    <div className="page">
        <div className="page-tools">

            Tree / Libs / Data
            <input placeholder="search" />

            { renderComponentsNav(pageComponents) }
        </div>

        <div className="page-preview">
            <div className="page-preview--tools">
                <div>alex (project) - dashboard (page)</div>
                <div>screensize: 1200/800 | zoom: 80%</div>
            </div>

            <div className="page-preview--page-space">
                <div className="page-preview--page">
                    { renderPage(pageComponents) }
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

        <LibComponentsSelectModal
            libComponents={LIBRARIES}
            visible={isSelectModalVisible}
            onSelect={(libComponent: any) => {
                setIsSelectModalVisible(false);

                const newPageComponent = {
                    uuid: Date.now(),
                    name: 'Container_' + Date.now(),
                    component: libComponent.name,
                    props: {},
                    actions: {},
                    children: []
                }

                setPageComponents([
                    newPageComponent,
                    ...pageComponents
                ]);
            }}
        />
    </div>
    )
}

export default Page;
