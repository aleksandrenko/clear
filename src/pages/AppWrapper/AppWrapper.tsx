import React from 'react';
import {Link, useParams, Outlet, useNavigate} from "react-router-dom";
import {ROUTES} from "../../Router";

import './style.css';
import {
    CommandBar, Text, Persona, Separator
} from "@fluentui/react";
import Types from "../../modules/Types/Types";

const AppWrapper = () => {
    let params = useParams();
    let navigate = useNavigate();

    return (
        <div className="app">
            <div className="app-header">
                <Text variant="medium" className="clr-logo" onClick={() => { navigate(`/${ROUTES.APPS}`) }}>Clear</Text>

                &nbsp;&nbsp;&nbsp;<Separator vertical />

                <CommandBar
                    className="app-header__nav"
                    items={[
                        {
                            key: 'Pages',
                            text: 'Pages',
                            renderedInOverflow: false,
                            onClick: () => navigate(ROUTES.PAGES, { replace: true })
                        },
                        {
                            key: 'Data',
                            text: 'Data',
                            renderedInOverflow: false,
                            onClick: () => navigate(ROUTES.DATA, { replace: true }),
                        },
                        {
                            key: 'Assets',
                            text: 'Assets',
                            renderedInOverflow: false,
                            onClick: () => navigate(ROUTES.ASSETS, { replace: true }),
                        },
                    ]}
                    farItems={[{
                        key: 'undo',
                        text: 'Undo',
                        iconOnly: true,
                        iconProps: { iconName: 'Undo' },
                        onClick: () => console.log('Undo'),
                    },
                    {
                        key: 'redo',
                        text: 'Redo',
                        iconOnly: true,
                        iconProps: { iconName: 'Redo' },
                        onClick: () => console.log('Redo'),
                    },
                    {
                        key: 'save',
                        text: 'Save',
                        iconOnly: true,
                        iconProps: {iconName: 'Save'},
                        onClick: () => console.log('Save'),
                    },
                    {
                        key: 'load',
                        text: 'Load',
                        iconOnly: true,
                        iconProps: {iconName: 'OpenFolderHorizontal'},
                        onClick: () => console.log('Load'),
                    },
                    ]}
                />
                <Separator vertical />
                &nbsp;&nbsp;&nbsp;
                <Persona
                    imageInitials="NMA"
                    text="Nikolay Aleksandrenko"
                    secondaryText="Software Engineer"
                    tertiaryText="In a meeting"
                    optionalText="Available at 4:00pm"
                    size={2}
                    hidePersonaDetails={false}
                />
            </div>

            <div className="app-page-wrapper">
                <Outlet />
            </div>

            <div className="app-page--modules">
                <div className="app-page--modules-overlay" />

                <div className="app-page--modules-wrapper">
                    <Types />
                </div>

            </div>
        </div>
    )
}

export default AppWrapper;
