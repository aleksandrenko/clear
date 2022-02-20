import React from 'react';
import {useParams} from "react-router-dom";

const Pages = () => {
    let params = useParams();

    return (
        <h1>Pages: {params.pageId}</h1>
    )
}

export default Pages;
