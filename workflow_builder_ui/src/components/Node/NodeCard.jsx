import React, { useState, useRef, useEffect } from 'react';
import { NODE_TYPES } from '../../constants';

const NodeIcon = ({ type }) => {
    const strokeWidth = 2;
    switch (type) {
        case NODE_TYPES.START:
            return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M5 3l14 9-14 9V3z" /></svg>;
        case NODE_TYPES.ACTION:
            return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
        case NODE_TYPES.BRANCH:
            return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M6 3h12l4 6-4 6H6l-4-6 4-6z" /><path d="M12 15v6" /></svg>;
        case NODE_TYPES.END:
            return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
        default: return null;
    }
}

const NodeCard = ({ label, type, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(label);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (editValue.trim() !== label) onEdit(editValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleBlur();
        if (e.key === 'Escape') { setEditValue(label); setIsEditing(false); }
    };

    const isStart = type === NODE_TYPES.START;

    return (
        <div className={`pro-node-card type-${type}`}>
            <div className="node-type-indicator"></div>

            <div className="node-card-content">
                <div className="node-header">
                    <div className="node-icon"><NodeIcon type={type} /></div>
                    <span className="node-type-text">{type}</span>
                    {!isStart && (
                        <button className="del-btn" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <input
                        ref={inputRef}
                        className="pro-input"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <div className="pro-label" onClick={() => setIsEditing(true)}>
                        {label}
                        <span className="edit-glyph">✎</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NodeCard;
