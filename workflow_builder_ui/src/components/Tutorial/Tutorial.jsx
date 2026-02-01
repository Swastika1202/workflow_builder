import React, { useState, useEffect } from 'react';
import Joyride, { STATUS, EVENTS, ACTIONS } from 'react-joyride';
import './Tutorial.css';

const steps = [
  {
    target: 'body',
    content: (
      <div>
        <h3 className="tutorial-tooltip-title">Welcome to Workflow Builder!</h3>
        <p className="tutorial-tooltip-content">Let's take a quick tour to help you get started with building amazing workflows.</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.tour-my-workflows',
    content: (
      <div>
        <h3 className="tutorial-tooltip-title">My Workflows</h3>
        <p className="tutorial-tooltip-content">Access your saved workflows dashboard here. You can load, manage, or delete your previous work.</p>
      </div>
    ),
  },
  {
    target: '.tour-undo-redo',
    content: (
      <div>
        <h3 className="tutorial-tooltip-title">Undo & Redo</h3>
        <p className="tutorial-tooltip-content">Made a mistake? No problem. Use these buttons to step back and forth through your changes.</p>
      </div>
    ),
  },
  {
    target: '.tour-new-btn',
    content: (
      <div>
        <h3 className="tutorial-tooltip-title">Start Fresh</h3>
        <p className="tutorial-tooltip-content">Click here to reset the canvas and start a brand new workflow.</p>
      </div>
    ),
  },
  {
    target: '.tour-save-btn',
    content: (
      <div>
        <h3 className="tutorial-tooltip-title">Save Your Work</h3>
        <p className="tutorial-tooltip-content">Don't forget to save! Your workflows are stored locally in your browser.</p>
      </div>
    ),
  },
  {
    target: '.workflow-main',
    content: (
      <div>
        <h3 className="tutorial-tooltip-title">The Canvas</h3>
        <p className="tutorial-tooltip-content">This infinite canvas is where the magic happens. Your workflow structure allows for complex branching logic.</p>
      </div>
    ),
    placement: 'center',
  },
  {
    target: '.node-wrapper',
    content: (
      <div>
        <h3 className="tutorial-tooltip-title">Start Building</h3>
        <p className="tutorial-tooltip-content">Every journey begins with a Single Node. Click the <strong>+</strong> button to add actions or branches.</p>
      </div>
    ),
  }
];

const Tutorial = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Check Local Storage on Mount
  useEffect(() => {
    try {
      const seen = localStorage.getItem('tutorial_seen');
      if (!seen) {
        setRun(true);
      } else {
        setRun(false);
      }
    } catch (e) {
      console.error("Failed to access local storage for tutorial", e);
      setRun(true); // Fallback to running it
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      setStepIndex(0);
      localStorage.setItem('tutorial_seen', 'true');
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      setStepIndex(nextStepIndex);
    }
  };

  const handleRestart = () => {
    setStepIndex(0);
    setRun(true);
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        tooltipComponent={({
          continuous,
          index,
          step,
          backProps,
          closeProps,
          primaryProps,
          skipProps,
          tooltipProps,
        }) => (
          <div {...tooltipProps} className="tutorial-tooltip">
            <div className="tutorial-tooltip-container">
              {step.content}
              <div className="tutorial-tooltip-footer">
                <span className="tutorial-step-counter">
                  {index + 1} / {steps.length}
                </span>
                <div className="tutorial-btn-group">
                  <button {...skipProps} className="tutorial-button-skip">
                    Skip
                  </button>
                  {index > 0 && (
                    <button {...backProps} className="tutorial-button-back">
                      Back
                    </button>
                  )}
                  <button {...primaryProps} className="tutorial-button-primary">
                    {index === steps.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: '#ffffff', // Match the bg-node color
            backgroundColor: '#ffffff',
            overlayColor: 'rgba(0, 0, 0, 0.4)', // Slightly darker for better focus
            primaryColor: '#4f46e5', // Match accent-primary
            textColor: '#111827', // Match text-main
          },
          spotlight: {
            borderRadius: '12px', // Match radius-pro
          }
        }}
      />
      {!run && (
        <button className="tutorial-restart-btn" onClick={handleRestart}>
          <span style={{ fontSize: '1.2rem' }}>?</span>
          <span>Show Tutorial</span>
        </button>
      )}
    </>
  );
};

export default Tutorial;
