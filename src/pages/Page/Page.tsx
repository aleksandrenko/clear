import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import './styles.css';
import LibComponentsSelectModal from "./components/LibComponentsSelectModal";
import {
    Breadcrumb,
    Button,
    Checkbox,
    IBreadcrumbItem,
    Icon,
    initializeIcons,
    Pivot,
    PivotItem,
    SearchBox,
    Stack, TextField, Toggle, Text
} from "@fluentui/react"

initializeIcons();

const breadcrumbItem: IBreadcrumbItem[] = [
    { text: 'Alx', key: 'project', onClick: () => console.log('path1') },
    { text: 'Pages', key: 'pages', onClick: () => console.log('path2') },
    { text: 'Dashboard', key: 'page', onClick: () => console.log('path3') }
];


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
        components: [
            {
                name: 'Button',
                render: (props: any) => <Button {...props}>{ props?.children || null }</Button>,
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
            },
            {
                name: 'Checkbox',
                render: (props: any) => <Checkbox {...props}>{ props?.children || null }</Checkbox>,
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
            },
            {
                name: 'SearchBox',
                render: (props: any) => <SearchBox {...props}>{ props?.children || null }</SearchBox>,
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
            },
            {
                name: 'TextField',
                render: (props: any) => <TextField {...props}>{ props?.children || null }</TextField>,
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
            },
            {
                name: 'Toggle',
                render: (props: any) => <Toggle {...props}>{ props?.children || null }</Toggle>,
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
            },
            {
                name: 'Icon',
                render: (props: any) => <Icon {...props}>{ props?.children || null }</Icon>,
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
            },
            {
                name: 'Text',
                render: (props: any) => <Text {...props}>{ props?.children || null }</Text>,
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
            }
        ]
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

const Page = () => {
    let params = useParams();
    const [componentAddFunction, setComponentAddFunction] = useState(null);
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

    const addChildBefore = (parentComponentDefinition: any) => (libComponent: any) => {
        const targetIndex = PAGE_COMPONENTS.findIndex((component, index) => component.uuid === parentComponentDefinition.uuid);

        const newPageComponent = {
            component: libComponent.name,
            uuid: Date.now(),
            name: 'Container_' + Date.now(),
            props: {},
            actions: {},
            children: []
        }

        if (targetIndex > -1) {
            PAGE_COMPONENTS.splice(targetIndex, 0, newPageComponent);
        }
    }

    const addChildAfter = (parentComponentDefinition: any) => (libComponent: any) => {
        const targetIndex = PAGE_COMPONENTS.findIndex((component, index) => component.uuid === parentComponentDefinition.uuid);

        const newPageComponent = {
            component: libComponent.name,
            uuid: Date.now(),
            name: 'Container_' + Date.now(),
            props: {},
            actions: {},
            children: []
        }

        if (targetIndex > -1) {
            PAGE_COMPONENTS.splice(targetIndex+1, 0, newPageComponent);
        }

    }

    const renderComponentsNav = (componentsDefinitions: any[]): any => {
        return componentsDefinitions.map((componentDefinition) => {

            return (
                <div className="nav-element">
                    <button onClick={() => {
                        setComponentAddFunction((prev: any) => addChildBefore(componentDefinition)); }}
                    >
                        +
                    </button>

                    {componentDefinition.name} ({componentDefinition.component}) <button>-</button>
                    <button
                        onClick={() => {
                        setComponentAddFunction((prev: any) => addChildAfter(componentDefinition)); }}
                    >
                        +
                    </button>

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

            <Pivot aria-label="Basic Pivot Example">
                <PivotItem headerText="Tree">
                    <Stack tokens={{padding: 10}}>
                        <Stack.Item>
                            <SearchBox
                                placeholder="Search"
                                onSearch={newValue => console.log('value is ' + newValue)}
                            />
                        </Stack.Item>

                        <Stack.Item>
                            { renderComponentsNav(pageComponents) }
                        </Stack.Item>
                    </Stack>
                </PivotItem>
                <PivotItem headerText="Libs">
                    <div>lib components here</div>
                </PivotItem>
                <PivotItem headerText="Data">
                    <div>data goes here</div>
                </PivotItem>
            </Pivot>
        </div>

        <div className="page-preview">
            <div className="page-preview--tools">
                <div>
                    <Breadcrumb
                        className="page-breadcrumb"
                        items={breadcrumbItem}
                        maxDisplayedItems={10}
                    />
                </div>
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
            addFunction={componentAddFunction}
            onSelect={(libComponent: any) => {
                setComponentAddFunction(null);

                componentAddFunction(libComponent);
            }}
        />
    </div>
    )
}

export default Page;
