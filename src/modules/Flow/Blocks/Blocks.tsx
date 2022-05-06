import React from 'react';
import { useConst } from '@fluentui/react-hooks';

import {
    ContextualMenuItemType,
    DefaultButton,
    Dropdown,
    DropdownMenuItemType,
    IContextualMenuProps,
    IDropdownOption
} from "@fluentui/react";

//inspiration ideas, naming
//https://rxjs.dev/guide/operators#multicasting-operators

export type CLFlowBlockType = {
    type: string,
    name?: string,
    executed?: boolean,
    inputs: any[],
    outputs: any[]
}

// Inputs (start blocks)
const Event: CLFlowBlockType = {
    type: 'Event',
    name: '#to be changed',
    executed: false,
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
    name: '#to be changed',
    executed: false,
    inputs: [],
    outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

// Other
const Constant: CLFlowBlockType = {
    type: 'Constant',
    name: '#to be changed',
    executed: false,
    inputs: [],
    outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Tap: CLFlowBlockType = {
    type: 'Tap',
    name: '#to be changed',
    executed: false,
    inputs: [
        {
            name: 'input',
            func: (data) => {
                console.log(data);
                return data;
            }
        }
    ],
    outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Delay: CLFlowBlockType = {
    type: 'Delay',
    name: '#to be changed',
    executed: false,
    inputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

// Process
const HTTPRequest: CLFlowBlockType = {
    type: 'HTTPRequest',
    name: '#to be changed',
    executed: false,
    inputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'success',
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'error',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Transform: CLFlowBlockType = {
    type: 'Transform',
        name: '#to be changed',
        executed: false,
        inputs: [
        {
            name: 'input',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
        outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Join: CLFlowBlockType = {
    type: 'Join',
    name: '#to be changed',
    executed: false,
    inputs: [
        {
            name: 'input',
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'input',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Filter: CLFlowBlockType = {
    type: 'Filter',
    name: '#to be changed',
    executed: false,
    inputs: [
        {
            name: 'input',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

const Conditional: CLFlowBlockType = {
    type: 'Conditional',
    name: 'todo',
    executed: false,
    inputs: [
        {
            name: 'input',
            func: (data) => {
                console.log('onClick func', data);
            }
        },
        {
            name: 'input',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: [
        {
            name: 'output',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ]
}

// Output (end blocks)
const Mutation = {
    type: 'Mutation',
    name: 'update some prop',
    executed: false,
    inputs: [
        {
            name: 'data',
            func: (data) => {
                console.log('onClick func', data);
            }
        }
    ],
    outputs: []
}

const EventDispatch = {
    type: 'Event Dispatch',
    name: 'dispatch some event',
    executed: false,
    inputs: [
        {
            name: 'data',
            func: (data) => {
                console.log('onClick func', data);
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
            console.log(item);
            onSelect(item.block)
        },
        items: [
            { key: 'inputs_divider', itemType: ContextualMenuItemType.Divider },
            { key: 'input', text: 'Inputs', itemType: ContextualMenuItemType.Header },
            { key: 'event', text: 'Dom Event', block: Event },
            { key: 'timer', text: 'Timer', block: Timer },

            { key: 'inputs_others', itemType: ContextualMenuItemType.Divider },
            { key: 'other', text: 'Others', itemType: ContextualMenuItemType.Header },
            { key: 'constant', text: 'Constant', block: Constant },
            { key: 'delay', text: 'Delay', block: Delay },
            { key: 'tap', text: 'Tap', block: Tap },

            { key: 'inputs_process', itemType: ContextualMenuItemType.Divider },
            { key: 'process', text: 'Process', itemType: ContextualMenuItemType.Header },
            { key: 'httpRequest', text: 'HTTPRequest', block: HTTPRequest },
            { key: 'transform', text: 'Transform', block: Transform },
            { key: 'join', text: 'Join', block: Join },
            { key: 'filter', text: 'Filter', block: Filter },
            { key: 'conditional', text: 'Conditional', block: Conditional },

            { key: 'inputs_outputs', itemType: ContextualMenuItemType.Divider },
            { key: 'output', text: 'Outputs', itemType: ContextualMenuItemType.Header },
            { key: 'mutation', text: 'Mutation', block: Mutation },
            { key: 'eventDispatch', text: 'Event Dispatch', block: EventDispatch },
        ],
    }));


    //TODO: filter the available blocks based on context - only inputs or no inputs
    return (
        <DefaultButton text="Add block" menuProps={menuProps} />
    );
}
