import React from 'react';
import NodeCard from '../NodeCard';
import { NODE_TYPES } from '../../../constants';

const EndNode = ({ data, onDelete, onEdit }) => {
    return (
        <NodeCard
            type={NODE_TYPES.END}
            label={data.label}
            onDelete={onDelete}
            onEdit={onEdit}
        />
    );
};

export default EndNode;
