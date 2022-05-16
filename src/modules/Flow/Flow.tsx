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
        const removeHighlightDelay = 500;

        if (highlighted) {
            setNodes((nodes) => {
                const newNodes = nodes.map((node) => {
                    if (node.id === nodeToHighlight.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                highlighted: true
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

    const manualRun = (nodes: Node[], edges: Edge[]) => {
        //TODO: clear all lastValue-s on new start
        // setNodes((nodes) => {
        //     const cloneNodes = deepCopy(nodes);
        //     console.log('cloneNodes', cloneNodes);
        //
        //     cloneNodes.forEach((node: Node) => {
        //         const {inputs, outputs} = node.data;
        //         inputs.forEach((input: CLFlowBlockInputsType) => input.lastValue = undefined);
        //         outputs.forEach((output: CLFlowBlockOutputsType) => output.lastValue = undefined);
        //     });
        //
        //     return cloneNodes;
        // });

        const getArgsValues = (node?: Node) => {
            const args = node?.data.args;

            return Object.keys(args).reduce((sum, argKey: string) => {
               return {
                   ...sum,
                   [argKey]: args[argKey].value
               };
            }, {});
        }

        const startNode = nodes.filter(node => node.data.isRunnable)[0];
        if (!startNode) {
            console.error('Manual Run: No runnable node found.');
            return;
        }

        const startEdges = edges.filter((edge) => edge.source === startNode.id);

        if (!startEdges || !startEdges.length) {
            console.error('Manual Run: No edge found to the starting node.');
            return;
        }

        const executeEdge = async (edge: Edge, initialValue: any) => {
            const startNode = nodes.find(node => node.id === edge.source);
            const endNode = nodes.find(node => node.id === edge.target);

            if (!startNode || !endNode) {
                console.error('Manual Run: No starting or ending node found for an edge.', edge);
            }

            const startOutput = startNode?.data.outputs.find((output: CLFlowBlockOutputsType) => edge.sourceHandle === output.id);
            const endInput = endNode?.data.inputs.find((input: CLFlowBlockInputsType) => edge.targetHandle === input.id);

            if (!startOutput || !endInput) {
                console.error('Manual Run: No starting or ending functions found for an edge.', edge);
            }

            //TODO: Do I actually need a second function? I need inputs, function and outputs.
            const startFunction = startOutput.func;
            const endFunction = endInput.func;

            if (!startFunction || !endFunction) {
                console.error('Manual Run: The starting or/end ending functions the edge are not found.', edge);
            }

            //Get the value from a wrapped promise or raw
            const unwrappedStartValue = await initialValue;

            highlightNode(startNode);
            startOutput.lastValue = unwrappedStartValue;

            const startValue = await startFunction(unwrappedStartValue, getArgsValues(startNode));

            highlightNode(startNode, false);
            highlightNode(endNode);
            const endResultOriginal = await endFunction(startValue, getArgsValues(endNode));
            endInput.lastValue = startValue;
            highlightNode(endNode, false);

            // endNode?.data?.outputs?[0].value = endResultOriginal;

            const endResult = new Promise((resolve, reject) => {
                try {
                    resolve(endResultOriginal);
                } catch (error) {
                    console.error("Edge execution fails", error, edge);
                }
            });

            //when done with the function pass the data to the endNode outgoing edges
            const endNodeOutgoingEdges = edges.filter((edge) => edge.source === endNode?.id);

            if (!!endNodeOutgoingEdges.length) {
                executeEdges(endNodeOutgoingEdges, endResult);
            } else {
                console.log("end of flow");
                setIsStarted(false);
            }
        }

        const executeEdges = (edges: Edge[], initialValue: any) => {
            edges.forEach((startEdge) => executeEdge(startEdge, initialValue));
        }

        setIsStarted(true);
        executeEdges(startEdges, "start");
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
