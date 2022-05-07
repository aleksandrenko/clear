import React from 'react';
import {
    getSimpleBezierEdgeCenter,
    getSimpleBezierPath,
    MarkerType
} from 'react-flow-renderer';

import './ButtonEdge.css';
import { ConnectionLineComponent } from "react-flow-renderer/dist/esm/types";

const foreignObjectSize = 40;

export const ButtonEdge: ConnectionLineComponent = (props) => {
    const {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    } = props;

    // @ts-ignore
    const id = props.id;

    const edgePath = getSimpleBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const [edgeCenterX, edgeCenterY] = getSimpleBezierEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path
                id={id}
                d={edgePath}
                fill="none"
                stroke="#999"
                strokeWidth={1.5}
                markerEnd={MarkerType.ArrowClosed}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                    <button className="edgebutton">×</button>
                </body>
            </foreignObject>
        </>
    );
}
