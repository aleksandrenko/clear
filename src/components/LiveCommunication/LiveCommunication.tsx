import React, {useEffect, useId, useState} from "react";

import { io } from "socket.io-client";

import './LiveCommunication.css';

const lcUsername = JSON.parse(window.localStorage.getItem('username') || "");

const trottleStep = 50;
let  lastTrottledEmit = Date.now();

export const LiveCommunication = () => {
    const [username, setUsername] = React.useState(lcUsername);
    const [position, setPosition] = useState({x: 30, y: 30, target: "", _meta: { client: '' }});
    const [connected, setConnected] = useState<string[]>([]);

    useEffect(() => {
        window.localStorage.setItem('username', JSON.stringify(username));
    }, [username]);

    useEffect(() => {
        const socket = io("ws://localhost:3001/", {
            query: {
                "user": username
            },
        });

        const onMouseMove = (e: any) => {
            const now = Date.now();

            console.log(e.path);

            if (now - lastTrottledEmit > trottleStep) {
                lastTrottledEmit = now;

                socket.emit("move", {
                    x: e.clientX,
                    y: e.clientY,
                    target: e.target.classes,
                    _meta: {
                        project: 'a',
                        client: username
                    }
                });
            }
        }

        window.addEventListener('mousemove', onMouseMove);

        socket.on('user_connected', (data) => {
            console.log('a user connected', data);
            const username = data.user as string;

            if (username) {
                setConnected([
                    ...connected,
                    username
                ]);
            }
        });

        socket.on('user_disconnected', (data) => {
            const username = data.user as string;

            if (username) {
                setConnected([
                    ...connected
                        .filter(connectedUser => connectedUser !== username),
                ]);
            }
        });

        socket.on("move_confirm",(data: any) => {
            console.log(data.data);
            setPosition(data.data);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

    return (
        <>
            { position.target }
            <div className="pointer" style={{
                left: position.x,
                top: position.y,
            }}>
                <div>{ position._meta.client }</div>
            </div>

            <div>
                { connected.map((c, index) => {
                    return (
                        <b key={index}>{c[0]}</b>
                    )
                }) }
            </div>

            <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </>
    )
}
