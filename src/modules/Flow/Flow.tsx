import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow, EdgeTypes, Edge
} from 'react-flow-renderer';

import {useCallback, useEffect, useState} from "react";

import './Flow.css'
import {ConnectionLine} from "./Edges/ConnectionLine";
import {ButtonEdge} from "./Edges/ButtonEdge";
import uuid from "../../utils/uuid";
import {Blocks, CLFlowBlockInputsType, CLFlowBlockOutputsType, CLFlowBlockType} from "./Blocks/Blocks";
import {NODE_TYPES, nodeTypes} from "./Nodes";
import {Node} from "react-flow-renderer/dist/esm/types/nodes";
import {DefaultButton, PrimaryButton} from "@fluentui/react";

const flowKey = 'example-flow';

const edgeTypes: EdgeTypes = {
    connectionLine: ConnectionLine,
    buttonEdge: ButtonEdge,
};

const getTarget = (source, sourceHandle) => {
    const edge = edges.find((edge => edge.source === source && edge.sourceHandle === sourceHandle));
    const endModule = blocks.find((block) => block.id === edge.target);
    //TODO: change this if there is more then 1 input.

    return endModule.inputs[0].func;
}

const FlowManager = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

    const edgeClickHandler = (e: any, edge: Edge) => {
        if (e.target.className === 'edgebutton') {
            setEdges(edges.filter(_edge => _edge.id !== edge.id));
        }
    }

    const nodeClickHandler = (e: any, node: Node) => {
        const isDeleteTarget = e.target.className === 'cl-flow__node__delete';

        if (isDeleteTarget) {
            setNodes(nodes.filter(_node => _node.id !== node.id));
        }
    }

    const addNodeSelectHandler = (selectedBlock: CLFlowBlockType) => {
        const newNode = {
            id: uuid(),
            type: selectedBlock.nodeType || NODE_TYPES.baseNode,
            data: selectedBlock,
            position: { x: 100, y: 100 }
        }

        setNodes((nodes) => [...nodes, newNode]);
    }

    const manualRun = (nodes: Node[], edges: Edge[]) => {
        // console.log(nodes, edges);
        const startNode = nodes.filter(node => node.data.isRunnable)[0];
        if (!startNode) {
            console.error('Manual Run: No runnable node found.');
            return;
        }

        const startEdge = edges.filter((edge) => edge.source === startNode.id)[0];
        if (!startEdge) {
            console.error('Manual Run: No edge found to the starting node.');
            return;
        }

        const executeEdge = (edge: Edge) => {
            const startNode = nodes.find(node => node.id === edge.source);
            const endNode = nodes.find(node => node.id === edge.target);

            if (!startNode || !endNode) {
                console.error('Manual Run: No starting or ending node found for an edge.', edge);
            }

            const startOutput = startNode?.data.outputs.find((output: CLFlowBlockOutputsType) => edge.sourceHandle === output.id);
            const endOutput = endNode?.data.inputs.find((input: CLFlowBlockInputsType) => edge.targetHandle === input.id);

            if (!startOutput || !endOutput) {
                console.error('Manual Run: No starting or ending functions found for an edge.', edge);
            }

            const startFunction = startOutput.func;
            const endFunction = startOutput.func;

            if (!startFunction || !endFunction) {
                console.error('Manual Run: The starting or/end ending functions the edger are not found..', edge);
            }
        }

        executeEdge(startEdge);
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
                    onEdgeClick={edgeClickHandler}
                    onNodeClick={nodeClickHandler}
                >
                    <MiniMap/>
                    <Controls/>
                    <Background />
                    <div className="npm-flow-editor__actions">
                        <Blocks onSelect={(selectedBlock) => {
                            addNodeSelectHandler(selectedBlock);
                        }} />
                        &nbsp;
                        <DefaultButton onClick={() => { setNodes([]) }}>Clear</DefaultButton>
                        &nbsp;
                        <PrimaryButton onClick={() => manualRun(nodes, edges)}>Manual run</PrimaryButton>
                    </div>
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
