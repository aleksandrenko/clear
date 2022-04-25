import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
// @ts-ignore
import Simmer from 'simmerjs';

import './LiveCommunication.css';
import {MousePointer} from "../MousePointer/MousePointer";
import {ClickAnimation} from "../ClickAnimation/ClickAnimation";

const COLORS = ['#FFB900', '#E74856', '#0078D7', '#FF8C00', '#8E8CD8', '#038387', '#C239B3', '#10893E'];

const simmer = new Simmer();

const lcUsername = JSON.parse(window.localStorage.getItem('username') || "");

const throttleStep = 50;
let lastThrottledEmit = Date.now();

export const LiveCommunication = () => {
    const [username, setUsername] = React.useState(lcUsername);
    const [position, setPosition] = useState({x: 30, y: 30, _meta: {client: ""}});
    const [socketData, setSocketData] = useState({x: 30, y: 30, target: "", _meta: {client: ''}});
    const [connected, setConnected] = useState<string[]>([]);
    const [click, setClick] = useState({x: 10, y: 10});

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
        const socket = io("ws://localhost:3001/", {
            query: {
                "user": username
            },
        });

        const onClick = (e: any) => {
            console.log(e);

            const payload = {
                x: e.clientX,
                y: e.clientY
            }
            socket.emit("click", payload);
        }

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

                // FAKE IT - without server
                // setTimeout(() => {
                //     setSocketData(payload);
                // }, 1000);
            }
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);

        socket.on('user_connected', (data) => {
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

        socket.on("move_confirm", (data: any) => {
            setSocketData(data.data);
        });

        socket.on("click", (data: any) => {
            setClick(data);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
        }
    }, [])

    return (
        <>
            <MousePointer
                left={position.x}
                top={position.y}
                label={position._meta.client}
                color={COLORS[0]}
            />

            <ClickAnimation
                x={click.x}
                y={click.y}
            />

            <div>
                {connected.map((c, index) => {
                    return (
                        <b key={index}>{c[0]}</b>
                    )
                })}
            </div>
        </>
    )
}
