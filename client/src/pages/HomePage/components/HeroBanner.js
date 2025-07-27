import React, { useEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import particleBackgroundSketch from '../../../p5-sketches/ParticleBackground';

function HeroBanner() {
    return (
        <section className="hero-banner" style={{ position: 'relative', overflow: 'hidden' }}>
            <ReactP5Wrapper sketch={particleBackgroundSketch} />
            <div className="hero-content" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
                <h2>Welcome to Our Store</h2>
                <p>Discover amazing deals and top products!</p>
                <button className='btn btn-light'>Shop Now</button>
            </div>
        </section>
    );
}

export default HeroBanner;