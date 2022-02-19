import React from 'react';
import {useParams} from "react-router-dom";

const Data = () => {
    let params = useParams();

    return (
        <h1>Data with id: {params.pageId}</h1>
    )
}

export default Data;
