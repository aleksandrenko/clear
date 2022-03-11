import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import './styles.css';
import {
    TextField,
    Dropdown,
    Stack,
    Text,
    SpinButton,
    Position, Checkbox, Button, PrimaryButton, IconButton
} from "@fluentui/react";
import uuid from "../../utils/uuid";

const PRIMITIVES_TYPES = {
    fn: 'fn',
    object: '{}}',
    array: '[]',
    string: 'string',
    number: 'number',
    boolean: 'boolean',
}

const PRIMITIVES = [
    {
        id: PRIMITIVES_TYPES.fn,
        name: 'Function',
        options: {
            params: true,
            output: true
        }
    },
    {
        id: PRIMITIVES_TYPES.object,
        name: 'Object',
        options: {
            keys: true
        }
    },
    {
        id: PRIMITIVES_TYPES.array,
        name: 'Array',
        options: {
            type: true
        }
    },
    {
        id: PRIMITIVES_TYPES.string,
        name: 'String',
        options: {
            minLength: true,
            maxLength: true
        }
    },
    {
        id: PRIMITIVES_TYPES.number,
        name: 'Number',
        options: {
            min: true,
            max: true
        }
    },
    {
        id: PRIMITIVES_TYPES.boolean,
        name: 'Boolean',
        options: {}
    },
];

interface IObjectElement {
    key: string,
    type: string,
    required: boolean
}

interface IType {
    id: string,
    name: string,
    type: string | undefined,
    defaultValue: string | undefined,
    required: boolean,
    options: {
        min?: number,
        max?: number,
        minLength?: number,
        maxLength?: number
        elementsType?: string,
        elements?: IObjectElement[]
    }
}

const emptyType:IType = {
    id: '',
    name: '',
    type: undefined,
    defaultValue: undefined,
    required: true,
    options: {}
}

const emptyElement:IObjectElement = {
    key: '',
    type: '',
    required: true
}

const Types = () => {
    let params = useParams();
    const [types, setTypes] = useState<IType[]>([]);

    const [type, setType] = useState<IType>(emptyType);
    const [element, setElement] = useState<IObjectElement>(emptyElement);

    const typeOptions = PRIMITIVES.map((type) => {
        return {
            key: type.id,
            text: type.name
        }
    });

    const onTypePropChange = (propName: string, newValue: any | undefined) => {
        setType({
            ...type,
            [propName]: newValue
        })
    }

    const onTypeOptionsChange = (propName: string, newValue: any | undefined) => {
        setType({
            ...type,
            options: {
                ...type.options,
                [propName]: newValue
            }
        })
    }

    const onSaveType = () => {
        setTypes([
            ...types,
            {
                ...type,
                id: uuid()
            },
        ]);

        setType(emptyType);
    }

    return (
       <div className='types-module'>
           <Stack
               horizontal={false}
               disableShrink
               wrap={false}
               tokens={{
                   childrenGap: 15,
               }}
           >
               <Text variant="large">New Type</Text>

               <Stack
                   horizontal
                   disableShrink
                   wrap={false}
                   tokens={{
                       childrenGap: 5,
                   }}
               >
                   <Stack.Item grow style={{ width: "50%" }}>
                       <TextField
                           value={type.name}
                           placeholder="Name"
                           onChange={(e, newValue) => onTypePropChange('name', newValue) }
                       />
                   </Stack.Item>

                   <Stack.Item grow style={{ width: "50%" }}>
                       <Dropdown
                           placeholder="Type"
                           selectedKey={type.type}
                           onChange={(event, item) => {
                               onTypePropChange('type', item?.key);
                           }}
                           options={typeOptions}
                       />
                   </Stack.Item>
               </Stack>

               <Stack
                   horizontal
                   verticalAlign="center"
                   disableShrink
                   wrap={false}
                   tokens={{
                       childrenGap: 5,
                   }}
               >
                   <Stack.Item grow style={{ width: "50%" }}>
                       <TextField
                           disabled={type.type === PRIMITIVES_TYPES.fn}
                           value={type.defaultValue}
                           placeholder="Default value"
                           onChange={(e, newValue) => {
                               onTypePropChange('defaultValue', newValue);
                           }}
                       />
                   </Stack.Item>

                   <Stack.Item grow style={{ width: "50%" }}>
                       <Checkbox
                           label="Required"
                           checked={type.required}
                           onChange={(e, newValue) => {
                               onTypePropChange('required', newValue);
                           }} />
                   </Stack.Item>
               </Stack>


               { type.type === PRIMITIVES_TYPES.array && (
                   <Stack
                       horizontal
                       disableShrink
                       wrap={false}
                       tokens={{
                           childrenGap: 5,
                       }}
                   >
                       <Stack.Item grow style={{ width: "50%" }}>
                           <Dropdown
                               placeholder="Elements Type"
                               selectedKey={type.options.elementsType || undefined}
                               onChange={(event, item) => {
                                   onTypeOptionsChange('elementsType', item?.key);
                               }}
                               options={typeOptions}
                           />
                       </Stack.Item>
                       <Stack.Item grow style={{ width: "50%" }}>
                           &nbsp;
                       </Stack.Item>
                   </Stack>
               )}

               { type.type === PRIMITIVES_TYPES.object && (
                   <>
                       <Stack.Item>
                           <Text variant="medium">Object Elements:</Text>
                       </Stack.Item>

                       <Stack
                           horizontal
                           disableShrink
                           wrap={false}
                           tokens={{
                               childrenGap: 5,
                           }}
                       >
                           <Stack.Item grow style={{ width: "50%" }}>
                               <TextField
                                   value={element.key}
                                   placeholder="key"
                                   onChange={(e, newValue) => {
                                       setElement({
                                           ...element,
                                           key: newValue || ''
                                       });
                                   }}
                               />
                           </Stack.Item>
                           <Stack.Item grow style={{ width: "40%" }}>
                               <Dropdown
                                   placeholder="Element Type"
                                   selectedKey={element.key}
                                   onChange={(e, newValue) => {
                                       setElement({
                                           ...element,
                                           type: newValue?.key as string || ''
                                       });
                                   }}
                                   options={typeOptions}
                               />
                           </Stack.Item>
                           <Stack.Item grow style={{ width: "5%" }} align="center">
                               <Checkbox
                                   checked={element.required}
                                   onChange={(e, newValue) => {
                                       setElement({
                                           ...element,
                                           required: !!newValue
                                       });
                                   }}
                               />
                           </Stack.Item>
                           <Stack.Item grow style={{ width: "5%" }}>
                               <IconButton iconProps={{ iconName: 'add' }} onClick={() => {
                                   setType({
                                       ...type,
                                       options: {
                                           ...type.options,
                                           elements: [
                                               ...type.options.elements || [],
                                               element
                                           ]
                                       }
                                   });

                                   setElement(emptyElement);
                               }} />
                           </Stack.Item>
                       </Stack>
                       {
                           type.options.elements && type.options.elements.map((element) => {
                                return (
                                    <div>
                                        <span className="type--name">{element.key}</span>
                                        <span className="type--required">{!element.required && '?'}</span>
                                        <span className="type--char">:</span>
                                        <span className="type--type">{element.type}</span>
                                    </div>
                                )
                           })
                       }
                   </>
               )}

               <br/>

               { type.type === PRIMITIVES_TYPES.string && (
               <Stack
                   horizontal
                   disableShrink
                   wrap={false}
                   tokens={{
                       childrenGap: 5,
                   }}
               >
                   <Stack.Item grow style={{ width: "50%" }}>
                       <SpinButton
                           onChange={(e, newValue) => {
                               onTypeOptionsChange('minLength', newValue);
                           }}
                           labelPosition={Position.top}
                           label="Min Length"
                           min={0}
                           max={9999999}
                           step={1}
                       />
                   </Stack.Item>
                   <Stack.Item grow style={{ width: "50%" }}>
                       <SpinButton
                           onChange={(e, newValue) => {
                               onTypeOptionsChange('maxLength', newValue);
                           }}
                           labelPosition={Position.top}
                           label="Max Length"
                           min={0}
                           max={9999999}
                           step={1}
                       />
                   </Stack.Item>
               </Stack>
               )}

               { type.type === PRIMITIVES_TYPES.number && (
                   <Stack
                       horizontal
                       disableShrink
                       wrap={false}
                       tokens={{
                           childrenGap: 5,
                       }}
                   >
                       <Stack.Item grow style={{ width: "50%" }}>
                           <SpinButton
                               onChange={(e, newValue) => {
                                   onTypeOptionsChange('min', newValue);
                               }}
                               placeholder="min"
                               labelPosition={Position.top}
                           />
                       </Stack.Item>

                       <Stack.Item grow style={{ width: "50%" }}>
                           <SpinButton
                               onChange={(e, newValue) => {
                                   onTypeOptionsChange('max', newValue);
                               }}
                               placeholder="max"
                               labelPosition={Position.top}
                           />
                       </Stack.Item>
                   </Stack>
               )}

               <Stack
                   horizontal
                   disableShrink
                   wrap={false}
                   tokens={{
                       childrenGap: 5,
                   }}
                   horizontalAlign="end"
               >
                    <Button>Close</Button>
                    <PrimaryButton
                        disabled={!type.name || !type.type}
                        onClick={onSaveType}
                    >
                        Create
                    </PrimaryButton>
               </Stack>

           </Stack>

           <div>
               {
                   types.map((type) => (
                       <div className="type">
                           <span className="type--name">{type.name}</span>
                           <span className="type--required">{!type.required && '?'}</span>
                           <span className="type--char">:</span>
                           <span className="type--type">{type.type}</span>

                           { type.defaultValue && (
                               <>
                                   <span className="type--char"> = </span>
                                   <span className="type--default-value">
                                       {type.type === PRIMITIVES_TYPES.string && '"'}
                                       {type.defaultValue}
                                       {type.type === PRIMITIVES_TYPES.string && '"'}
                                   </span>
                               </>
                           )}
                       </div>
                   ))
               }
           </div>
       </div>
    )
}

export default Types;
