import React from 'react';
import NodeCard from '../NodeCard';
import { NODE_TYPES } from '../../../constants';

const StartNode = ({ data, onEdit }) => {
    return (
        <NodeCard
            type={NODE_TYPES.START}
            label={data.label}
            onEdit={onEdit}
        />
    );
};

export default StartNode;
