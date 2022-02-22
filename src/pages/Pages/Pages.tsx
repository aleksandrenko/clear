import React from 'react';
import {Link, useParams} from "react-router-dom";

const Pages = () => {

    return (
        <div>
            <h1>Pages</h1>
            <ul>
                <li><Link to={'1'}>page 1 with render</Link></li>
                <li><Link to={'2'}>page 2 with render</Link></li>
                <li><Link to={'3'}>page 3 with render</Link></li>
            </ul>
        </div>
    )
}

export default Pages;
