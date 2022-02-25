import React, {useState} from "react";

interface IProps {
    libComponents: any
    addFunction: any
    onSelect: any
};

const LibComponentsSelectModal = (props: IProps) => {
    const {
        libComponents,
        addFunction,
        onSelect
    } = props;

    if (!addFunction) {
        return null;
    }

    return (
        <div className="modal-select-component-wrapper">
            <div className="modal-select-component">
                <h4>Libs Components</h4>
                {
                    libComponents.map((lib: any) => {
                        return (
                            <div>
                                <strong>{lib.name}</strong>
                                <div className="lib-components">
                                    {lib.components.map((component: any, index: number) => {
                                        return (
                                            <div key={index} className="lib-component" onClick={() => onSelect(component)}>{ component.name }</div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default LibComponentsSelectModal;
