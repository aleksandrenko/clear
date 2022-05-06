import React, {memo} from 'react';
import './BaseNode.css';

import {Handle, Position} from 'react-flow-renderer';

export const BaseNode = memo((props) => {
    console.log('props', props);
    const { data, id } = props;

    return (
        <div className="cl-flow__node">
            <div className="cl-flow__node__dots-inputs">
                {data.inputs.map((input, index) => {
                    return (
                        <Handle
                            id={id + '_' + input.name + '_' + 'index'}
                            key={index}
                            type="target"
                            isConnectable
                            className="cl-flow__node__dot"
                            position={Position.Left}
                        >
                            <div className="cl-flow__node__dot-name">{input.name}</div>
                        </Handle>
                    )
                })}
            </div>

            <div className="cl-flow__node__body">
                <div className="cl-flow__node__type">{data.type}:</div>
                <div className="cl-flow__node__label">{data.name}</div>
                <div className="cl-flow__node__delete">×</div>
            </div>

            <div className="cl-flow__node__dots-outputs">
                {data.outputs.map((output, index) => {
                    return (
                        <Handle
                            id={id + '_' + output.name + '_' + index}
                            key={index}
                            type="source"
                            isConnectable
                            className="cl-flow__node__dot"
                            position={Position.Right}
                        >
                            <div className="cl-flow__node__dot-name">{output.name}</div>
                        </Handle>
                    )
                })}
            </div>
        </div>
    );
});
