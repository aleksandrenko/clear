import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundly";

const domAppElement = document.getElementById('root');

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
