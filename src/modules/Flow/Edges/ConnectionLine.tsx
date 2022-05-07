import React from 'react';
import {ConnectionLineComponent} from "react-flow-renderer/dist/esm/types";

const horizontalLineWidth = 1;

export const ConnectionLine: ConnectionLineComponent = (props) => {
    const {
        sourceX,
        sourceY,
        targetX,
        targetY
    } = props;

    return (
        <g>
            <path
                fill="none"
                stroke="#333"
                strokeWidth={1.7}
                className="animated"
                d={`M${sourceX},${sourceY} L${sourceX+horizontalLineWidth},${sourceY} L${targetX-horizontalLineWidth},${targetY} ${targetX},${targetY}`}
            />
            <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
        </g>
    );
};
