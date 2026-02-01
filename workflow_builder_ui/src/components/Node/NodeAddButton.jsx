import React from 'react';
import './NodeAddButton.css';

const NodeAddButton = ({ onClick }) => {
    return (
        <div className="node-add-button-container">
            <button className="node-add-button" onClick={onClick}>
                +
            </button>
        </div>
    );
};

export default NodeAddButton;
