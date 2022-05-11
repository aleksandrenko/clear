import React from 'react';
import Router from './Router';
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundly";
import {initializeIcons} from "@fluentui/react";
import ReactDOM from "react-dom/client";

const domAppElement = document.getElementById('root') as HTMLElement;

initializeIcons();

const AppWrapped = () => {
    return (
        <React.StrictMode>
            <ErrorBoundary>
                <Router />
            </ErrorBoundary>
        </React.StrictMode>
    )
}

const root = ReactDOM.createRoot(domAppElement);
root.render(<AppWrapped />);
