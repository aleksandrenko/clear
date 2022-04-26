import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
// @ts-ignore
import Simmer from 'simmerjs';

import './LiveCommunication.css';
import {MousePointer} from "../MousePointer/MousePointer";
import {ClickAnimation} from "../ClickAnimation/ClickAnimation";

const simmer = new Simmer();

const lcUsername = JSON.parse(window.localStorage.getItem('username') || "");

const throttleStep = 50;
let lastThrottledEmit = Date.now();

export const LiveCommunication = () => {
    const [username, setUsername] = React.useState(lcUsername);
    const [connections, setConnections] = useState<any[]>([]);
    const [mouseMove, setMouseMove] = useState<{ id: number, x: number, y: number }>();
    const [click, setClick] = useState({x: 10, y: 10});

    const getPayload = (e: any) => {
        const bounds = e.target.getBoundingClientRect();
        const targetSelector = simmer(e.target);

        return {
            x: (e.clientX - bounds.left) / bounds.width,
            y: (e.clientY - bounds.top) / bounds.height,
            target: targetSelector,
            _meta: {
                project: 'a',
                client: username
            }
        }
    }

    const translateCoordinates = (data: any) => {
        const $target = document.querySelector(data.target);
        const bound = $target?.getBoundingClientRect();
        const payload = {
            x: (bound?.width || 1) * data.x + (bound?.left || 0),
            y: (bound?.height || 1) * data.y + (bound?.top || 0),
        }
        return payload
    }

    useEffect(() => {
        const modifiedConnectedUsers = connections.map((connection: any) => {
            if (connection.id === mouseMove?.id) {
                const translatedCoordinates = translateCoordinates(mouseMove);

                connection.x = translatedCoordinates.x;
                connection.y = translatedCoordinates.y
            }

            return connection;
        });
    }, [mouseMove]);

    useEffect(() => {
        const socket = io("ws://localhost:3001/", {
            query: {
                "user": username
            },
        });

        const onClick = (e: any) => {
            const payload = getPayload(e);
            socket.emit("click", payload);
        }

        const onMouseMove = (e: any) => {
            const now = Date.now();

            if (now - lastThrottledEmit > throttleStep) {
                const payload = getPayload(e);
                lastThrottledEmit = now;

                socket.emit("move", payload);
            }
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);

        socket.on('user_connected', (data) => {
            if (data.users) {
                setConnections(data.users);
            }
        });

        socket.on('user_disconnected', (data) => {
            if (data.users) {
                setConnections(data.users);
            }
        });

        socket.on("move_confirm", (data: any) => {
            setMouseMove(data);
        });

        socket.on("click", (data: any) => {
            const translatedPosition = translateCoordinates(data);
            const $d = document.querySelector(data.target);
            const w = $d.getBoundingClientRect();

            setClick({
                x: translatedPosition.x,
                y: translatedPosition.y
            });
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
        }
    }, [])

    return (
        <>
            <ClickAnimation
                x={click.x}
                y={click.y}
            />

            <div>
                {connections.map((connection: any, index) => {
                    return <span key={index}>({connection.username[0]})</span>
                })}
            </div>

            {connections.map((connection: any, index) => connection.x && connection.y && (
                    <MousePointer
                        key={index + "-pointer"}
                        left={connection.x}
                        top={connection.y}
                        label={connection.username}
                        color={connection.color}
                    />
                )
            )}
        </>
    )
}
