import React, { memo } from 'react';
import './CustomNode.css';

import { Handle } from 'react-flow-renderer';

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

export const CustomNode = memo(({ data = defData }) => {

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
                            <div className="nma--flow-node--dot-name">{ input.name }</div>
                        </Handle>
                    )
                })}
            </div>

            <div className={nodeBodyClasses}>
                <div className="nma--flow-node--type">{ data.type }:</div>
                <div className="nma--flow-node--label">{ data.name }</div>

                <span className="drag-handle">
          <svg width="100%" height="100%">
            <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" d="M8,18 C9.1045695,18 10,18.8954305 10,20 C10,21.1045695 9.1045695,22 8,22 C6.8954305,22 6,21.1045695 6,20 C6,18.8954305 6.8954305,18 8,18 Z M16,18 C17.1045695,18 18,18.8954305 18,20 C18,21.1045695 17.1045695,22 16,22 C14.8954305,22 14,21.1045695 14,20 C14,18.8954305 14.8954305,18 16,18 Z M8,10 C9.1045695,10 10,10.8954305 10,12 C10,13.1045695 9.1045695,14 8,14 C6.8954305,14 6,13.1045695 6,12 C6,10.8954305 6.8954305,10 8,10 Z M16,10 C17.1045695,10 18,10.8954305 18,12 C18,13.1045695 17.1045695,14 16,14 C14.8954305,14 14,13.1045695 14,12 C14,10.8954305 14.8954305,10 16,10 Z M8,2 C9.1045695,2 10,2.8954305 10,4 C10,5.1045695 9.1045695,6 8,6 C6.8954305,6 6,5.1045695 6,4 C6,2.8954305 6.8954305,2 8,2 Z M16,2 C17.1045695,2 18,2.8954305 18,4 C18,5.1045695 17.1045695,6 16,6 C14.8954305,6 14,5.1045695 14,4 C14,2.8954305 14.8954305,2 16,2 Z"/>
          </svg>
        </span>
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
                            <div className="nma--flow-node--dot-name">{ output.name }</div>
                        </Handle>
                    )
                })}
            </div>
        </div>
    );
});
