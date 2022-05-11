import React, {memo} from 'react';
import './BaseNode.css';

import {Handle, Position} from 'react-flow-renderer';
import {BLOCK_ARGUMENT, CLFlowBlockArgumentType, CLFlowBlockOutputsType, CLFlowBlockType} from "../../Blocks/Blocks";
import {Dropdown, TagPicker, TextField} from "@fluentui/react";

export const BaseNode = memo((props: any) => {
    const id = props.id;
    const data = props.data as CLFlowBlockType;

    return (
        <div className="cl-flow__node">
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
                <div className="cl-flow__node__type">{data.type}</div>
                <div className="cl-flow__node__description">{data.description}</div>
                <div className="cl-flow__node__args">
                    { data.args?.map((arg: CLFlowBlockArgumentType, index) => {
                        if (arg.type === BLOCK_ARGUMENT.number) {
                            return <TextField key={index} width="100%" label={arg.name} type="number" suffix={arg.suffix} defaultValue={arg.defaultValue as undefined} />
                        }

                        if (arg.type === BLOCK_ARGUMENT.dropdown) {
                            return (
                                <Dropdown key={index} label={arg.name || ''} options={arg?.options || []} defaultSelectedKey={arg?.defaultValue as undefined} />
                            )
                        }

                        if (arg.type === BLOCK_ARGUMENT.string) {
                            return <TextField key={index} width="100%" label={arg.name} defaultValue={arg.defaultValue as undefined} />
                        }

                        if (arg.type === BLOCK_ARGUMENT.picker) {
                            return <TextField key={index} width="100%" label={arg.name} placeholder="Keys to pluck separated by a comma" defaultValue={arg.defaultValue as undefined} />

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
                <div className="cl-flow__node__delete">×</div>
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
