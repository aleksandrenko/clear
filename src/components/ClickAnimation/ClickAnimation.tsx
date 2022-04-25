import * as React from 'react';
import './ClickAnimation.css';
import {useEffect, useState} from "react";

type Props = {
    x: number,
    y: number
}

export const ClickAnimation = ({ x, y }: Props) => {
    const [className, setClassName] = useState('');

    useEffect(() => {
        setClassName('');

        window.requestAnimationFrame(() => {
            setClassName('clickEffect');
        });
    }, [x, y]);

    return (
        <div
            className={className}
            style={{
                left: x + 'px',
                top: y + 'px'
            }}
        ></div>
    )
}
