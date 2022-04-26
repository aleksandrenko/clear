import * as React from 'react';
import './ClickAnimations.css';
import {useEffect, useState} from "react";
import uuid from "../../utils/uuid";

type Props = {
    compRef: any,
}

type Click = {
    x: number,
    y: number,
    id?: any
}

export const ClickAnimations = ({ compRef }: Props) => {
    const [clicks, setClicks] = useState<Click[]>([]);

    compRef.current.addClick = (click: Click) => {
        const newClick = {
            ...click,
            id: uuid()
        }
        setClicks([...clicks, newClick]);

        setTimeout(() => {
            const clickToRemove = newClick.id;
            setClicks((_clicks) => {
                return _clicks.filter((click) => click.id !== clickToRemove);
            });

        }, 22250);
    };

    return (
        <div className="clicks">
            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="clickEffect"
                    style={{
                        left: click.x + 'px',
                        top: click.y + 'px'
                    }}
                ></div>
                )
            )}
        </div>

    )
}
