import React, {memo} from 'react';
import './FlowNode.css';

import {Handle} from 'react-flow-renderer';

const defData = {
    type: 'click:',
    name: '#submit_btn',
    inputs: [
        {
            name: 'data'
        }
    ],
    outputs: [
        {
            name: 'onTrue'
        },
        {
            name: 'onFalse'
        }
    ]
};

export const FlowNode = memo(({data = defData}) => {

    let nodeBodyClasses = `nma--flow-node-body nma--flow-node-body__${data.type}`;

    if (data.executed) {
        nodeBodyClasses += ' nma--flow-node-body__executed';
    }

    return (
        <div className="nma--flow-node">
            <div className="nma--flow-node--dots-inputs">
                {data.inputs.map((input, index, allInputs) => {
                    return (
                        <Handle
                            id={input.name}
                            key={index}
                            type="target"
                            isConnectable
                            onConnect={(params) => console.log('handle onConnect', params)}
                            className="nma--flow-node--dot"
                        >
                            <div className="nma--flow-node--dot-name">{input.name}</div>
                        </Handle>
                    )
                })}
            </div>

            <div className={nodeBodyClasses}>
                <div className="nma--flow-node--type">{data.type} ({data.id}):</div>
                <div className="nma--flow-node--label">{data.name}</div>
            </div>

            <div className="nma--flow-node--dots-outputs">
                {data.outputs.map((output, index, allInputs) => {
                    return (
                        <Handle
                            id={output.name}
                            key={index}
                            type="source"
                            isConnectable
                            onConnect={(params) => console.log('handle onConnect', params)}
                            className="nma--flow-node--dot"
                        >
                            <div className="nma--flow-node--dot-name">{output.name}</div>
                        </Handle>
                    )
                })}
            </div>
        </div>
    );
});
