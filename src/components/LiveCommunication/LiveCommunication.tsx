import React, {createRef, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
// @ts-ignore
import Simmer from 'simmerjs';

import './LiveCommunication.css';
import {MousePointer} from "../MousePointer/MousePointer";
import {ClickAnimations} from "../ClickAnimation/ClickAnimations";

const simmer = new Simmer();

const WS_URL = "ws://localhost:3001/";
const lcUsername = JSON.parse(window.localStorage.getItem('username') || null);

const throttleStep = 50;
let lastThrottledEmit = Date.now();

export const LiveCommunication = () => {
    const [username, setUsername] = React.useState(lcUsername);
    const [connections, setConnections] = useState<any[]>([]);
    const [mouseMove, setMouseMove] = useState<{ id: number, x: number, y: number }>();
    const clicksRef = React.useRef({});

    const toPayload = (e: any) => {
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
    const fromPayload = (data: any) => {
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
                const translatedCoordinates = fromPayload(mouseMove);
                return {
                    ...connection,
                    x: translatedCoordinates.x,
                    y: translatedCoordinates.y
                }
            }

            return connection;
        });

        setConnections(modifiedConnectedUsers);
    }, [mouseMove]);

    useEffect(() => {
        const socket = io(WS_URL, {
            query: {
                "user": username
            },
        });

        const onClick = (e: any) => {
            const payload = toPayload(e);
            socket.emit("click", payload);
        }
        const onMouseMove = (e: any) => {
            const now = Date.now();

            //ТОДО: this is not working good. The last value should be send. Otherwise a click's position may differ from a click;
            if (now - lastThrottledEmit > throttleStep) {
                const payload = toPayload(e);
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
            const translatedPosition = fromPayload(data);

            // @ts-ignore
            clicksRef.current.addClick({
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
            <ClickAnimations compRef={clicksRef}/>

            <div>
                {connections.map((connection: any, index) => {
                    return <span key={index}>({connection.username[0]})</span>
                })}
            </div>

            {connections.map((connection: any, index) => connection.x && connection.y && (
                    <MousePointer
                        key={index + "-pointer"}
                        x={connection.x}
                        y={connection.y}
                        label={connection.username}
                        color={connection.color}
                    />
                )
            )}
        </>
    )
}
