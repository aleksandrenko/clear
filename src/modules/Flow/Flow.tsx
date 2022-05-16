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
import {
    Blocks,
    CLFlowBlockArgumentType,
    CLFlowBlockInputsType,
    CLFlowBlockOutputsType,
    CLFlowBlockType
} from "./Blocks/Blocks";
import {NODE_TYPES, nodeTypes} from "./Nodes";
import {Node} from "react-flow-renderer/dist/esm/types/nodes";
import {DefaultButton, PrimaryButton} from "@fluentui/react";
import {deepCopy} from "../../utils/deepCopy";
import data from "../../pages/Data/Data";

const flowKey = 'example-flow';

const edgeTypes: EdgeTypes = {
    connectionLine: ConnectionLine,
    buttonEdge: ButtonEdge,
};

const FlowManager = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        restore();
    }, []);

    useEffect(() => {
        save();
    }, [nodes, edges]);

    const onConnect = (params: any) => {
        setEdges((els) => {
            return addEdge(params, els)
        });
    };

    const save = useCallback(() => {
        if (rfInstance) {
            // @ts-ignore
            const flow = rfInstance.toObject();
            const replacerFn = (key: string, val: any) => {
                return (typeof val === 'function')
                    ? val.toString().replace(/(\r\n|\n|\r)/gm, "")
                    : val
            };

            localStorage.setItem(flowKey, JSON.stringify(flow, replacerFn));
        }
    }, [rfInstance]);

    const restore = useCallback(() => {
        const restoreFlow = async () => {
            const reviver = (key: string, value: string) => {
                if (key === 'func') {
                    const wrapperFunction = new Function("return " + value);
                    const storedFunction = wrapperFunction();
                    return storedFunction;
                }

                return value;
            }

            const flow = JSON.parse(localStorage.getItem(flowKey) as string, reviver);

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
            position: { x: 80 + Math.random() * 40, y: 80 + Math.random() * 40 }
        }

        setNodes((nodes) => [...nodes, newNode]);
    }

    const highlightNode = (nodeToHighlight: Node, highlighted= true) => {
        const removeHighlightDelay = 300;

        if (highlighted) {
            setNodes((nodes) => {
                const newNodes = nodes.map((node) => {
                    if (node.id === nodeToHighlight.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                highlighted
                            }
                        }
                    }

                    return node;
                })

                return newNodes;
            });
        } else {
            setTimeout(() => {
                setNodes((nodes) => {
                    const newNodes = nodes.map((node) => {
                        if (node.id === nodeToHighlight.id) {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    highlighted: false
                                }
                            }
                        }

                        return node;
                    })

                    return newNodes;
                });
            }, removeHighlightDelay);
        }
    }

    const clearLastValues = () => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                const nodeCopy = deepCopy(node);
                nodeCopy.data.lastValue = undefined;

                return nodeCopy;
            });
        });
    }

    const getArgsValues = (node?: Node) => {
        const args = node?.data.args;

        return Object.keys(args).reduce((sum, argKey: string) => {
            return {
                ...sum,
                [argKey]: args[argKey].value
            };
        }, {});
    }

    const manualRun = (nodes: Node[], edges: Edge[]) => {
        clearLastValues();
        const startNodes = nodes.filter(node => node.data.isRunnable);

        const executeNode = async (node: Node, inputValue: any) => {
            const unwrappedStartValue = await inputValue;
            const operationFunction = node.data.func;
            if (!operationFunction) {
                console.error('Manual Run: The function is not found.', node);
            }

            highlightNode(node);
            const resultValue = await operationFunction(unwrappedStartValue, getArgsValues(node));
            highlightNode(node, false);

            // @ts-ignore
            setNodes((nodes) => {
                return nodes.map((_node) => {
                    if (node.id === _node.id) {
                        const nodeCopy = deepCopy(node);
                        nodeCopy.data.lastValue = resultValue;
                        return nodeCopy;
                    }

                    return node;
                });
            });

            setIsStarted(false);
            return new Promise((resolve, reject) => resolve(resultValue));
        }

        setIsStarted(true);
        startNodes.forEach(executeNode);
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
                        }} disabled={isStarted} />
                        &nbsp;
                        <DefaultButton onClick={() => { setNodes([]) }} disabled={isStarted}>Clear</DefaultButton>
                        &nbsp;
                        <PrimaryButton onClick={() => manualRun(nodes, edges)} disabled={isStarted}>Manual run</PrimaryButton>
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
