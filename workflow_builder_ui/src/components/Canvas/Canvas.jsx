import React from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import Node from '../Node/Node';
import './Canvas.css';

const Canvas = () => {
    const { state } = useWorkflow();
    const rootNode = state.nodes[state.rootId];

    return (
        <div className="canvas-container">
            <div className="canvas-content">
                {rootNode && <Node nodeId={rootNode.id} />}
            </div>
        </div>
    );
};

export default Canvas;
