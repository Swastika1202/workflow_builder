import React from 'react';
import Header from '../components/Header';
import Canvas from '../components/Canvas/Canvas';
import Tutorial from '../components/Tutorial/Tutorial';

const Builder = () => {
    return (
        <div className="workflow-app">
            <Tutorial />
            <Header />
            <main className="workflow-main">
                <Canvas />
            </main>
        </div>
    );
};

export default Builder;
