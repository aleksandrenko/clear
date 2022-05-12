import React from 'react';
import { useConst } from '@fluentui/react-hooks';

import {
    ContextualMenuItemType,
    DefaultButton,
    IContextualMenuProps,
} from "@fluentui/react";
import {NODE_TYPES} from "../Nodes";
import uuid from "../../../utils/uuid";

//inspiration ideas, naming
//https://rxjs.dev/guide/operators#multicasting-operators

export type CLFlowBlockInputsType = {
    name: string,
    id: string,
    func: (data: any) => any
}

export type CLFlowBlockOutputsType = {
    name: string,
    id: string,
    func: (data: any) => any
}

//https://blog.lsonline.fr/fluent-ui-core-color/
export const BLOCK_COLORS = {
    blue: '#71AFE5',
    magenta: '#B4009E',
    teal: '#00B294',
    orange: '#FF8C00'
}

export const BLOCK_ARGUMENT = {
    number: 'number',
    dropdown: 'dropdown',
    string: 'string',
    preview: 'preview',
    picker: 'picker'
}

export type CLFlowBlockArgumentType = {
    name?: string,
    type: string,
    disabled?: boolean,
    defaultValue?: string | number | boolean | null
    value?: any,
    suffix?: string,
    options?: any[]
}

export type CLFlowBlockType = {
    type: string,
    isRunnable?: boolean,
    highlighted?: boolean,
    color?: string,
    nodeType?: string,
    description?: string,
    args?: CLFlowBlockArgumentType[],
    inputs: CLFlowBlockInputsType[],
    outputs: CLFlowBlockOutputsType[]
}

// Inputs (start blocks)
const Event: CLFlowBlockType = {
    type: 'Event',
    isRunnable: true,
    highlighted: false,
    color: BLOCK_COLORS.blue,
    args: [
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: 'onClick',
            options: [
                { key: 'onClick', text: 'onClick' },
                { key: 'onChange', text: 'onChange' },
                { key: 'onEnter', text: 'onEnter' },
                { key: 'onExit', text: 'onEnter' },
                { key: 'onPropChange', text: 'onPropChange' },
                //other dom events
            ]
        },
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: '#btn_1',
            options: [
                { key: 'btn_1', text: '#btn_1' },
                { key: 'submit_form1_btn', text: '#submit_form1_btn' },
                //other dom events
            ]
        }
    ],
    inputs: [],
    outputs: [
        {
            name: 'onClick',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
                return data + "_clicked_";
            }
        }
    ]
}

const Timer: CLFlowBlockType = {
    type: 'Timer',
    color: BLOCK_COLORS.blue,
    args: [{
        type: BLOCK_ARGUMENT.number,
        suffix: 'ms',
        defaultValue: 500
    }],
    nodeType: NODE_TYPES.baseNode,
    inputs: [],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                setInterval(() => {
                    console.log('ddd');
                }, 500);
            }
        }
    ]
}

// Other
const Constant: CLFlowBlockType = {
    type: 'Constant',
    color: BLOCK_COLORS.blue,
    args: [{
        type: BLOCK_ARGUMENT.string,
        defaultValue: ''
    }],
    inputs: [],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

// Other
const StateValue: CLFlowBlockType = {
    type: 'State Value',
    color: BLOCK_COLORS.blue,
    args: [
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: '',
            options: [
                { key: 'state.something', text: 'state.something' },
                { key: 'state.something.else', text: 'state.something.else' },
                { key: 'state.something.something', text: 'state.something.something' },
            ]
        }
    ],
    inputs: [],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Delay: CLFlowBlockType = {
    type: 'Delay',
    color: BLOCK_COLORS.teal,
    args: [{
        type: BLOCK_ARGUMENT.number,
        suffix: 'ms',
        defaultValue: 500
    }],
    inputs: [
        {
            name: 'Input',
            id: uuid(),
            func: (data) => {
                console.log('Delay input func', data);
                return data + "_delayed_";
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('Delay output func', data);
                return data;
            }
        }
    ]
}

// Process
const HTTPRequest: CLFlowBlockType = {
    type: 'HTTPRequest',
    color: BLOCK_COLORS.magenta,
    inputs: [
        {
            name: 'Iutput',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'onSuccess',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'onError',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Pluck: CLFlowBlockType = {
    type: 'Pluck',
    color: BLOCK_COLORS.magenta,
    args: [
        {
            type: BLOCK_ARGUMENT.picker,
            defaultValue: '',
        }
    ],
    inputs: [
        {
            name: 'Input',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Transform: CLFlowBlockType = {
    type: 'Transform',
    color: BLOCK_COLORS.magenta,
    args: [
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: '',
            options: [
                { key: 'state.something', text: 'state.something' },
                { key: 'state.something.else', text: 'state.something.else' },
                { key: 'state.something.something', text: 'state.something.something' },
            ]
        }
    ],
    inputs: [
    {
        name: 'Input',
        id: uuid(),
        func: (data) => {
            console.log('onClick func', data);
        }
    }
    ],
        outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Join: CLFlowBlockType = {
    type: 'Join',
    color: BLOCK_COLORS.magenta,
    inputs: [
        {
            name: 'Input',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Filter: CLFlowBlockType = {
    type: 'Filter',
    color: BLOCK_COLORS.magenta,
    inputs: [
        {
            name: 'Input',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Conditional: CLFlowBlockType = {
    type: 'Conditional',
    color: BLOCK_COLORS.magenta,
    args: [
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: '===',
            options: [
                { key: '===', text: 'equal' },
                { key: '!==', text: 'equal' },
                { key: '>', text: '>' },
                { key: '>=', text: '>=' },
                { key: '<', text: '<' },
                { key: '<=', text: '<=' }
            ]
        }
    ],
    inputs: [
        {
            name: 'Input',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'Input',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
            id: uuid(),
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

// Output (end blocks)
const Mutation = {
    type: 'Mutation',
    color: BLOCK_COLORS.orange,
    args: [
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: '',
            options: [
                { key: 'store.user.firstname', text: 'store.user.firstname' },
                { key: 'store.user.lastname', text: 'store.user.lastname' }
            ]
        }
    ],
    inputs: [
        {
            name: 'Data',
            id: uuid(),
            func: (data: any) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: []
}

const EventDispatch = {
    type: 'Event Dispatch',
    color: BLOCK_COLORS.orange,
    inputs: [
        {
            name: 'Data',
            id: uuid(),
            func: (data: any) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: []
}

const Log: CLFlowBlockType = {
    type: 'Log',
    color: BLOCK_COLORS.orange,
    args: [{
        type: BLOCK_ARGUMENT.preview,
        value: {
            example: true,
            data: [],
            todo: 'this data should come from the input func'
        }
    }],
    inputs: [
        {
            name: 'Input',
            id: uuid(),
            func: (data) => {
                console.log(data);
                return data;
            }
        }
    ],
    outputs: []
}

type BlocksSelector = {
    onSelect: (block: any) => {}
}

export const Blocks = ({ onSelect }: BlocksSelector) => {
    const menuProps = useConst<IContextualMenuProps>(() => ({
        shouldFocusOnMount: true,
        onItemClick: (e, item) => {
            onSelect(item?.block as CLFlowBlockType)
        },
        items: [
            { key: 'inputs_divider', itemType: ContextualMenuItemType.Divider },
            { key: 'input', text: 'Inputs (out)', itemType: ContextualMenuItemType.Header },
            { key: 'event', text: 'Events', block: Event },
            { key: 'timer', text: 'Timer', block: Timer },
            { key: 'constant', text: 'Constant', block: Constant },
            { key: 'state_value', text: 'State Value', block: StateValue },

            { key: 'inputs_others', itemType: ContextualMenuItemType.Divider },
            { key: 'other', text: 'Others (in/out)', itemType: ContextualMenuItemType.Header },
            { key: 'delay', text: 'Delay', block: Delay },

            { key: 'inputs_process', itemType: ContextualMenuItemType.Divider },
            { key: 'process', text: 'Process (in/out)', itemType: ContextualMenuItemType.Header },
            { key: 'httpRequest', text: 'HTTPRequest', block: HTTPRequest },
            { key: 'pluck', text: 'Pluck', block: Pluck },
            { key: 'transform', text: 'Transform', block: Transform },
            { key: 'join', text: 'Join', block: Join },
            { key: 'filter', text: 'Filter', block: Filter },
            { key: 'conditional', text: 'Conditional', block: Conditional },

            { key: 'inputs_outputs', itemType: ContextualMenuItemType.Divider },
            { key: 'output', text: 'Outputs (out)', itemType: ContextualMenuItemType.Header },
            { key: 'mutation', text: 'Mutation', block: Mutation },
            { key: 'eventDispatch', text: 'Event Dispatch', block: EventDispatch },
            { key: 'log', text: 'Log', block: Log },
        ],
    }));


    //TODO: filter the available blocks based on context - only inputs or no inputs
    return (
        <DefaultButton text="Add Function" menuProps={menuProps} />
    );
}
