import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import './styles.css';
import {
    TextField,
    Dropdown,
    IDropdownOption,
    Stack,
    Text,
    SpinButton,
    Position, Checkbox, Label, Button, PrimaryButton
} from "@fluentui/react";

const PRIMITIVES = [
    {
        id: 'fn',
        name: 'Function',
        options: {
            params: true,
            output: true
        }
    },
    {
        id: 'object',
        name: 'Object',
        options: {
            keys: true
        }
    },
    {
        id: 'array',
        name: 'Array',
        options: {
            type: true
        }
    },
    {
        id: 'string',
        name: 'String',
        options: {
            minLength: true,
            maxLength: true
        }
    },
    {
        id: 'number',
        name: 'Number',
        options: {
            min: true,
            max: true
        }
    },
    {
        id: 'boolean',
        name: 'Boolean',
        options: {}
    },
    {
        id: 'null',
        name: 'Null',
        options: {}
    }
];

const Types = () => {
    let params = useParams();

    const [selectedType, setSelectedType] = React.useState<IDropdownOption>();
    const [name, setName] = useState<string | undefined>();

    const typeOptions = PRIMITIVES.map((type) => {
        return {
            key: type.id,
            text: type.name
        }
    });

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
                           value={name}
                           placeholder="Name"
                           onChange={(e, newValue) => setName(newValue) }
                       />
                   </Stack.Item>

                   <Stack.Item grow style={{ width: "50%" }}>
                       <Dropdown
                           disabled={!name}
                           placeholder="Type"
                           selectedKey={selectedType?.id || undefined}
                           onChange={(event, item) => {
                               const selectedType = PRIMITIVES.find((type) => type.id === item?.key);
                               setSelectedType(selectedType);
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
                           value={undefined}
                           placeholder="Default value"
                           onChange={(e, newValue) => setName(newValue) }
                       />
                   </Stack.Item>

                   <Stack.Item grow style={{ width: "50%" }}>
                       <Checkbox label="Required" />
                   </Stack.Item>
               </Stack>

               <br/>

               { selectedType?.options.minLength && selectedType?.options.maxLength && (
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
                           labelPosition={Position.top}
                           defaultValue="0"
                           label="Min Length"
                           min={0}
                           max={999999}
                           step={1}
                       />
                   </Stack.Item>
                   <Stack.Item grow style={{ width: "50%" }}>
                       <SpinButton
                           labelPosition={Position.top}
                           defaultValue="255"
                           label="Max Length"
                           min={0}
                           max={999999}
                           step={1}
                       />
                   </Stack.Item>
               </Stack>
               )}

               { selectedType?.options.min && selectedType?.options.max && (
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
                               placeholder="min"
                               labelPosition={Position.top}
                           />
                       </Stack.Item>

                       <Stack.Item grow style={{ width: "50%" }}>
                           <SpinButton
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
                    <PrimaryButton>Create</PrimaryButton>
               </Stack>
           </Stack>
       </div>
    )
}

export default Types;
