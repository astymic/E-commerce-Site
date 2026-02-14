import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function CategoryBanners() {
    const { categoryId } = useParams();
    const { category, loading } = useSelector(state => state.category);

    return (
        <section className="relative h-[250px] md:h-[350px] rounded-[3rem] overflow-hidden bg-neutral-900 mb-8 border border-neutral-800 shadow-2xl">
            {loading ? (
                <div className="w-full h-full bg-neutral-800 animate-pulse" />
            ) : (
                <>
                    <img
                        src={category?.bannerImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600'}
                        alt={category?.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent flex items-center p-12 md:p-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-xl"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary-600 text-white text-[10px] font-bold tracking-widest uppercase mb-4">
                                Category Selection
                            </span>
                            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4 leading-tight">
                                {category?.name || 'Exclusive Assets'}
                            </h1>
                            <p className="text-neutral-400 text-sm md:text-lg max-w-sm line-clamp-2">
                                {category?.description || 'Browse our curated selection of high-end digital products and premium quality essentials.'}
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </section>
    );
}

export default CategoryBanners;