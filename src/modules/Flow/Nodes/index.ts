import {NodeTypes} from "react-flow-renderer/dist/esm/types";
import {BaseNode} from "./BaseNode/BaseNode";

export const NODE_TYPES = {
	baseNode: 'baseNode'
}

export const nodeTypes: NodeTypes = {
	[NODE_TYPES.baseNode]: BaseNode
};
