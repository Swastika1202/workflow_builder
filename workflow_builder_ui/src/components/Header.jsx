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
                <button className="btn-link tour-my-workflows" onClick={handleBack}>My Workflows</button>
                <div className="v-sep"></div>
                <div className="tour-undo-redo" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="btn-link" onClick={undo} disabled={!canUndo}>Undo</button>
                    <button className="btn-link" onClick={redo} disabled={!canRedo}>Redo</button>
                </div>
                <div className="v-sep"></div>
                <button className="btn-solid tour-new-btn" onClick={handleNew}>+ New</button>
                <button className="btn-solid tour-save-btn" onClick={handleSave}>Save Design</button>
            </div>
        </header>
    );
};

export default Header;
