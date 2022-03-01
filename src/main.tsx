import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundly";
import {initializeIcons} from "@fluentui/react";

const domAppElement = document.getElementById('root');

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

ReactDOM.render(<AppWrapped />, domAppElement);
