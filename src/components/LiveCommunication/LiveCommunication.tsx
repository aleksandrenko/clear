import React, {useEffect, useState} from "react";

import { io } from "socket.io-client";

const lcUsername = JSON.parse(window.localStorage.getItem('username') || "");
const lcUserId = JSON.parse(window.localStorage.getItem('userId') || "");

export const LiveCommunication = () => {
    const [username, setUsername] = React.useState(lcUsername);
    const [position, setPosition] = useState({x: 30, y: 30, _meta: { client: '' }});
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
            socket.emit("move", {
                x: e.pageX,
                y: e.pageY,
                _meta: {
                    project: 'a',
                    client: username
                }
            });
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
            setPosition(data.data);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

    return (
        <>
            <div style={{
                width: 5,
                height: 5,
                backgroundColor: "blue",
                borderRadius: "50%",
                position: 'fixed',
                left: position.x,
                top: position.y,
                zIndex: 1000
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
