import React, {useState} from "react";
import {
    ActionButton,
    Button, ComboBox,
    CommandBarButton, ContextualMenu,
    DetailsRow, Dropdown,
    GroupedList, IComboBoxOption,
    Icon, IContextualMenuProps,
    Label, List, PrimaryButton, SelectableOptionMenuItemType,
    SelectionMode, TextField
} from "@fluentui/react";
import {IButtonProps} from "@fluentui/react/lib/components/Button/Button.types";

import './ComponentNavTree.css';

const options: IComboBoxOption[] = [
    { key: 'h1', text: 'Conainers', itemType: SelectableOptionMenuItemType.Header },
    { key: 'A', text: 'div' },
    { key: 'B', text: 'span' },
    { key: 'C', text: 'section' },
    { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
    { key: 'Header2', text: 'Form Elements', itemType: SelectableOptionMenuItemType.Header },
    { key: 'E', text: 'Text Input' },
    { key: 'F', text: 'Number Input', disabled: true },
    { key: 'G', text: 'Dropdown' },
    { key: 'H', text: 'Button' },
    { key: 'I', text: 'Checkbox' },
    { key: 'J', text: 'Radio Button' },
];

type Props = {
    componentsDefinitions: any[]
}


const ITEMS = [
    {
        uuid: 'demo_container_0',
        name: 'div',
        render: (props: any) => <div {...props}>DIV: {props?.children || null}</div>,
        actions: {},
        parent: null,
        _meta: {
            opened: false,
            canHaveChildren: true
        }
    },
    {
        uuid: 'demo_container_1',
        name: 'div',
        render: (props: any) => <div {...props}>DIV: {props?.children || null}</div>,
        actions: {},
        parent: null,
        _meta: {
            opened: false,
            canHaveChildren: true
        }
    },
    {
        uuid: 'button1',
        name: 'Button',
        render: (props: IButtonProps) => <Button {...props}>{props?.children || null}Button text</Button>,
        parent: 'demo_container_1',
        _meta: {
            opened: false,
            canHaveChildren: false
        }
    },
    {
        uuid: 'demo_container_2',
        name: 'div',
        render: (props: any) => <div {...props}>DIV: {props?.children || null}</div>,
        actions: {},
        parent: 'demo_container_1',
        _meta: {
            opened: false,
            canHaveChildren: true
        }
    },
    {
        uuid: 'button2',
        name: 'Button',
        render: (props: IButtonProps) => <Button {...props}>{props?.children || null}Button text in 2</Button>,
        parent: 'demo_container_2',
        _meta: {
            opened: false,
            canHaveChildren: false
        }
    },
    {
        uuid: 'button2',
        name: 'Button',
        render: (props: IButtonProps) => <Button {...props}>{props?.children || null}Button text in 2</Button>,
        parent: 'demo_container_2',
        _meta: {
            opened: false,
            canHaveChildren: false
        }
    }
];


export const ComponentNavTree = ({componentsDefinitions}: Props) => {
    const [pageComponents, setPageComponents] = useState(ITEMS);
    const [componentAddFunction, setComponentAddFunction] = useState<any>(null);

    const addChild = (parentComponentDefinition: any) => (libComponent: any) => {
        const modifyTreeBranch = (components: any) => {
            return components.map((component: any) => {
                if (component.children.length) {
                    modifyTreeBranch(component.children);
                }

                if (component.uuid === parentComponentDefinition.uuid) {
                    const newPageComponent = {
                        uuid: Date.now().toString(),
                        name: Date.now().toString(),
                        component: libComponent.name,
                        props: {},
                        actions: {},
                        children: []
                    }

                    component.children.push(newPageComponent);
                }

                return component;
            });
        };

        setPageComponents(modifyTreeBranch(pageComponents));
    }

    const addElementBefore = (parentComponentDefinition: any) => (libComponent: any) => {
        const modifyTreeBranch = (components: any) => {
            return components.reduce((sum: any[], component: any) => {
                if (component.uuid === parentComponentDefinition.uuid) {
                    const newPageComponent = {
                        uuid: Date.now().toString(),
                        name: Date.now().toString(),
                        component: libComponent.name,
                        props: {},
                        actions: {},
                        children: []
                    }

                    // Add the new element before adding the already existing one.
                    sum.push(newPageComponent);
                }
                sum.push(component);

                console.log(component, parentComponentDefinition.uuid);

                if (component.children.length) {
                    component.children = modifyTreeBranch(component.children);
                }

                return sum;
            }, []);
        };

        setPageComponents(modifyTreeBranch(pageComponents));
    }

    //TODO: this is pretty much the same like addBefore. Think af a good way to combine them
    const addElementAfter = (parentComponentDefinition: any) => (libComponent: any) => {
        const modifyTreeBranch = (components: any) => {
            return components.reduce((sum: any[], component: any) => {
                sum.push(component);

                if (component.uuid === parentComponentDefinition.uuid) {
                    const newPageComponent = {
                        uuid: Date.now().toString(),
                        name: Date.now().toString(),
                        component: libComponent.name,
                        props: {},
                        actions: {},
                        children: []
                    }

                    // Add the new element after adding the already existing one.
                    sum.push(newPageComponent);
                }

                console.log(component, parentComponentDefinition.uuid);

                if (component.children.length) {
                    component.children = modifyTreeBranch(component.children);
                }

                return sum;
            }, []);
        };

        setPageComponents(modifyTreeBranch(pageComponents));
    }

    const deleteComponent = (componentDefinition: any) => {
        const modifyTreeBranch = (components: any) => {
            return components.reduce((sum: any[], component: any) => {
                if (component.uuid !== componentDefinition.uuid) {
                    if (component.children.length) {
                        component.children = modifyTreeBranch(component.children);
                    }

                    sum.push(component);
                }

                return sum;
            }, []);
        };

        setPageComponents(modifyTreeBranch(pageComponents));
    }

    const renderComponentsTreeNav = (cTree: any[]) => cTree.map((componentDefinition) => {

        return (
            <div className="nav-element">
                <button onClick={() => {
                    setComponentAddFunction((prev: any) => addElementBefore(componentDefinition));
                }}>
                    +
                </button>

                {componentDefinition.name} ({componentDefinition.component})
                <button onClick={() => deleteComponent(componentDefinition)}>
                    -
                </button>

                <button onClick={() => {
                    setComponentAddFunction((prev: any) => addElementAfter(componentDefinition));
                }}>
                    +
                </button>

                <div className="nav-element--children">
                    {componentDefinition.children.length
                        ? renderComponentsTreeNav(componentDefinition.children)
                        : (
                            <>
                                -
                                <button onClick={() => {
                                    setComponentAddFunction((prev: any) => addChild(componentDefinition));
                                }}
                                >
                                    + child
                                </button></>
                        )
                    }
                </div>
            </div>
        );
    })

    const rootItems = pageComponents.filter(item => !item.parent);

    const toggleItemOpen = (item) => {
        setPageComponents((pageComponents) => {
            return pageComponents.map((_item) => {
                return _item.uuid === item.uuid
                    ? {
                        ...item,
                        _meta: {
                            ...item._meta,
                            opened: !item._meta.opened
                        }
                    }
                    : _item;
            });
        });
    }

    const menuProps: IContextualMenuProps = {
        items: [
            {
                key: 'addBefore',
                text: 'Add Before',
                iconProps: { iconName: 'AddTo' },
            },
            {
                key: 'addAfter',
                text: 'Add After',
                iconProps: { iconName: 'AddTo' },
            },
            {
                key: 'delete',
                text: 'Delete',
                iconProps: { iconName: 'Delete' },
            },
        ],
        directionalHintFixed: true,
    };

    const renderItem = (item: any, index, allItems: any[]) => {
        const children = allItems.filter((_item: any) => item.uuid === _item.parent);
        const isOpened = item._meta.opened;
        const canHaveChildren = item._meta.canHaveChildren;

        let iconName = isOpened ? "OpenFolderHorizontal" : "FolderHorizontal";

        if (!canHaveChildren) {
            iconName = 'FileCode';
        }

        return (
            <li key={index}>
                <div className="cl-components-list--tree--item">
                    <ActionButton
                        className="cl-components-list--tree--item-name"
                        onClick={() => { canHaveChildren &&  toggleItemOpen(item) }}
                        iconProps={{iconName}}
                    >
                        {item.name}&nbsp;<span className="cl-components-list--tree--item-uuid">({item.uuid})</span>
                    </ActionButton>
                    <ActionButton menuProps={menuProps} />
                </div>

                {isOpened && (
                    <ul className="cl-components-list--tree--sub-items">
                        { renderItems(children) }
                    </ul>
                )}
            </li>
        )
    }

    const renderItems = (items: any[]) => items.map((item, index, all) => renderItem(item, index, pageComponents))

    return (
        <ul className="cl-components-list--tree">
            {renderItems(rootItems)}

            <ComboBox
                defaultSelectedKey="C"
                options={options}
                onSelect={(e) => { console.log(e.target) }}

            />
            <PrimaryButton>Add</PrimaryButton>
        </ul>
    )
}
