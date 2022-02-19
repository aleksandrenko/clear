import React from 'react';
import { useParams } from "react-router-dom";

const App = () => {
    let params = useParams();

    return (
        <h1>App with id: {params.pageId}</h1>
    )
}

export default App;
