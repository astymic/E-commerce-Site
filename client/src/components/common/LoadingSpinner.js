import React from "react";
import { ReactP5Wrapper } from 'react-p5-wrapper';
import loadingAnimationSketch from '../../p5-sketches/LoadingAnimation';
import { motion } from "framer-motion";

function LoadingSpinner({ message }) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900/40 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-white/20 flex flex-col items-center"
            >
                <div className="w-64 h-64 relative">
                    <ReactP5Wrapper sketch={loadingAnimationSketch} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
                    </div>
                </div>
                {message && (
                    <p className="mt-8 text-sm font-bold text-neutral-400 uppercase tracking-[0.3em] font-display animate-pulse">
                        {message}
                    </p>
                )}
            </motion.div>
        </div>
    );
}

export default LoadingSpinner;