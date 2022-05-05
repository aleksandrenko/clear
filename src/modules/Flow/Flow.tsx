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
    MarkerType, useReactFlow, EdgeTypes, updateEdge
} from 'react-flow-renderer';

import {useCallback, useEffect, useState} from "react";
import {FlowNode} from "./FlowNode";

import './Flow.css'
import {ConnectionLine} from "./ConnectionLine";
import {NodeTypes} from "react-flow-renderer/dist/esm/types";
import {ButtonEdge} from "./ButtonEdge";


const flowKey = 'example-flow';

const nodeTypes: NodeTypes = {
    flowNode: FlowNode,
};

const edgeTypes: EdgeTypes = {
    connectionLine: ConnectionLine,
    buttonEdge: ButtonEdge
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

const initialEdges = [];

const FlowManager = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();

    useEffect(() => {
        restore();
    }, []);

    useEffect(() => {
        save();
    }, [nodes, edges]);

    const onConnect = (params) => {
        setEdges((els) => {
            return addEdge(params, els)
        });
    };

    const save = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const restore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport]);

    const edgeClickHandler = (e, edge: any) => {
        const target = e.target;
        if (target.className === 'edgebutton') {
            setEdges(edges.filter(_edge => _edge.id !== edge.id));
        }
    }

    return (
        <div className="nma--flow-editor">
            <div className="nma--flow-editor-flow">
                <ReactFlow
                    maxZoom={1.2}
                    minZoom={0.5}
                    defaultZoom={1}
                    snapToGrid={true}
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onConnect={onConnect}
                    onInit={setRfInstance}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    connectionLineComponent={ConnectionLine}
                    defaultEdgeOptions={{ type: "buttonEdge" }}
                    defaultNodesOptions={{ type: 'flowNode' }}
                    onEdgeClick={edgeClickHandler}
                >
                    <MiniMap/>
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
