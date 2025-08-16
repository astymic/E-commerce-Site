import React from "react";
import { ReactP5Wrapper } from 'react-p5-wrapper';
import loadingAnimationSketch from '../../p5-sketches/LoadingAnimation';
import './LoadingSpinner.css';

function LoadingSpinner({ message }) {
    return (
        <div className="loading-spinner-overlay">
            <div className="loading-spinner-container">
                <ReactP5Wrapper sketch={loadingAnimationSketch} />
                {message && <p className="loading-message">{message}</p>}
            </div>
        </div>
    );
}

export default LoadingSpinner;