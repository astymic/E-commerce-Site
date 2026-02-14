import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import particleBackgroundSketch from '../../../p5-sketches/ParticleBackground';

function HeroBanner() {
    return (
        <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-neutral-950">
            {/* Main Backlight Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
            </div>

            {/* Background Animation */}
            <div className="absolute inset-0 opacity-30 z-0">
                <ReactP5Wrapper sketch={particleBackgroundSketch} />
            </div>

            {/* Glass Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/60 to-neutral-950 z-10" />
            <div className="absolute inset-0 backdrop-blur-[2px] z-5" />

            {/* Bottom Fade to Page Content */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />

            <div className="container relative z-20">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary-600/10 text-primary-400 text-xs font-bold tracking-wider uppercase mb-6 border border-primary-600/20">
                            New Collection 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-8">
                            Elevate Your <br />
                            <span className="text-primary-500">Digital Style</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-xl">
                            Discover our curated collection of premium essentials designed for the modern lifestyle. Quality meets innovation in every piece.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button className="btn btn-primary w-full sm:w-auto px-8 group">
                                Shop Collection
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="btn border-neutral-700 bg-transparent text-white hover:bg-white hover:text-neutral-900 w-full sm:w-auto px-8">
                                <ShoppingBag className="mr-2 w-5 h-5" />
                                View Deals
                            </button>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-16 flex items-center gap-12 border-t border-neutral-800 pt-10"
                    >
                        <div>
                            <p className="text-2xl font-display font-bold text-white">12k+</p>
                            <p className="text-sm text-neutral-500">Premium Products</p>
                        </div>
                        <div>
                            <p className="text-2xl font-display font-bold text-white">45k+</p>
                            <p className="text-sm text-neutral-500">Happy Customers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-display font-bold text-white">24/7</p>
                            <p className="text-sm text-neutral-500">Expert Support</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Element */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute right-[10%] top-[20%] w-64 h-64 bg-primary-600/20 blur-[100px] rounded-full hidden lg:block"
            />
        </section>
    );
}

export default HeroBanner;