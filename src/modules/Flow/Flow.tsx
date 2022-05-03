import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    useUpdateNodeInternals,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType
} from 'react-flow-renderer';

import {useCallback, useState} from "react";
import {FlowNode} from "./FlowNode";

import './Flow.css'
import {ConnectionLine} from "./ConnectionLine";
import {NodeTypes} from "react-flow-renderer/dist/esm/types";

const nodeTypes: NodeTypes = {
    flowNode: FlowNode,
};

const edgeTypes = {
    connectionLine: ConnectionLine,
};

const getTarget = (source, sourceHandle) => {
    const edge = edges.find((edge => edge.source === source && edge.sourceHandle === sourceHandle));
    const endModule = blocks.find((block) => block.id === edge.target);
    //TODO: change this if there is more then 1 input.

    return endModule.inputs[0].func;
}

const blocks = [
    {
        id: "1",
        type: 'click',
        name: '#test_btn',
        executed: false,
        inputs: [],
        outputs: [
            {
                name: 'onClick',
                func: (data) => {
                    console.log('onClick func', data);
                    const targetInputFn = getTarget(1, 'onClick');
                    setTimeout(() => {
                        setTimeout(() => {
                            blocks[0].executed = false;

                        }, 500)

                        targetInputFn(data);
                    }, 500);
                }
            }
        ]
    },
    {
        id: "2",
        type: 'conditional',
        name: 'true/false',
        executed: false,
        inputs: [
            {
                name: 'data',
                func: (data) => {
                    console.log('conditional input', data);
                    /* TODO: find the connected block and call it's inputs */
                    blocks[1].executed = true;


                    setTimeout(() => {
                        setTimeout(() => {
                            blocks[1].executed = false;

                        }, 500);

                        if (data) {
                            blocks[1].outputs[0].func(data);
                        } else {
                            blocks[1].outputs[1].func(data);
                        }
                    }, 500);
                }
            }
        ],
        outputs: [
            {
                name: 'onTrue',
                func: (data) => {
                    console.log('conditional onTrue', data);
                    /* TODO: find the connected block and call it's inputs */
                    const targetInputFn = getTarget(2, 'onTrue');
                    targetInputFn(data);
                }
            },
            {
                name: 'onFalse',
                func: (data) => {
                    console.log('conditional onFalse', data);
                    /* TODO: find the connected block and call it's inputs */
                    const targetInputFn = getTarget(2, 'onFalse');
                    targetInputFn(data);
                }
            }
        ]
    },
    {
        id: "3",
        type: 'output',
        name: 'console.log',
        executed: false,
        inputs: [{
            name: 'data',
            func: (data) => {
                blocks[2].executed = true;


                setTimeout(() => {
                    blocks[2].executed = false;

                }, 1000)

                console.log('output, console.log', data);
                /* TODO: find the connected block and call it's inputs */
                console.log("OUTPUT CONSOLE LOG", data);
            }
        }],
        outputs: []
    },
    {
        id: "4",
        type: 'output',
        name: 'console.log',
        executed: false,
        inputs: [{
            name: 'data',
            func: (data) => {
                blocks[3].executed = true;

                setTimeout(() => {
                    blocks[3].executed = false;
                }, 1000)

                console.log('output, console.log', data);
                /* TODO: find the connected block and call it's inputs */
                console.log("OUTPUT CONSOLE LOG", data);
            }
        }],
        outputs: []
    }
]

const initialNodes = [
    {
        id: blocks[0].id, // connect the nodes to the blocks by id
        type: 'flowNode',
        data: blocks[0],
        position: {x: 100, y: 110}
    },
    {
        id: blocks[1].id,
        type: 'flowNode',
        data: blocks[1],
        position: {x: 400, y: 110}
    },
    {
        id: blocks[2].id,
        type: 'flowNode',
        data: blocks[2],
        position: {x: 700, y: 90}
    },
    {
        id: blocks[3].id,
        type: 'flowNode',
        data: blocks[3],
        position: {x: 700, y: 210}
    },
];

const initialEdges = [
    {
        id: 'e1-2',
        source: blocks[0].id,
        target: blocks[1].id,
        animated: true,
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        }
    },
    {
        id: 'e2-3',
        type: 'smoothstep',
        source: blocks[1].id,
        target: blocks[2].id,
    },
    {
        id: 'e2-4',
        type: 'smoothstep',
        source: blocks[1].id,
        target: blocks[3].id,
    }
];


const FlowManager = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div className="nma--flow-editor">
            <div className="nma--flow-editor-flow">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    maxZoom={1.2}
                    minZoom={0.8}
                    defaultZoom={1}
                    snapToGrid={true}
                    snapGrid={[10, 10]}
                    connectionLineComponent={ConnectionLine}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    // onConnect={onConnect}
                    // onLoad={setRfInstance}
                >
                    {/*<MiniMap/>*/}
                    <Controls/>
                    <Background
                        style={{background: "#22323d"}}
                    />
                </ReactFlow>
            </div>
        </div>
    );
}

export const Flow = () => (
    <ReactFlowProvider>
        <FlowManager/>
    </ReactFlowProvider>
)
