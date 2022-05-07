import React from 'react';
import { useConst } from '@fluentui/react-hooks';

import {
    ContextualMenuItemType,
    DefaultButton,
    IContextualMenuProps,
} from "@fluentui/react";
import {NODE_TYPES} from "../Nodes";

//inspiration ideas, naming
//https://rxjs.dev/guide/operators#multicasting-operators

export type CLFlowBlockInputsType = {
    name: string,
    func: (data: any) => any
}

export type CLFlowBlockOutputsType = {
    name: string,
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
    preview: 'preview'
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
    color: BLOCK_COLORS.blue,
    args: [
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: 'onClick',
            options: [
                { key: 'onClick', text: 'onClick' },
                { key: 'onChange', text: 'onChange' },
                { key: 'onSubmit', text: 'onSubmit' }
                //other dom events
            ]
        },
        {
            type: BLOCK_ARGUMENT.dropdown,
            defaultValue: '#btn_1',
            options: [
                { key: '#btn_1', text: '#btn_1' },
                { key: '#submit_form1_btn', text: '#submit_form1_btn' },
                //other dom events
            ]
        }
    ],
    inputs: [],
    outputs: [
        {
            name: 'onClick',
            func: (data) => {
                console.log('onClick func', data);
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
            func: (data) => {
                console.log('onClick func', data);
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
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
            func: (data) => {
                console.log('onClick func', data);
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
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'onSuccess',
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'onError',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Transform: CLFlowBlockType = {
    type: 'Transform',
    color: BLOCK_COLORS.magenta,
    inputs: [
    {
        name: 'Input',
        func: (data) => {
            console.log('onClick func', data);
        }
    }
    ],
        outputs: [
        {
            name: 'Output',
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
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'Input',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
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
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
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
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'Input',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'Output',
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
            { key: 'event', text: 'Dom Event', block: Event },
            { key: 'timer', text: 'Timer', block: Timer },
            { key: 'constant', text: 'Constant', block: Constant },

            { key: 'inputs_others', itemType: ContextualMenuItemType.Divider },
            { key: 'other', text: 'Others (in/out)', itemType: ContextualMenuItemType.Header },
            { key: 'delay', text: 'Delay', block: Delay },

            { key: 'inputs_process', itemType: ContextualMenuItemType.Divider },
            { key: 'process', text: 'Process (in/out)', itemType: ContextualMenuItemType.Header },
            { key: 'httpRequest', text: 'HTTPRequest', block: HTTPRequest },
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
        <DefaultButton text="New Node" menuProps={menuProps} />
    );
}
