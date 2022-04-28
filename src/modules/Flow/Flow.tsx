import {useState, useCallback, useEffect} from 'react';
import ReactFlow, {
    addEdge,
    FitViewOptions,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    Connection, Background, MiniMap, Controls, useReactFlow, ReactFlowJsonObject, ReactFlowProvider
} from 'react-flow-renderer';

import { ConnectionLine } from './ConnectionLine';
import "./Flow.css";
import {ReactFlowInstance} from "react-flow-renderer/dist/esm/types/instance";
import uuid from "../../utils/uuid";
import { CustomNode } from "./CustomNode";
import {NodeTypes} from "react-flow-renderer/dist/esm/types";

const flowKey = 'example-flow';
const LC: Storage = window.localStorage;
const nodeTypes: NodeTypes = {
    clrNode: CustomNode,
};

//https://github.com/aleksandrenko/nma-monaco/blob/main/src/FlowApp.js
const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Node 1' },
        position: { x: 5, y: 5 },
        type: 'clrNode',
    },
    {
        id: '2',
        data: { label: 'Node 2' },
        position: { x: 5, y: 100 },
        type: 'clrNode',
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2'},
];

const fitViewOptions: FitViewOptions = {
    padding: 0.2
}

const FlowMod = () => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
    const { setViewport } = useReactFlow();

    useEffect(() => {
        onRestore()
    }, []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            LC.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const LCData: string = LC.getItem(flowKey) || '';
            const flow = JSON.parse(LCData);

            if (flow && LCData) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport]);

    const onAdd = useCallback(() => {
        const newNode = {
            id: uuid(),
            data: { label: 'Added node' },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight,
            },
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    return (
        <div className="clr-flow">
            <div>clear:flow</div>
            <div className="clr-flow__canvas">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitViewOptions={fitViewOptions}
                    attributionPosition="bottom-left"
                    connectionLineComponent={ConnectionLine}
                    onInit={setRfInstance}
                    defaultZoom={1}
                >
                    <Background />
                    <MiniMap />
                    <Controls />

                    <div className="clr-flow__save-controls">
                        <button onClick={onSave}>save</button>
                        <button onClick={onRestore}>restore</button>
                        <button onClick={onAdd}>add node</button>
                    </div>
                </ReactFlow>
            </div>
        </div>
    )
}

export const Flow = () => (
    <ReactFlowProvider>
        <FlowMod />
    </ReactFlowProvider>
)
