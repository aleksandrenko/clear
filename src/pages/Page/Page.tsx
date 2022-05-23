import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import './styles.css';
import LibComponentsSelectModal from "./components/LibComponentsSelectModal";
import {
    Breadcrumb,
    Button,
    IBreadcrumbItem,
    initializeIcons,
    Pivot,
    PivotItem,
    SearchBox,
    Stack
} from "@fluentui/react"
import {IButtonProps} from "@fluentui/react/lib/components/Button/Button.types";
import ComponentProperties from "./components/ComponentProperties";
import {Flow} from "../../modules/Flow/Flow";
import uuid from "../../utils/uuid";
import {ComponentNavTree} from "../../components/ComponentNavTree/ComponentNavTree";

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
        name: "FluentUI",
        components: [
            {
                name: 'Button',
                render: (props: IButtonProps) => <Button {...props}>{ props?.children || null }Button text</Button>,
                props: {
                },
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
                uuid: uuid(),
                name: 'Button',
                component: 'Button',
                props: {},
                descriptions: '',
                childrenRestrictions: {},
                actions: {},
                children: []
            },
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
    const [componentAddFunction, setComponentAddFunction] = useState<any>(null);

    const renderPage = (componentsDefinition: any[]) => {
        const renderComponents = (componentsDefinition: any[]): any[] => {
            const components = componentsDefinition.map((componentDefinition) => {
                //TODO select them by lib - names can be overiding themselves
                const AllLibComponents = LIBRARIES
                    .map((lib) => lib.components)
                    .reduce((sum, lib) => {
                        sum = [...sum, ...lib];
                        return sum;
                    }, []);
                const component = AllLibComponents.find((libComponent) => libComponent.name === componentDefinition.component);
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
                            <ComponentNavTree componentsDefinitions={PAGE_COMPONENTS} />
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
                    { renderPage(PAGE_COMPONENTS) }
                </div>
            </div>
        </div>

        {/*<div className="page-properties">*/}
        {/*    <ComponentProperties />*/}
        {/*</div>*/}

        {/*<div className="page-actions">*/}
        {/*    <Flow />*/}
        {/*</div>*/}

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
