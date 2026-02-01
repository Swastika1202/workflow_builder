import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import './Dashboard.css';

const Dashboard = () => {
    const { savedWorkflows, loadWorkflow, deleteSavedWorkflow, createNewWorkflow } = useWorkflow();
    const navigate = useNavigate();

    const handleCreateNew = () => {
        createNewWorkflow();
        navigate('/');
    };

    const handleLoad = (id) => {
        loadWorkflow(id);
        navigate('/');
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this workflow?')) {
            deleteSavedWorkflow(id);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Your Workflows</h1>
                    <p className="dashboard-subtitle">Manage and organize your automation flows.</p>
                </div>
                <button className="dashboard-create-btn" onClick={handleCreateNew}>
                    + Create New Workflow
                </button>
            </div>

            <div className="dashboard-grid">
                {savedWorkflows.length === 0 ? (
                    <div className="dashboard-empty">
                        <h3>No workflows found</h3>
                        <p>Get started by creating your first workflow!</p>
                    </div>
                ) : (
                    savedWorkflows.map(wf => (
                        <div
                            key={wf.id}
                            className="dashboard-card"
                            onClick={() => handleLoad(wf.id)}
                        >
                            <div>
                                <h3 className="card-title">{wf.name}</h3>
                                <div className="card-meta">
                                    Created: {new Date(wf.date).toLocaleDateString()}
                                    <br />
                                    ID: {wf.id.slice(0, 8)}...
                                </div>
                            </div>
                            <button
                                className="card-delete-btn"
                                onClick={(e) => handleDelete(e, wf.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;

