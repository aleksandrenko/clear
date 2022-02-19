import React from 'react';
import { useParams } from "react-router-dom";


const Assets = () => {
    let params = useParams();

    return (
        <h1>Assets from page "{params.pageId}"</h1>
    )
}

export default Assets;
