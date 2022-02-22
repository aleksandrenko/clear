import React from 'react';
import {useParams} from "react-router-dom";


const Page = () => {
    let params = useParams();

    return (
        <div>
            <div style={{background: 'gray', padding: 10, color: '#fff'}}>
                page
                <h1>Page: {params.pageId}</h1>
            </div>
        </div>
    )
}

export default Page;
