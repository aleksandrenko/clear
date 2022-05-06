import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import {ConnectionLineComponent} from "react-flow-renderer/dist/esm/types";

const horizontalLineWidth = 1;
const yOffset = 10;

export const ConnectionLine: ConnectionLineComponent = ({
                    sourceX,
                    sourceY,
                    sourcePosition,
                    targetX,
                    targetY,
                    targetPosition,
                    connectionLineType,
                    connectionLineStyle,
                }) => {
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

export function CustomEdge({
                               id,
                               sourceX,
                               sourceY,
                               targetX,
                               targetY,
                               sourcePosition,
                               targetPosition,
                               style = {},
                               data,
                               arrowHeadType,
                               markerEndId,
                           }) {
    const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <text>
                <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
                    {data.text}
                </textPath>
            </text>
        </>
    );
}
