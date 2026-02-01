import React from 'react';
import { WorkflowProvider, useWorkflow } from './context/WorkflowContext';
import Canvas from './components/Canvas/Canvas';
import './app.css';

const Header = () => {
  const { undo, redo, saveWorkflow, canUndo, canRedo } = useWorkflow();
  return (
    <header className="pro-header">
      <div className="logo-group">
        <div className="icon">◈</div>
        <h1>Workflow Core</h1>
        <span className="badge">v2.0</span>
      </div>
      <div className="actions-group">
        <button className="btn-link" onClick={undo} disabled={!canUndo}>Undo</button>
        <button className="btn-link" onClick={redo} disabled={!canRedo}>Redo</button>
        <div className="v-sep"></div>
        <button className="btn-solid" onClick={saveWorkflow}>Save Design</button>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <WorkflowProvider>
      <div className="workflow-app">
        <Header />
        <main className="workflow-main">
          <Canvas />
        </main>
      </div>
    </WorkflowProvider>
  );
};

export default App;
