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
                {data.inputs.map((input, index) => {
                    return (
                        <Handle
                            id={data.id + '_' + input.name}
                            key={index}
                            type="target"
                            isConnectable
                            className="nma--flow-node--dot"
                        >
                            <div className="nma--flow-node--dot-name">{input.name}</div>
                        </Handle>
                    )
                })}
            </div>

            <div className={nodeBodyClasses}>
                <div className="nma--flow-node--type">{data.type}:</div>
                <div className="nma--flow-node--label">{data.name}</div>
                <div className="nma--flow-node--delete">×</div>
            </div>

            <div className="nma--flow-node--dots-outputs">
                {data.outputs.map((output, index) => {
                    return (
                        <Handle
                            id={data.id + '_' + output.name}
                            key={index}
                            type="source"
                            isConnectable
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
