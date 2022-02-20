import React from "react";

class ErrorBoundary extends React.Component {
    // @ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: any, info: any) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.log('ErrorBoundary Catch');
        console.log(error);
        console.log(info.componentStack);
    }


    render() {
        // @ts-ignore
        if (this.state.hasError) {
            return (
                <h1>Something went wrong.</h1>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
