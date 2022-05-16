import React, {memo, useEffect, useState} from 'react';
import './BaseNode.css';

import {Handle, Position} from 'react-flow-renderer';
import {BLOCK_ARGUMENT, CLFlowBlockArgumentType, CLFlowBlockOutputsType, CLFlowBlockType} from "../../Blocks/Blocks";
import {Dropdown, TextField, Toggle} from "@fluentui/react";

const toString = (obj: any) => JSON.stringify(obj, null, 2);

export const BaseNode = memo((props: any) => {
    const data = props.data as CLFlowBlockType;
    const [showLogs, setShowLogs] = useState(data.showLogs);

    useEffect(() => {
        data.showLogs = showLogs;
    }, [showLogs]);

    const nodeClassNames = ['cl-flow__node'];
    if (data.highlighted) {
        nodeClassNames.push('cl-flow__node--highlighted');
    }

    return (
        <div className={nodeClassNames.join(' ')}>
            <div className="cl-flow__node__dots-inputs">
                {data.inputs.map((input, index) => {
                    return (
                        <Handle
                            id={input.id}
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

            <div className="cl-flow__node__body" style={{
                borderColor: data.color || ''
            }}>
                <div className="cl-flow__node__progress"  style={{ backgroundColor: data.color || '' }} />
                <div className="cl-flow__node__type">
                    {data.type}
                </div>
                <div className="cl-flow__node__description">{data.description}</div>
                <div className="cl-flow__node__args">
                    { Object.values(data.args)?.map((arg: CLFlowBlockArgumentType, index) => {
                        if (arg.type === BLOCK_ARGUMENT.number) {
                            return (
                                <TextField
                                    key={index}
                                    width="100%"
                                    type="number"
                                    suffix={arg.suffix}
                                    defaultValue={arg.value || ''}
                                    onChange={(e:any) => { arg.value = e.target.value }}
                                />
                            );
                        }

                        if (arg.type === BLOCK_ARGUMENT.dropdown) {
                            return (
                                <Dropdown key={index} options={arg?.options || []} defaultSelectedKey={arg?.value as undefined} />
                            )
                        }

                        if (arg.type === BLOCK_ARGUMENT.string) {
                            return (
                                <TextField
                                    key={index}
                                    width="100%"
                                    defaultValue={arg.value as undefined}
                                    onChange={(e:any) => { arg.value = e.target.value }}
                                />
                            )
                        }

                        if (arg.type === BLOCK_ARGUMENT.picker) {
                            return (
                                <TextField
                                    key={index}
                                    width="100%"
                                    placeholder="Keys to pluck separated by a comma"
                                    defaultValue={arg.value as undefined}
                                    onChange={(e:any) => { arg.value = e.target.value }}
                                />
                            )
                        }

                        if (arg.type === BLOCK_ARGUMENT.preview) {
                            return <pre key={index} className="cl-flow__node__args--preview">
                                { JSON.stringify(arg.value, null, 2) }
                            </pre>
                        }

                        return (
                            <div key={index}>{ JSON.stringify(arg) }</div>
                        )
                    }) }
                </div>

                <div className="cl-flow__node__actions">
                    <Toggle checked={showLogs} className="cl-flow__node__toggle_logs" onChange={() => setShowLogs(!showLogs)} />
                    <div className="cl-flow__node__delete">×</div>
                </div>

                { showLogs && (
                    <div className="cl-flow__node__logs">
                        { JSON.stringify(data.lastValue, null, 2) }
                    </div>
                )}
            </div>

            <div className="cl-flow__node__dots-outputs">
                {data.outputs.map((output: CLFlowBlockOutputsType, index: number) => {
                    return (
                        <Handle
                            id={output.id}
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
