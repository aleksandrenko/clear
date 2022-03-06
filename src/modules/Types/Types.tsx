import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import './styles.css';
import {
    TextField,
    Text,
    Dropdown,
    DropdownMenuItemType,
    IDropdownOption,
    Checkbox,
    Toggle,
    SpinButton, Position
} from "@fluentui/react";

const Types = () => {
    let params = useParams();
    const [selectedType, setSelectedType] = React.useState<IDropdownOption>();
    const [name, setName] = useState<string | undefined>();

    return (
       <div className='types-module'>
           <TextField
               label="New type"
               description="3 charecters min"
               value={name}
               placeholder="Name"
               onChange={(e, newValue) => setName(newValue) }
           />

           <Dropdown
               disabled={!name || name.length < 3}
               placeholder="Choose a type"
               label="Select a Type"
               selectedKey={selectedType ? selectedType.key : undefined}
               onChange={(event, item) => setSelectedType(item)}
               options={[
                   { key: 'primitiveHead', text: 'Primitive', itemType: DropdownMenuItemType.Header },
                   { key: 'fn', text: 'fn'},
                   { key: 'object', text: 'object' },
                   { key: 'array', text: 'array' },
                   { key: 'string', text: 'string' },
                   { key: 'number', text: 'number' },
                   { key: 'boolean', text: 'boolean' },
                   { key: 'null', text: 'null' },

                   { key: 'userDefined', text: 'User Defined', itemType: DropdownMenuItemType.Header },
                   { key: 'undefined', text: '-', disabled: true },
               ]}
           />

           <br/>
           <Text>Options</Text>
           <br/><br/>
           <Toggle onText="Required" offText="Optional" />

           <br/>
           <SpinButton
               labelPosition={Position.top}
               defaultValue="0"
               label="Min Length"
               min={0}
               max={999999}
               step={1}
           />
           <br/>
           <SpinButton
               labelPosition={Position.top}
               defaultValue="255"
               label="Max Length"
               min={0}
               max={999999}
               step={1}
           />
           <br/>
           <TextField
               label="Default Value"
               description="get min and max here"
               value={undefined}
               placeholder=""
               onChange={(e, newValue) => setName(newValue) }
           />



           <br/><br/>
           TYPES MANAGER
           <div>
               <b>User</b>
               <br/>
                 name: string
               <br/>
                 age?: number
               <br/>
                 friends: User[]
               <br/>
                 onUpdate: fn(a: string): void
           </div>
       </div>
    )
}

export default Types;
