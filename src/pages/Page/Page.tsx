import React from 'react';
import {useParams} from "react-router-dom";

import './styles.css';


const Page = () => {
    let params = useParams();

    return (
    <div className="page">


        <div className="page-tools">

            Tree / Libs / Data
            <input placeholder="search" />
        </div>

        <div className="page-preview">
            <div className="page-preview--tools">
                <div>alex (project) - dashboard (page)</div>
                <div>screensize: 1200/800 | zoom: 80%</div>
            </div>

            <div className="page-preview--page-space">
                <div className="page-preview--page">
                    the page is rendered here
                </div>
            </div>
        </div>

        <div className="page-properties">
            selected component/data process goes here
        </div>

        <div className="page-actions">
            Actions module goes here
            To define the user interactions with the ui
        </div>
    </div>
    )
}

export default Page;
