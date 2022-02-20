import React from 'react';
import { Link } from "react-router-dom";
import {ROUTES} from "../../Router";

const Home = () => {

    return (
        <div>
            <h1>Home page</h1>
            <nav>
                <li>
                    <Link to={ROUTES.APPS}>Apps</Link>
                </li>
            </nav>
            <p>Some stuff here</p>
        </div>
    )
}

export default Home;
