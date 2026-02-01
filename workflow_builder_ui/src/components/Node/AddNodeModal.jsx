import React from 'react';
import { NODE_TYPES } from '../../constants';
import './AddNodeModal.css';

const AddNodeModal = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    const options = [
        { type: NODE_TYPES.ACTION, label: 'Action', desc: 'Step in the flow', color: '--accent-primary' },
        { type: NODE_TYPES.BRANCH, label: 'Branch', desc: 'Logical decision', color: '--color-warning' },
        { type: NODE_TYPES.END, label: 'End', desc: 'Finish path', color: '--color-danger' },
    ];

    return (
        <div className="pro-modal-overlay" onClick={onClose}>
            <div className="pro-modal" onClick={e => e.stopPropagation()}>
                <header>
                    <h3>Insert Node</h3>
                    <button className="close-x" onClick={onClose}>×</button>
                </header>
                <div className="pro-options">
                    {options.map(opt => (
                        <button key={opt.type} className="pro-opt-btn" onClick={() => onSelect(opt.type)}>
                            <div className="opt-marker" style={{ background: `var(${opt.color})` }}></div>
                            <div className="opt-text">
                                <strong>{opt.label}</strong>
                                <span>{opt.desc}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddNodeModal;
