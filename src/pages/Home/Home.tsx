import React from 'react';
import { Link } from "react-router-dom";
import {ROUTES} from "../../Router";

import { io } from "socket.io-client";

export const socket = io("ws://localhost:3001/", {
    // path: 'ws',
    // withCredentials: true,
    // forceBase64: true,
    // timestampRequests: true,
    // reconnection: true,
    // reconnectionDelayMax: 10000,
    // auth: {
    //     token: "123"
    // },
    // query: {
    //     "my-key": "my-value"
    // }
});

socket.on('connection', () => {
    console.log('a user connected');
});

socket.on('disconnect', () => {
    console.log('user disconnected');
});

socket.on('confirm', (data: any) => {
    console.log('client gets: user confirm', data);
});

window.addEventListener('click', (e) => {
 console.log('client emit');
 socket.emit("click", {data: e});
});

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
