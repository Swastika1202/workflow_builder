import React, { useState } from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import { NODE_TYPES } from '../../constants';
import StartNode from './NodeTypes/StartNode';
import ActionNode from './NodeTypes/ActionNode';
import BranchNode from './NodeTypes/BranchNode';
import EndNode from './NodeTypes/EndNode';
import NodeCard from './NodeCard'; // Re-creating this
import AddNodeModal from './AddNodeModal'; // Re-creating this
import './Node.css';
import './NodeAddButton.css'; // Re-creating this

const NodeComponentMap = {
    [NODE_TYPES.START]: StartNode,
    [NODE_TYPES.ACTION]: ActionNode,
    [NODE_TYPES.BRANCH]: BranchNode,
    [NODE_TYPES.END]: EndNode,
};

const Node = ({ nodeId }) => {
    const { state, addNode, deleteNode, updateNodeLabel } = useWorkflow();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetChildId, setTargetChildId] = useState(null);

    const node = state.nodes[nodeId];
    if (!node) return null;

    const SpecificNode = NodeComponentMap[node.type];

    const handleAdd = (childId = null) => {
        setTargetChildId(childId);
        setIsModalOpen(true);
    };

    const handleSelect = (type) => {
        addNode(nodeId, type, targetChildId);
        setIsModalOpen(false);
    };

    return (
        <div className="node-wrapper">
            <div className="node-container">
                <SpecificNode
                    data={node}
                    onDelete={() => deleteNode(nodeId)}
                    onEdit={(val) => updateNodeLabel(nodeId, val)}
                />

                {node.children.length === 0 && node.type !== NODE_TYPES.END && (
                    <>
                        <div className="pro-line-v"></div>
                        <button className="node-add-btn" onClick={() => handleAdd(null)}>+</button>
                    </>
                )}
            </div>

            {node.children.length > 0 && (
                <div className={`node-children-row ${node.type === NODE_TYPES.BRANCH ? 'branch' : ''}`}>
                    {node.children.map((childId) => (
                        <div key={childId} className="child-wrapper">
                            {node.type !== NODE_TYPES.BRANCH && (
                                <>
                                    <div className="pro-line-v"></div>
                                    <button className="node-add-btn" onClick={() => handleAdd(childId)}>+</button>
                                    <div className="pro-line-v"></div>
                                </>
                            )}
                            <Node nodeId={childId} />
                        </div>
                    ))}
                </div>
            )}

            <AddNodeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleSelect}
            />
        </div>
    );
};

export default Node;
