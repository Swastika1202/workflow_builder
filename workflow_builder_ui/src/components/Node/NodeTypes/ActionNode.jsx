import React from 'react';
import NodeCard from '../NodeCard';
import { NODE_TYPES } from '../../../constants';

const ActionNode = ({ data, onDelete, onEdit }) => {
    return (
        <NodeCard
            type={NODE_TYPES.ACTION}
            label={data.label}
            onDelete={onDelete}
            onEdit={onEdit}
        />
    );
};

export default ActionNode;
