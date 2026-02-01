import React from 'react';
import NodeCard from '../NodeCard';
import { NODE_TYPES } from '../../../constants';

const BranchNode = ({ data, onDelete, onEdit }) => {
    return (
        <div className="branch-node-container">
            <NodeCard
                type={NODE_TYPES.BRANCH}
                label={data.label}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </div>
    );
};

export default BranchNode;
