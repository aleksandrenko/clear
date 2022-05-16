import React from 'react';
import { useConst } from '@fluentui/react-hooks';

import {
    ContextualMenuItemType,
    DefaultButton,
    IContextualMenuProps,
} from "@fluentui/react";
import {NODE_TYPES} from "../Nodes";
import uuid from "../../../utils/uuid";
import {deepCopy} from "../../../utils/deepCopy";

//inspiration ideas, naming
//https://rxjs.dev/guide/operators#multicasting-operators

export type CLFlowBlockInputsType = {
    name: string,
    id: string,
}

export type CLFlowBlockOutputsType = {
    name: string,
    id: string,
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
    type: string,
    value: any,
    suffix?: string,
    options?: any[]
}

export type CLFlowBlockType = {
    type: string,
    isRunnable?: boolean,
    highlighted?: boolean,
    showLogs?: boolean,
    color?: string,
    nodeType?: string,
    description?: string,
    args: { [key: string]: CLFlowBlockArgumentType },
    func: (data: any, args: { [key: string]: any }) => any,
    lastValue?: any,
    inputs: CLFlowBlockInputsType[],
    outputs: CLFlowBlockOutputsType[]
}

// Inputs (start blocks)
const Event: CLFlowBlockType = {
    type: 'Event',
    isRunnable: true,
    highlighted: false,
    showLogs: false,
    color: BLOCK_COLORS.blue,
    args: {
        event: {
            type: BLOCK_ARGUMENT.dropdown,
            value: 'onClick',
            options: [
                { key: 'onClick', text: 'onClick' },
                { key: 'onChange', text: 'onChange' },
                { key: 'onEnter', text: 'onEnter' },
                { key: 'onExit', text: 'onEnter' },
                { key: 'onPropChange', text: 'onPropChange' },
                //other dom events
            ]
        },
        target: {
            type: BLOCK_ARGUMENT.dropdown,
            value: '#btn_1',
            options: [
                { key: 'btn_1', text: '#btn_1' },
                { key: 'submit_form1_btn', text: '#submit_form1_btn' },
                //other dom events
            ]
        }
    },
    func: (data) => {
        return data + "_clicked_";
    },
    inputs: [],
    outputs: [
        {
            name: 'onClick',
            id: uuid()
        }
    ]
}

// const Timer: CLFlowBlockType = {
//     type: 'Timer',
//     color: BLOCK_COLORS.blue,
//     args: [{
//         key: 'timer',
//         type: BLOCK_ARGUMENT.number,
//         suffix: 'ms',
//         value: 500
//     }],
//     nodeType: NODE_TYPES.baseNode,
//     inputs: [],
//     outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 setInterval(() => {
//                     console.log('ddd');
//                 }, 500);
//             }
//         }
//     ]
// }

// Other
// const Constant: CLFlowBlockType = {
//     type: 'Constant',
//     color: BLOCK_COLORS.blue,
//     args: [{
//         key: 'comparison',
//         type: BLOCK_ARGUMENT.string,
//         value: ''
//     }],
//     inputs: [],
//     outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }

// Other
// const StateValue: CLFlowBlockType = {
//     type: 'State Value',
//     color: BLOCK_COLORS.blue,
//     args: [
//         {
//             key: 'state_value',
//             type: BLOCK_ARGUMENT.dropdown,
//             value: '',
//             options: [
//                 { key: 'state.something', text: 'state.something' },
//                 { key: 'state.something.else', text: 'state.something.else' },
//                 { key: 'state.something.something', text: 'state.something.something' },
//             ]
//         }
//     ],
//     inputs: [],
//     outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }

const Delay: CLFlowBlockType = {
    type: 'Delay',
    color: BLOCK_COLORS.teal,
    highlighted: false,
    showLogs: true,
    args: {
        delay: {
            type: BLOCK_ARGUMENT.number,
            suffix: 'ms',
            value: 500
        }
    },
    func: (data, args) => {
        const delay = parseInt(args.delay);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data);
            }, delay || 100);
        });
    },
    lastValue: undefined,
    inputs: [
        {
            name: 'Input',
            id: uuid()
        }
    ],
    outputs: [
        {
            name: 'Output',
            id: uuid()
        }
    ]
}

// Process
// const HTTPRequest: CLFlowBlockType = {
//     type: 'HTTPRequest',
//     color: BLOCK_COLORS.magenta,
//     inputs: [
//         {
//             name: 'Iutput',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ],
//     outputs: [
//         {
//             name: 'onSuccess',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         },
//         {
//             name: 'onError',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }
//
// const Pluck: CLFlowBlockType = {
//     type: 'Pluck',
//     color: BLOCK_COLORS.magenta,
//     args: [
//         {
//             key: 'keys',
//             type: BLOCK_ARGUMENT.picker,
//             value: '',
//         }
//     ],
//     inputs: [
//         {
//             name: 'Input',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ],
//     outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }
//
// const Transform: CLFlowBlockType = {
//     type: 'Transform',
//     color: BLOCK_COLORS.magenta,
//     args: [
//         {
//             key: 'function',
//             type: BLOCK_ARGUMENT.dropdown,
//             value: '',
//             options: [
//                 { key: 'state.something', text: 'state.something' },
//                 { key: 'state.something.else', text: 'state.something.else' },
//                 { key: 'state.something.something', text: 'state.something.something' },
//             ]
//         }
//     ],
//     inputs: [
//     {
//         name: 'Input',
//         id: uuid(),
//         func: (data) => {
//             console.log('onClick func', data);
//         }
//     }
//     ],
//         outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }
//
// const Join: CLFlowBlockType = {
//     type: 'Join',
//     color: BLOCK_COLORS.magenta,
//     inputs: [
//         {
//             name: 'Input',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ],
//     outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }
//
// const Filter: CLFlowBlockType = {
//     type: 'Filter',
//     color: BLOCK_COLORS.magenta,
//     inputs: [
//         {
//             name: 'Input',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ],
//     outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }
//
// const Conditional: CLFlowBlockType = {
//     type: 'Conditional',
//     color: BLOCK_COLORS.magenta,
//     args: [
//         {
//             key: 'check',
//             type: BLOCK_ARGUMENT.dropdown,
//             value: '===',
//             options: [
//                 { key: '===', text: 'equal' },
//                 { key: '!==', text: 'equal' },
//                 { key: '>', text: '>' },
//                 { key: '>=', text: '>=' },
//                 { key: '<', text: '<' },
//                 { key: '<=', text: '<=' }
//             ]
//         }
//     ],
//     inputs: [
//         {
//             name: 'Input',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         },
//         {
//             name: 'Input',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ],
//     outputs: [
//         {
//             name: 'Output',
//             id: uuid(),
//             func: (data) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ]
// }
//
// // Output (end blocks)
// const Mutation = {
//     type: 'Mutation',
//     color: BLOCK_COLORS.orange,
//     args: [
//         {
//             type: BLOCK_ARGUMENT.dropdown,
//             value: '',
//             options: [
//                 { key: 'store.user.firstname', text: 'store.user.firstname' },
//                 { key: 'store.user.lastname', text: 'store.user.lastname' }
//             ]
//         }
//     ],
//     inputs: [
//         {
//             name: 'Data',
//             id: uuid(),
//             func: (data: any) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ],
//     outputs: []
// }
//
// const EventDispatch = {
//     type: 'Event Dispatch',
//     color: BLOCK_COLORS.orange,
//     inputs: [
//         {
//             name: 'Data',
//             id: uuid(),
//             func: (data: any) => {
//                 console.log('onClick func', data);
//             }
//         }
//     ],
//     outputs: []
// }
//

type BlocksSelector = {
    onSelect: (block: any) => {}
    disabled: boolean
}

export const Blocks = ({ onSelect, disabled }: BlocksSelector) => {
    const menuProps = useConst<IContextualMenuProps>(() => ({
        shouldFocusOnMount: true,
        onItemClick: (e, item) => {
            const selectedBlock = deepCopy(item?.block) as CLFlowBlockType;
            onSelect(selectedBlock);
        },
        items: [
            // { key: 'inputs_divider', itemType: ContextualMenuItemType.Divider },
            // { key: 'input', text: 'Inputs (out)', itemType: ContextualMenuItemType.Header },
            { key: 'event', text: 'Events', block: Event },
            // { key: 'timer', text: 'Timer', block: Timer },
            // { key: 'constant', text: 'Constant', block: Constant },
            // { key: 'state_value', text: 'State Value', block: StateValue },
            //
            { key: 'inputs_others', itemType: ContextualMenuItemType.Divider },
            // { key: 'other', text: 'Others (in/out)', itemType: ContextualMenuItemType.Header },
            { key: 'delay', text: 'Delay', block: Delay },

            // { key: 'inputs_process', itemType: ContextualMenuItemType.Divider },
            // { key: 'process', text: 'Process (in/out)', itemType: ContextualMenuItemType.Header },
            // { key: 'httpRequest', text: 'HTTPRequest', block: HTTPRequest },
            // { key: 'pluck', text: 'Pluck', block: Pluck },
            // { key: 'transform', text: 'Transform', block: Transform },
            // { key: 'join', text: 'Join', block: Join },
            // { key: 'filter', text: 'Filter', block: Filter },
            // { key: 'conditional', text: 'Conditional', block: Conditional },
            //
            // { key: 'inputs_outputs', itemType: ContextualMenuItemType.Divider },
            // { key: 'output', text: 'Outputs (out)', itemType: ContextualMenuItemType.Header },
            // { key: 'mutation', text: 'Mutation', block: Mutation },
            // { key: 'eventDispatch', text: 'Event Dispatch', block: EventDispatch },
        ],
    }));


    //TODO: filter the available blocks based on context - only inputs or no inputs
    return (
        <DefaultButton text="Add Function" menuProps={menuProps} disabled={disabled} />
    );
}
