import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';

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

    // Inline styles for simplicity matching the theme
    const styles = {
        container: {
            padding: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: "'Inter', sans-serif",
            color: '#111827'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px'
        },
        title: {
            fontSize: '2rem',
            fontWeight: '700',
            margin: 0
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
        },
        card: {
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            border: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '180px'
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#1e293b'
        },
        cardMeta: {
            color: '#64748b',
            fontSize: '0.875rem',
            marginBottom: '20px'
        },
        createBtn: {
            background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
        },
        deleteBtn: {
            background: 'transparent',
            color: '#ef4444',
            border: '1px solid #fee2e2',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            marginTop: 'auto',
            alignSelf: 'flex-start'
        },
        empty: {
            textAlign: 'center',
            gridColumn: '1 / -1',
            padding: '60px',
            color: '#9ca3af',
            background: 'white',
            borderRadius: '12px',
            border: '2px dashed #e5e7eb'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Your Workflows</h1>
                    <p style={{ color: '#6b7280', marginTop: '8px' }}>Manage and organize your automation flows.</p>
                </div>
                <button style={styles.createBtn} onClick={handleCreateNew}>
                    + Create New Workflow
                </button>
            </div>

            <div style={styles.grid}>
                {savedWorkflows.length === 0 ? (
                    <div style={styles.empty}>
                        <h3>No workflows found</h3>
                        <p>Get started by creating your first workflow!</p>
                    </div>
                ) : (
                    savedWorkflows.map(wf => (
                        <div
                            key={wf.id}
                            style={styles.card}
                            onClick={() => handleLoad(wf.id)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                            }}
                        >
                            <div>
                                <h3 style={styles.cardTitle}>{wf.name}</h3>
                                <div style={styles.cardMeta}>
                                    Created: {new Date(wf.date).toLocaleDateString()}
                                    <br />
                                    ID: {wf.id.slice(0, 8)}...
                                </div>
                            </div>
                            <button
                                style={styles.deleteBtn}
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
