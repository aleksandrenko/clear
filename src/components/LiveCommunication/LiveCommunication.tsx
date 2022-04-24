import React, {useEffect, useState} from "react";
import { io } from "socket.io-client";
// @ts-ignore
import Simmer from 'simmerjs';

import './LiveCommunication.css';

const simmer = new Simmer()

const lcUsername = JSON.parse(window.localStorage.getItem('username') || "");

const throttleStep = 50;
let  lastThrottledEmit = Date.now();

export const LiveCommunication = () => {
    const [username, setUsername] = React.useState(lcUsername);
    const [position, setPosition] = useState({x: 30, y: 30, _meta: {client: ""} });
    const [socketData, setSocketData] = useState({x: 30, y: 30, target: "", _meta: { client: '' }});
    const [connected, setConnected] = useState<string[]>([]);

    useEffect(() => {
        console.log('socketData.target', socketData.target);

        // Sometimes there is no target
        if (!socketData.target) {
            return;
        }

        const $target = document.querySelector(socketData.target);
        const bound = $target?.getBoundingClientRect();

        setPosition({
            x: (bound?.width || 1) * socketData.x + (bound?.left || 0),
            y: (bound?.height || 1) * socketData.y + (bound?.top || 0),
            _meta: {
                client: socketData._meta.client
            }
        });

    }, [socketData]);

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

            if (now - lastThrottledEmit > throttleStep) {
                const bounds = e.target.getBoundingClientRect();
                const targetSelector = simmer(e.target);

                //if the selector is wrong don't emit a new mouse position
                if (!targetSelector) {
                    return;
                }

                lastThrottledEmit = now;
                const payload = {
                    x: (e.clientX - bounds.left) / bounds.width,
                    y: (e.clientY - bounds.top) / bounds.height,
                    target: targetSelector,
                    _meta: {
                        project: 'a',
                        client: username
                    }
                }

                socket.emit("move", payload);

                //FAKE IT - without server
                // setTimeout(() => {
                //     setSocketData(payload);
                // }, 1000);
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
            setSocketData(data.data);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

    return (
        <>
            {/*{ position.target }*/}
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
