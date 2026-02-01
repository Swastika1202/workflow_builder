import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';

const Header = () => {
    const { undo, redo, saveWorkflow, canUndo, canRedo, createNewWorkflow } = useWorkflow();
    const navigate = useNavigate();

    const handleSave = () => {
        const name = window.prompt("Enter a name for your workflow:", "My Workflow");
        if (name) {
            saveWorkflow(name);
            alert('Workflow saved successfully!');
        }
    };

    const handleBack = () => {
        navigate('/workflows');
    };

    const handleNew = () => {
        if (window.confirm("Do you want to discard your workflow and start with a new one?")) {
            createNewWorkflow();
            document.querySelector('.workflow-main')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="pro-header">
            <div className="logo-group" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <div className="app-logo">
                    <div className="logo-node top"></div>
                    <div className="logo-line" style={{ transform: 'rotate(-45deg)', left: '8px', top: '10px' }}></div>
                    <div className="logo-line" style={{ transform: 'rotate(45deg)', right: '8px', top: '10px' }}></div>
                    <div className="logo-node bottom-left"></div>
                    <div className="logo-node bottom-right"></div>
                </div>
                <h1>Workflow Builder</h1>
            </div>
            <div className="actions-group">
                <button className="btn-link tour-my-workflows" onClick={handleBack} title="My Workflows">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    <span className="btn-text">My Workflows</span>
                </button>
                <div className="v-sep"></div>
                <div className="tour-undo-redo" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <button className="btn-link" onClick={undo} disabled={!canUndo} title="Undo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" /></svg>
                        <span className="btn-text">Undo</span>
                    </button>
                    <button className="btn-link" onClick={redo} disabled={!canRedo} title="Redo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" /></svg>
                        <span className="btn-text">Redo</span>
                    </button>
                </div>
                <div className="v-sep"></div>
                <button className="btn-solid tour-new-btn" onClick={handleNew} title="New Workflow">
                    <span className="btn-icon">+</span>
                    <span className="btn-text">New</span>
                </button>
                <button className="btn-solid tour-save-btn" onClick={handleSave} title="Save Design">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                    <span className="btn-text">Save</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
