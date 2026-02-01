import React, { createContext, useContext, useReducer, useCallback, useState, useEffect } from 'react';
import { INITIAL_STATE, NODE_TYPES } from '../constants';

// Simple ID generator
const generateId = () => 'node_' + Math.random().toString(36).substr(2, 9);
// UUID for workflows
const generateWorkflowId = () => 'wf_' + Math.random().toString(36).substr(2, 9);

const WorkflowContext = createContext(null);

const HISTORY_LIMIT = 50;

const initialContextState = {
    past: [],
    present: INITIAL_STATE,
    future: []
};

const nodesReducer = (nodes, action) => {
    switch (action.type) {
        case 'ADD_NODE': {
            const { parentId, nodeType, childId } = action.payload;
            const newNodeId = generateId();

            let initialChildren = childId ? [childId] : [];
            let initialData = {};

            // Special Branch Logic: Initialize with 2 children
            if (nodeType === NODE_TYPES.BRANCH && !childId) {
                const leftId = generateId();
                const rightId = generateId();

                const leftNode = { id: leftId, type: NODE_TYPES.ACTION, label: 'True Path', children: [], data: {} };
                const rightNode = { id: rightId, type: NODE_TYPES.ACTION, label: 'False Path', children: [], data: {} };

                const parentNode = nodes[parentId];
                const newChildren = [...parentNode.children, newNodeId];

                return {
                    ...nodes,
                    [leftId]: leftNode,
                    [rightId]: rightNode,
                    [newNodeId]: {
                        id: newNodeId,
                        type: nodeType,
                        label: 'Condition',
                        children: [leftId, rightId],
                        data: { branchLabels: ['True', 'False'] }
                    },
                    [parentId]: { ...parentNode, children: newChildren }
                };
            }

            const newNode = {
                id: newNodeId,
                type: nodeType,
                label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
                children: initialChildren,
                data: initialData
            };

            const parentNode = nodes[parentId];
            let newChildren = [...parentNode.children];

            if (childId) {
                const index = newChildren.indexOf(childId);
                if (index !== -1) {
                    newChildren[index] = newNodeId;
                }
            } else {
                newChildren.push(newNodeId);
            }

            return {
                ...nodes,
                [newNodeId]: newNode,
                [parentId]: { ...parentNode, children: newChildren }
            };
        }

        case 'DELETE_NODE': {
            const { nodeId } = action.payload;
            let parentId = null;
            Object.values(nodes).forEach(n => {
                if (n.children.includes(nodeId)) {
                    parentId = n.id;
                }
            });

            if (!parentId) return nodes;

            const parentNode = nodes[parentId];
            const deletedNode = nodes[nodeId];

            const childIndex = parentNode.children.indexOf(nodeId);
            let newChildren = [...parentNode.children];

            if (childIndex !== -1) {
                if (deletedNode && deletedNode.children.length > 0) {
                    newChildren.splice(childIndex, 1, ...deletedNode.children);
                } else {
                    newChildren.splice(childIndex, 1);
                }
            }

            const newNodes = { ...nodes, [parentId]: { ...parentNode, children: newChildren } };
            delete newNodes[nodeId];
            return newNodes;
        }

        case 'UPDATE_NODE_LABEL': {
            const { nodeId, label } = action.payload;
            return { ...nodes, [nodeId]: { ...nodes[nodeId], label } };
        }

        default:
            return nodes;
    }
}

const workflowReducer = (state, action) => {
    const { past, present, future } = state;

    switch (action.type) {
        case 'UNDO':
            if (past.length === 0) return state;
            return {
                past: past.slice(0, past.length - 1),
                present: past[past.length - 1],
                future: [present, ...future]
            };

        case 'REDO':
            if (future.length === 0) return state;
            return {
                past: [...past, present],
                present: future[0],
                future: future.slice(1)
            };

        case 'SET_WORKFLOW':
            return {
                past: [],
                present: action.payload,
                future: []
            };

        case 'ADD_NODE':
        case 'DELETE_NODE':
        case 'UPDATE_NODE_LABEL': {
            const newNodes = nodesReducer(present.nodes, action);
            if (newNodes === present.nodes) return state;

            return {
                past: [...past, present].slice(-HISTORY_LIMIT),
                present: { ...present, nodes: newNodes },
                future: []
            };
        }

        default:
            return state;
    }
};

export const WorkflowProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workflowReducer, initialContextState);
    const [savedWorkflows, setSavedWorkflows] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('workflow_builder_saves');
        if (stored) {
            try {
                setSavedWorkflows(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse saved workflows", e);
            }
        }
    }, []);

    // Save to local storage whenever savedWorkflows changes
    useEffect(() => {
        localStorage.setItem('workflow_builder_saves', JSON.stringify(savedWorkflows));
    }, [savedWorkflows]);

    const addNode = (parentId, nodeType, childId = null) => {
        dispatch({ type: 'ADD_NODE', payload: { parentId, nodeType, childId } });
    };

    const deleteNode = (nodeId) => {
        dispatch({ type: 'DELETE_NODE', payload: { nodeId } });
    }

    const updateNodeLabel = (nodeId, label) => {
        dispatch({ type: 'UPDATE_NODE_LABEL', payload: { nodeId, label } });
    };

    const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
    const redo = useCallback(() => dispatch({ type: 'REDO' }), []);

    // Save current state as a new or existing workflow
    const saveWorkflow = (name, id = null) => {
        const newWorkflow = {
            id: id || generateWorkflowId(),
            name: name,
            date: new Date().toISOString(),
            data: state.present
        };

        // Bonus Requirement: Log entire workflow data structure to console
        console.log("Workflow Data Structure:", newWorkflow.data);

        setSavedWorkflows(prev => {
            const existingIndex = prev.findIndex(w => w.id === id);
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = newWorkflow;
                return updated;
            }
            return [newWorkflow, ...prev];
        });

        return newWorkflow.id;
    };

    const loadWorkflow = (id) => {
        const workflow = savedWorkflows.find(w => w.id === id);
        if (workflow) {
            dispatch({ type: 'SET_WORKFLOW', payload: workflow.data });
            return true;
        }
        return false;
    };

    const deleteSavedWorkflow = (id) => {
        setSavedWorkflows(prev => prev.filter(w => w.id !== id));
    };

    const createNewWorkflow = () => {
        dispatch({ type: 'SET_WORKFLOW', payload: INITIAL_STATE });
    };

    return (
        <WorkflowContext.Provider value={{
            state: state.present,
            savedWorkflows,
            canUndo: state.past.length > 0,
            canRedo: state.future.length > 0,
            addNode,
            deleteNode,
            updateNodeLabel,
            undo,
            redo,
            saveWorkflow,
            loadWorkflow,
            deleteSavedWorkflow,
            createNewWorkflow
        }}>
            {children}
        </WorkflowContext.Provider>
    );
};

export const useWorkflow = () => useContext(WorkflowContext);
