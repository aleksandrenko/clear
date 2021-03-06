import React from "react";

import './MousePointer.css';

type Props = {
    x: number
    y: number
    label: string
    color: string
}

export const MousePointer = ({ x, y, label, color }: Props) => {
    return (
        <div className="cl-mouse-pointer" style={{ left: x, top: y }}>
            <svg x="0px" y="0px" viewBox="0 0 1000 1000" fill={color}>
                <g>
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                        <path
                            d="M1640.6,4997c-21.1-11.5-53.6-38.3-70.8-61.3c-32.5-38.3-34.5-319.7-34.5-4800.8c0-3650.4,5.7-4772.1,23-4810.4c40.2-88,178-132.1,264.2-86.1c19.1,9.6,624,652.7,1341.9,1426.1l1305.5,1406.9h1902.7c2048.2,0,1990.8-1.9,2061.6,97.6c17.2,24.9,30.6,80.4,30.6,122.5c0,76.6-5.7,82.3-3326.9,3401.5C1973.7,4859.2,1809,5020,1745.9,5020C1709.5,5020,1661.6,5008.5,1640.6,4997z"/>
                    </g>
                </g>
            </svg>
            <label style={{ backgroundColor: color }}>{label}</label>
        </div>
    )
}
